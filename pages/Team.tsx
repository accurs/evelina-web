import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { FaGithub, FaDiscord, FaTiktok, FaSpotify, FaYoutube, FaInstagram, FaSnapchat, FaSteam, FaSoundcloud, FaGlobe, FaXTwitter } from 'react-icons/fa6';
import PageHeader from '../components/PageHeader';

interface TeamMember {
  user_id: string;
  rank: string;
  socials: string | {
    custom?: string;
    github?: string;
    discord?: string;
    tiktok?: string;
    spotify?: string;
    youtube?: string;
    instagram?: string;
    snapchat?: string;
    steam?: string;
    soundcloud?: string;
    twitter?: string;
  };
  user_data?: {
    activity?: {
      details: string;
      emoji: string;
      image: string;
      name: string;
      state: string;
    };
    avatar: string;
    banner: string;
    banner_color?: string;
    user: string;
  };
}

const MAX_RETRIES = 3;

// Add this sorting function at the top level
const sortMembersByUserId = (members: TeamMember[]) => {
  return [...members].sort((a, b) => {
    // Convert string IDs to BigInt to handle large numbers correctly
    const idA = BigInt(a.user_id);
    const idB = BigInt(b.user_id);
    return idA < idB ? -1 : idA > idB ? 1 : 0;
  });
};

