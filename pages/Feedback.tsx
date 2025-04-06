import React, { useState, useEffect } from 'react';
import { MessageSquare, AlertCircle, ThumbsUp, RefreshCw, ChevronDown } from 'lucide-react';
import PageHeader from '../components/PageHeader';

interface FeedbackItem {
  approved: boolean;
  feedback: string;
  user_id: string;
  user_data?: {
    avatar: string;
    user: string;
  };
}

const MAX_RETRIES = 3;
const ITEMS_PER_PAGE = 6;

function Feedback() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchWithRetry = async (url: string, retries = MAX_RETRIES): Promise<any> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (retries > 0) {
        await delay(1000);
        return fetchWithRetry(url, retries - 1);
      }
      throw error;
    }
  };

  const fetchUserData = async (userId: string) => {
    try {
      const userData = await fetchWithRetry(`/api/user/${userId}`);
      return userData;
    } catch (error) {
      console.warn(`Failed to fetch user data for ${userId}:`, error);
      return null;
    }
  };

  const fetchFeedbackPage = async (pageNum: number, isLoadingMore = false) => {
    try {
      if (!isLoadingMore) {
        setError(null);
      }
  
      // Feedback-Daten abrufen
      const feedbackResponse = await fetchWithRetry('/api/feedback');
      if (!feedbackResponse) throw new Error('Failed to fetch feedback');
  
      // Nur genehmigtes Feedback filtern und nach message_id absteigend sortieren
      const approvedFeedback = feedbackResponse
        .filter((item: FeedbackItem) => item.approved)
        .sort((a: any, b: any) => Number(b.message_id) - Number(a.message_id))
        .slice(pageNum * ITEMS_PER_PAGE, (pageNum + 1) * ITEMS_PER_PAGE);
  
      // Prüfen, ob es weitere Einträge gibt
      setHasMore((pageNum + 1) * ITEMS_PER_PAGE < feedbackResponse.filter((item: FeedbackItem) => item.approved).length);
  
      // Verarbeite alle Feedback-Elemente parallel
      const processedItems = await Promise.all(
        approvedFeedback.map(async (item: FeedbackItem) => {
          const userData = await fetchUserData(item.user_id);
          return {
            ...item,
            user_data: userData
          };
        })
      );
  
      if (isLoadingMore) {
        setFeedback(prev => [...prev, ...processedItems]);
      } else {
        setFeedback(processedItems);
      }
  
      return processedItems;
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setError('Failed to load feedback. Please try again later.');
      return [];
    }
  };  

  useEffect(() => {
    const loadInitialFeedback = async () => {
      setLoading(true);
      await fetchFeedbackPage(0);
      setLoading(false);
    };

    loadInitialFeedback();
  }, [retryCount]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setPage(0);
    setRetryCount(prev => prev + 1);
  };

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = page + 1;
    await fetchFeedbackPage(nextPage, true);
    setPage(nextPage);
    setLoadingMore(false);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <PageHeader
          icon={<MessageSquare />}
          title="Community Feedback"
          description="See what our users are saying about Evelina"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={`skeleton-${i}`} className="feature-card rounded-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-dark-2 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-5 bg-dark-2 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-dark-2 rounded w-24"></div>
                </div>
                <div className="h-7 bg-dark-2 rounded w-20"></div>
              </div>

              <div className="space-y-2">
                <div className="h-4 bg-dark-2 rounded w-full"></div>
                <div className="h-4 bg-dark-2 rounded w-3/4"></div>
                <div className="h-4 bg-dark-2 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <PageHeader
          icon={<MessageSquare />}
          title="Community Feedback"
          description="See what our users are saying about Evelina"
        />
        
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Error Loading Feedback</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-theme hover:bg-theme/80 rounded-lg text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <PageHeader
        icon={<MessageSquare />}
        title="Community Feedback"
        description="See what our users are saying about Evelina"
      />

      {feedback.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Feedback Yet</h3>
          <p className="text-gray-400">Be the first to share your experience with Evelina!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedback.map((item) => (
              <div key={`feedback-${item.user_id}`} className="feature-card rounded-lg p-6 flex flex-col min-h-[300px]">
                <div className="flex items-center gap-4 mb-6">
                  {item.user_data?.avatar ? (
                    <img
                      src={item.user_data.avatar}
                      alt={item.user_data.user}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-dark-2 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-gray-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.user_data?.user || 'Unknown User'}
                    </h3>
                  </div>
                  <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    Approved
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-gray-300">{item.feedback}</p>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="flex items-center gap-2 px-6 py-3 bg-theme hover:bg-theme/80 text-white rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loadingMore ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-5 h-5" />
                    Load More
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Feedback;