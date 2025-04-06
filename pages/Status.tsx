import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, Activity, Server, Users, Clock, Gauge, Signal, RefreshCw } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
  ChartOptions
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import PageHeader from '../components/PageHeader';
import { useStatusData } from '../hooks/useStatusData';
import { useShardData } from '../hooks/useShardData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

type TimeRange = '24h' | '7d' | '30d' | 'all';

interface PeriodChange {
  servers: number;
  users: number;
}

function Status() {
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const [retryCount, setRetryCount] = useState(0);
  const [periodChanges, setPeriodChanges] = useState<PeriodChange>({ servers: 0, users: 0 });
  const { data, loading: statusLoading, error: statusError } = useStatusData(timeRange);
  const { shards, loading: shardsLoading, error: shardsError } = useShardData();
  const serverChartRef = useRef<any>(null);
  const userChartRef = useRef<any>(null);
  const [chartKey, setChartKey] = useState(0);

  // Cleanup charts on unmount
  useEffect(() => {
    return () => {
      if (serverChartRef.current) {
        serverChartRef.current.destroy();
      }
      if (userChartRef.current) {
        userChartRef.current.destroy();
      }
    };
  }, []);

  // Force chart remount when timeRange changes
  useEffect(() => {
    setChartKey(prev => prev + 1);
  }, [timeRange]);

  // Calculate changes over the selected period
  useEffect(() => {
    if (data.length >= 2) {
      const firstDataPoint = data[0];
      const lastDataPoint = data[data.length - 1];

      setPeriodChanges({
        servers: lastDataPoint.total_servers - firstDataPoint.total_servers,
        users: lastDataPoint.total_users - firstDataPoint.total_users
      });
    }
  }, [data]);

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: timeRange === '24h' ? 'hour' as const : 'day' as const,
          displayFormats: {
            hour: 'HH:mm',
            day: 'MMM d'
          }
        },
        grid: {
          display: false
        },
        ticks: {
          color: '#9ca3af'
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#9ca3af',
          callback: function(value: number) {
            return value.toLocaleString();
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(17, 17, 17, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(114, 155, 176, 0.2)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            const currentValue = context.raw;
            const dataIndex = context.dataIndex;
            const dataset = context.dataset.data;
            
            // Calculate difference from previous point
            if (dataIndex > 0) {
              const previousValue = dataset[dataIndex - 1];
              const difference = currentValue - previousValue;
              const sign = difference > 0 ? '+' : '';
              return [
                `${currentValue.toLocaleString()} [${sign}${difference.toLocaleString()}]`,
              ];
            }
            
            return `${currentValue.toLocaleString()}`;
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    }
  };

  const formatUptime = (seconds: number) => {
    if (!seconds || seconds < 0) return '0h 0m';
    
    const ms = seconds * 1000;
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours === 0) {
      return `${minutes}m`;
    }
    
    return `${hours}h ${minutes}m`;
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
    setChartKey(prev => prev + 1); // Force chart remount
  };

  if (statusLoading || shardsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <PageHeader
          icon={<Activity />}
          title="Status"
          description="Real-time status and performance metrics"
        />

        {/* Loading Skeleton */}
        <div className="feature-card rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-dark-2 rounded-full"></div>
              <div className="h-7 bg-dark-2 rounded w-48"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-dark-2/50 rounded-lg p-4">
                <div className="h-6 bg-dark-2 rounded w-32 mb-2"></div>
                <div className="h-8 bg-dark-2 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Shards Loading State */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="feature-card rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 bg-dark-2 rounded w-32"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-dark-2 rounded-full"></div>
                  <div className="h-5 bg-dark-2 rounded w-20"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, j) => (
                  <div key={j}>
                    <div className="h-4 bg-dark-2 rounded w-20 mb-1"></div>
                    <div className="h-6 bg-dark-2 rounded w-24"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (statusError || shardsError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <PageHeader
          icon={<Activity />}
          title="Status"
          description="Real-time status and performance metrics"
        />
        <div className="feature-card rounded-lg p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Error Loading Status</h3>
            <p className="text-gray-400 mb-6">{statusError || shardsError}</p>
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 bg-theme hover:bg-theme/80 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate total stats from all shards
  const totalStats = shards.reduce((acc, shard) => ({
    servers: acc.servers + shard.server_count,
    users: acc.users + shard.member_count,
    latency: acc.latency + shard.latency,
    readyShards: acc.readyShards + (shard.is_ready ? 1 : 0)
  }), { servers: 0, users: 0, latency: 0, readyShards: 0 });

  const averageLatency = Math.round(totalStats.latency / shards.length);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <PageHeader
        icon={<Activity />}
        title="Status"
        description="Real-time status and performance metrics"
      />

      {/* Overall Status */}
      <div className="feature-card rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 ${totalStats.readyShards === shards.length ? 'bg-green-500' : 'bg-yellow-500'} rounded-full`}></div>
            <span className="text-xl font-semibold">
              {totalStats.readyShards === shards.length 
                ? 'All Systems Operational'
                : `${totalStats.readyShards}/${shards.length} Shards Operational`
              }
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleTimeRangeChange('24h')}
              className={`px-3 py-1 rounded ${
                timeRange === '24h' 
                  ? 'bg-theme text-white' 
                  : 'bg-dark-2 text-gray-400 hover:bg-dark-1'
              }`}
            >
              24h
            </button>
            <button
              onClick={() => handleTimeRangeChange('7d')}
              className={`px-3 py-1 rounded ${
                timeRange === '7d' 
                  ? 'bg-theme text-white' 
                  : 'bg-dark-2 text-gray-400 hover:bg-dark-1'
              }`}
            >
              7d
            </button>
            <button
              onClick={() => handleTimeRangeChange('30d')}
              className={`px-3 py-1 rounded ${
                timeRange === '30d' 
                  ? 'bg-theme text-white' 
                  : 'bg-dark-2 text-gray-400 hover:bg-dark-1'
              }`}
            >
              30d
            </button>
            <button
              onClick={() => handleTimeRangeChange('all')}
              className={`px-3 py-1 rounded ${
                timeRange === 'all' 
                  ? 'bg-theme text-white' 
                  : 'bg-dark-2 text-gray-400 hover:bg-dark-1'
              }`}
            >
              All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-dark-2/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Gauge className="w-5 h-5 text-theme" />
              <span className="text-gray-400">Avg. Latency</span>
            </div>
            <span className="text-2xl font-bold">
              {averageLatency}ms
            </span>
          </div>
          <div className="bg-dark-2/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Server className="w-5 h-5 text-theme" />
              <span className="text-gray-400">Total Servers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {totalStats.servers.toLocaleString()}
              </span>
              {periodChanges.servers !== 0 && (
                <span className={`text-sm ${periodChanges.servers > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {periodChanges.servers > 0 ? '+' : ''}{periodChanges.servers.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <div className="bg-dark-2/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-theme" />
              <span className="text-gray-400">Total Users</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {totalStats.users.toLocaleString()}
              </span>
              {periodChanges.users !== 0 && (
                <span className={`text-sm ${periodChanges.users > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {periodChanges.users > 0 ? '+' : ''}{periodChanges.users.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Growth Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-dark-2/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Server Growth</h3>
            <div className="h-64">
              <Line
                key={`server-${chartKey}`}
                ref={serverChartRef}
                data={{
                  labels: data.map(d => new Date(d.timestamp)),
                  datasets: [{
                    data: data.map(d => d.total_servers),
                    borderColor: '#729bb0',
                    backgroundColor: 'rgba(114, 155, 176, 0.1)',
                    fill: true,
                    tension: 0.4
                  }]
                }}
                options={chartOptions}
              />
            </div>
          </div>
          <div className="bg-dark-2/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">User Growth</h3>
            <div className="h-64">
              <Line
                key={`user-${chartKey}`}
                ref={userChartRef}
                data={{
                  labels: data.map(d => new Date(d.timestamp)),
                  datasets: [{
                    data: data.map(d => d.total_users),
                    borderColor: '#729bb0',
                    backgroundColor: 'rgba(114, 155, 176, 0.1)',
                    fill: true,
                    tension: 0.4
                  }]
                }}
                options={chartOptions}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shards Status */}
      <h2 className="text-2xl font-bold mb-4">Shard Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shards.map(shard => (
          <div key={shard.shard_id} className="feature-card rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-xl font-semibold">Shard {shard.shard_id}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 ${shard.is_ready ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
                <span className="text-gray-400">{shard.is_ready ? 'Operational' : 'Down'}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Uptime</span>
                </div>
                <span className="text-lg font-semibold">{formatUptime(shard.uptime)}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Signal className="w-4 h-4" />
                  <span>Latency</span>
                </div>
                <span className="text-lg font-semibold">{shard.latency}ms</span>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Server className="w-4 h-4" />
                  <span>Servers</span>
                </div>
                <span className="text-lg font-semibold">{shard.server_count.toLocaleString()}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Users className="w-4 h-4" />
                  <span>Users</span>
                </div>
                <span className="text-lg font-semibold">{shard.member_count.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Status;