function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Helper function to delay execution
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Helper function to safely parse JSON
  const safeJSONParse = (str: string | Record<string, string>) => {
    if (typeof str !== 'string') return str;
    try {
      return JSON.parse(str);
    } catch (e) {
      console.warn('Failed to parse JSON:', str);
      return {};
    }
  };

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

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setError(null);
        setTeamMembers([]); // Reset team members before fetching new data
        
        // Fetch team members
        const teamData = await fetchWithRetry('/api/team');
        
        if (!Array.isArray(teamData)) {
          throw new Error('Invalid team data format');
        }

        // Process team members in parallel
        const processedMembers = await Promise.all(teamData.map(async (member) => {
          try {
            const socials = safeJSONParse(member.socials);
            const userData = await fetchWithRetry(`/api/user/${member.user_id}`);
            
            return {
              ...member,
              socials,
              user_data: userData,
            };
          } catch (error) {
            console.warn(`Failed to fetch data for user ${member.user_id}:`, error);
            return {
              ...member,
              socials: safeJSONParse(member.socials),
            };
          }
        }));

        // Sort and set the processed members
        setTeamMembers(sortMembersByUserId(processedMembers));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('Failed to load team members. Please try again later.');
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [retryCount]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setRetryCount(prev => prev + 1);
  };

  const getDisplayName = (member: TeamMember) => {
    return member.user_data?.user || 'Unknown User';
  };

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'developer':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/20';
      case 'manager':
        return 'bg-red-500/20 text-red-400 border border-red-500/20';
      case 'moderator':
        return 'bg-purple-500/20 text-purple-400 border border-purple-500/20';
      case 'supporter':
        return 'bg-green-500/20 text-green-400 border border-green-500/20';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/20';
    }
  };

  const getRankGradient = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'developer':
        return 'from-blue-500 to-blue-600';
      case 'manager':
        return 'from-red-500 to-red-600';
      case 'moderator':
        return 'from-purple-500 to-purple-600';
      case 'supporter':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getSocialIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'github':
        return <FaGithub className="w-5 h-5" />;
      case 'discord':
        return <FaDiscord className="w-5 h-5" />;
      case 'tiktok':
        return <FaTiktok className="w-5 h-5" />;
      case 'spotify':
        return <FaSpotify className="w-5 h-5" />;
      case 'youtube':
        return <FaYoutube className="w-5 h-5" />;
      case 'instagram':
        return <FaInstagram className="w-5 h-5" />;
      case 'snapchat':
        return <FaSnapchat className="w-5 h-5" />;
      case 'steam':
        return <FaSteam className="w-5 h-5" />;
      case 'soundcloud':
        return <FaSoundcloud className="w-5 h-5" />;
      case 'custom':
        return <FaGlobe className="w-5 h-5" />;
      case 'twitter':
        return <FaXTwitter className="w-5 h-5" />;
      default:
        return <FaExternalLinkAlt className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <PageHeader
          icon={<Users />}
          title="Our Team"
          description="Meet the people behind Evelina"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={`skeleton-${i}`} className="feature-card rounded-lg overflow-hidden">
              {/* Banner Skeleton */}
              <div className="h-32 bg-dark-2"></div>
              
              <div className="p-6">
                {/* Avatar and Info */}
                <div className="flex flex-col items-center">
                  <div className="relative -mt-16 mb-4">
                    <div className="w-24 h-24 rounded-full bg-dark-2 border-4 border-dark-1"></div>
                  </div>

                  {/* Name and Rank */}
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="h-6 bg-dark-2 rounded w-32"></div>
                      <div className="h-5 bg-dark-2 rounded w-20"></div>
                    </div>

                    {/* Activity Status */}
                    <div className="mt-3">
                      <div className="h-6 bg-dark-2 rounded w-40 mx-auto"></div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center flex-wrap gap-2 mt-auto pt-4 border-t border-dark-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={`social-${j}`} className="w-10 h-10 bg-dark-2 rounded-lg"></div>
                  ))}
                </div>
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
          icon={<Users />}
          title="Our Team"
          description="Meet the people behind Evelina"
        />
        
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-3 text-red-400 mb-2">
              <FaExternalLinkAlt className="w-5 h-5" />
              <h3 className="font-semibold">Error</h3>
            </div>
            <p className="text-gray-400">{error}</p>
            <div className="mt-4 flex gap-4 justify-center">
              <button
                onClick={handleRetry}
                className="inline-flex items-center gap-2 px-4 py-2 bg-theme hover:bg-theme/80 text-white rounded-lg transition-colors"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
                Try Again
              </button>
              <a
                href="https://discord.gg/evelina"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg transition-colors"
              >
                <FaDiscord className="w-4 h-4" />
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Group members by rank
  const membersByRank = teamMembers.reduce((acc, member) => {
    const rank = member.rank || 'Other';
    if (!acc[rank]) acc[rank] = [];
    acc[rank].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);

  // Sort members within each rank
  Object.keys(membersByRank).forEach(rank => {
    membersByRank[rank] = sortMembersByUserId(membersByRank[rank]);
  });

  // Order of ranks
  const rankOrder = ['Developer', 'Manager', 'Moderator', 'Supporter'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <PageHeader
        icon={<Users />}
        title="Our Team"
        description="Meet the people behind Evelina"
      />

      {rankOrder.map(rank => {
        const members = membersByRank[rank];
        if (!members?.length) return null;

        return (
          <div key={`rank-${rank}`} className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-theme to-theme/60">
                {rank}s
              </h2>
              <p className="text-gray-400 mt-2">
                {rank === 'Developer' && 'The masterminds behind Evelina\'s development'}
                {rank === 'Manager' && 'Keeping everything running smoothly'}
                {rank === 'Moderator' && 'Ensuring a safe and friendly community'}
                {rank === 'Supporter' && 'Helping users with their questions and issues'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member) => (
                <div key={`member-${member.user_id}`} className="feature-card rounded-lg overflow-hidden flex flex-col">
                  {/* Banner */}
                  <div 
                    className="h-32 relative bg-cover bg-center"
                    style={{
                      backgroundImage: member.user_data?.banner 
                        ? `url(${member.user_data.banner})`
                        : undefined,
                      backgroundColor: member.user_data?.banner_color || undefined
                    }}
                  >
                    {!member.user_data?.banner && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${getRankGradient(member.rank)} opacity-75`} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                  </div>
                  
                  <div className="p-6 relative flex-1 flex flex-col">
                    {/* Avatar and Info */}
                    <div className="flex flex-col items-center">
                      <div className="relative -mt-16 mb-4">
                        <div className={`absolute inset-0 -m-1 rounded-full blur-sm ${getRankGradient(member.rank)} opacity-75`} />
                        {member.user_data?.avatar ? (
                          <img
                            src={member.user_data.avatar}
                            alt={getDisplayName(member)}
                            className="relative w-24 h-24 rounded-full border-4 border-dark-1 object-cover"
                          />
                        ) : (
                          <div className="relative w-24 h-24 rounded-full bg-dark-2 border-4 border-dark-1 flex items-center justify-center">
                            <FaDiscord className="w-12 h-12 text-gray-600" />
                          </div>
                        )}
                      </div>

                      {/* Name and Rank */}
                      <div className="text-center mb-4">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          <h3 className="text-xl font-semibold text-white">
                            {getDisplayName(member)}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-lg text-sm ${getRankColor(member.rank)}`}>
                            {member.rank}
                          </span>
                        </div>

                        {/* Activity Status - Only shown if activity exists */}
                        {member.user_data?.activity?.name && (
                          <div className="mt-4 text-center">
                            <div className="inline-block bg-dark-2/80 backdrop-blur-sm rounded-lg p-3 text-sm text-gray-300">
                              <div className="flex items-center justify-center gap-2">
                                {member.user_data.activity.emoji && (
                                  <img 
                                    src={member.user_data.activity.emoji} 
                                    alt="emoji"
                                    className="w-4 h-4"
                                  />
                                )}
                                {member.user_data.activity.image && (
                                  <img 
                                    src={member.user_data.activity.image} 
                                    alt="app"
                                    className="w-5 h-5 rounded"
                                  />
                                )}
                                <span className="font-medium">{member.user_data.activity.name}</span>
                              </div>
                              
                              {(member.user_data.activity.details || member.user_data.activity.state) && (
                                <div className="mt-2">
                                  {member.user_data.activity.details && (
                                    <div className="text-xs text-gray-400 truncate">
                                      {member.user_data.activity.details}
                                    </div>
                                  )}
                                  
                                  {member.user_data.activity.state && (
                                    <div className="text-xs text-gray-400 truncate">
                                      {member.user_data.activity.state}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Spacer to push social links to bottom */}
                    <div className="flex-grow"></div>

                    {/* Social Links - Now fixed at bottom */}
                    {member.socials && Object.keys(safeJSONParse(member.socials)).length > 0 && (
                      <div className="flex justify-center flex-wrap gap-2 mt-auto pt-4 border-t border-dark-4">
                        {Object.entries(safeJSONParse(member.socials)).map(([platform, url]) => (
                          <a
                            key={`social-${member.user_id}-${platform}`}
                            href={url as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-dark-2/50 backdrop-blur-sm rounded-lg hover:bg-dark-2 transition-colors group"
                            title={platform}
                          >
                            {getSocialIcon(platform)}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Team;