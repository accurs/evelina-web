import { useState, useEffect } from 'react';

interface StatusData {
  timestamp: string;
  total_servers: number;
  total_users: number;
  average_latency: number;
}

interface HistoryData {
  guilds: number;
  ping: number;
  timestamp: string;
  users: number;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second
const CACHE_DURATION = 60 * 1000; // 1 minute
const API_BASE_URL = '/api'; // Verwende den lokalen Proxy

function roundToMidnight(date: Date): Date {
  const roundedDate = new Date(date);
  roundedDate.setHours(0, 0, 0, 0);
  return roundedDate;
}

function roundToHour(date: Date): Date {
  const roundedDate = new Date(date);
  roundedDate.setMinutes(0, 0, 0);
  return roundedDate;
}

export function useStatusData(timeRange: '24h' | '7d' | '30d' | 'all') {
  const [data, setData] = useState<StatusData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cachedData, setCachedData] = useState<{[key: string]: {data: StatusData[], timestamp: number}}>({});

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchWithRetry = async (endpoint: string, retries = MAX_RETRIES): Promise<any> => {
    let lastError: Error | null = null;

    for (let i = 0; i < retries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json'
          }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Unknown error');
          throw new Error(`HTTP error ${response.status}: ${errorText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format: expected JSON');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        lastError = error as Error;
        
        console.warn(`Fetch attempt ${i + 1}/${retries} failed:`, {
          error,
          endpoint,
          timestamp: new Date().toISOString()
        });

        if (error instanceof DOMException && error.name === 'AbortError') {
          throw new Error('Request timed out. Please check your connection and try again.');
        }

        if (i < retries - 1) {
          const backoffDelay = RETRY_DELAY * Math.pow(2, i);
          await delay(backoffDelay);
          continue;
        }
      }
    }

    throw new Error(lastError?.message || 'Failed to fetch data. Please try again later.');
  };

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        if (!isMounted) return;
        setLoading(true);
        setError(null);

        // Check cache validity based on timeRange
        const cacheKey = `status_${timeRange}`;
        const cachedItem = cachedData[cacheKey];

        if (cachedItem) {
          const cacheAge = Date.now() - cachedItem.timestamp;
          if (cacheAge < CACHE_DURATION) {
            setData(cachedItem.data);
            setLoading(false);
            return;
          }
        }

        const [historyData, shardsData] = await Promise.all([
          fetchWithRetry('/history'),
          fetchWithRetry('/shards')
        ]);

        if (!isMounted) return;

        if (!Array.isArray(historyData)) {
          throw new Error('Invalid history data format: expected array');
        }

        if (!Array.isArray(shardsData)) {
          throw new Error('Invalid shards data format: expected array');
        }

        if (historyData.length === 0) {
          throw new Error('No history data available. Please try again later.');
        }

        if (shardsData.length === 0) {
          throw new Error('No shard data available. Please try again later.');
        }

        const currentLatency = Math.round(
          shardsData.reduce((acc: number, shard: any) => acc + (shard.latency || 0), 0) / shardsData.length
        );

        const now = new Date();
        const pastDate = new Date(now);

        // Calculate the start date based on timeRange
        if (timeRange !== 'all') {
          switch (timeRange) {
            case '24h':
              pastDate.setHours(now.getHours() - 24);
              break;
            case '7d':
              pastDate.setDate(now.getDate() - 7);
              pastDate.setHours(0, 0, 0, 0); // Set to midnight
              break;
            case '30d':
              pastDate.setDate(now.getDate() - 30);
              pastDate.setHours(0, 0, 0, 0); // Set to midnight
              break;
          }
        }

        // Sort history data by timestamp
        const sortedHistory = [...historyData].sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

        // Find the earliest available data point within the requested range
        const availableDataStart = new Date(sortedHistory[0].timestamp);
        const effectivePastDate = timeRange === 'all' 
          ? availableDataStart 
          : (availableDataStart > pastDate ? availableDataStart : pastDate);

        // Group data by appropriate interval (hour or day)
        const groupedData = new Map<string, StatusData>();

        sortedHistory.forEach((item: HistoryData) => {
          const date = new Date(item.timestamp);
          if (date >= effectivePastDate && date <= now) {
            let key: string;
            
            if (timeRange === '24h') {
              // For 24h, group by hour
              key = roundToHour(date).toISOString();
            } else {
              // For 7d, 30d, and all, group by day (midnight)
              key = roundToMidnight(date).toISOString();
            }
            
            // Only keep the first entry for each interval
            if (!groupedData.has(key)) {
              groupedData.set(key, {
                timestamp: key,
                total_servers: item.guilds,
                total_users: item.users,
                average_latency: item.ping
              });
            }
          }
        });

        // Convert Map to array and sort by timestamp
        const sortedData = Array.from(groupedData.values()).sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

        // Add current hour/day data point if needed
        const currentKey = timeRange === '24h' 
          ? roundToHour(now).toISOString()
          : roundToMidnight(now).toISOString();

        if (!groupedData.has(currentKey)) {
          const currentServers = shardsData.reduce((acc: number, shard: any) => acc + (shard.server_count || 0), 0);
          const currentUsers = shardsData.reduce((acc: number, shard: any) => acc + (shard.member_count || 0), 0);
          
          sortedData.push({
            timestamp: currentKey,
            total_servers: currentServers,
            total_users: currentUsers,
            average_latency: currentLatency
          });
        }

        if (!isMounted) return;

        // Update in-memory cache instead of localStorage
        setCachedData(prev => ({
          ...prev,
          [cacheKey]: {
            data: sortedData,
            timestamp: Date.now()
          }
        }));

        setData(sortedData);
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        
        const errorMessage = err instanceof Error 
          ? err.message
          : 'An unexpected error occurred. Please try again later.';
        
        console.error('Error fetching status data:', errorMessage);
        setError(errorMessage);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    const interval = setInterval(fetchData, CACHE_DURATION);

    return () => {
      isMounted = false;
      abortController.abort();
      clearInterval(interval);
    };
  }, [timeRange]);

  return { data, loading, error };
}