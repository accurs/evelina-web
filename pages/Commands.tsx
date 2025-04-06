import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, Terminal, Shield, Bot, ChevronDown, ChevronUp, Settings, PenTool as Tool, Users, Coins, Heart, Music, Ticket, Star, Code, Crown, Bell, Mic2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';

interface Command {
  name: string;
  description: string;
  category: string;
  permissions: string;
  arguments: string;
  aliases: string[];
}

const categoryMapping = {
  'antinuke': 'Administration',
  'auth': 'Administration',
  'automod': 'Automod',
  'autopost': 'Utility',
  'autorole': 'Utility',
  'boosterrole': 'Utility',
  'colorrole': 'Utility',
  'confessions': 'Fun',
  'config': 'Settings',
  'counters': 'Utility',
  'donor': 'Donator',
  'economy': 'Economy',
  'emoji': 'Fun',
  'events': 'Utility',
  'fun': 'Fun',
  'giveaway': 'Fun',
  'info': 'Utility',
  'instagram': 'Social',
  'instance': 'Settings',
  'invitetracker': 'Settings',
  'invoke': 'Utility',
  'lastfm': 'Fun',
  'leveling': 'Leveling',
  'logging': 'Moderation',
  'moderation': 'Moderation',
  'paginate': 'Utility',
  'reseller': 'Settings',
  'responders': 'Utility',
  'role': 'Utility',
  'roleplay': 'Fun',
  'selfbot': 'Fun',
  'social': 'Social',
  'spotify': 'Music',
  'starboard': 'Utility',
  'store': 'Donator',
  'suggestion': 'Utility',
  'ticket': 'Tickets',
  'tiktok': 'Social',
  'twitch': 'Social',
  'twitter': 'Social',
  'utility': 'Utility',
  'vanity': 'Settings',
  'voicemaster': 'Voice',
  'voicetrack': 'Voice',
  'vote': 'Utility',
  'webhooks': 'Utility',
  'whitelist': 'Administration',
  'youtube': 'Social',
};

const categoryIcons = {
  'Administration': Crown,
  'Automod': Shield,
  'Donator': Bell,
  'Economy': Coins,
  'Fun': Heart,
  'Leveling': Star,
  'Moderation': Shield,
  'Music': Music,
  'Settings': Settings,
  'Social': Users,
  'Tickets': Ticket,
  'Utility': Tool,
  'Voice': Mic2,
};

function Commands() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Commands");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await fetch('/api/commands');
        if (!response.ok) {
          throw new Error('Failed to fetch commands');
        }
        const data = await response.json();
        // Filter out staff commands
        const filteredCommands = data.filter((cmd: Command) => 
          !['supporter', 'moderator', 'manager', 'developer', 'jishaku'].includes(cmd.category.toLowerCase())
        );
        setCommands(filteredCommands);
        setLoading(false);
      } catch (err) {
        setError('Unable to fetch commands. Please try again later or join our Discord server for assistance.');
        setLoading(false);
        setCommands([]);
      }
    };

    fetchCommands();
  }, []);

  const capitalizePermissions = (permissions: string) => {
    return permissions.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getCommandCountForCategory = (category: string) => {
    if (category === "All Commands") {
      return commands.length;
    }
    return commands.filter(cmd => {
      const lowerCategory = cmd.category.toLowerCase();
      return lowerCategory in categoryMapping && categoryMapping[lowerCategory as keyof typeof categoryMapping] === category;
    }).length;
  };

  const filteredCommands = commands.filter(command => {
    const lowerCategory = command.category.toLowerCase();
    const matchesCategory = selectedCategory === "All Commands" || 
      (lowerCategory in categoryMapping && categoryMapping[lowerCategory as keyof typeof categoryMapping] === selectedCategory);
    const matchesSearch = command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         command.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    'All Commands',
    'Administration',
    'Automod',
    'Donator',
    'Economy',
    'Fun',
    'Leveling',
    'Moderation',
    'Music',
    'Settings',
    'Social',
    'Tickets',
    'Utility',
    'Voice'
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <PageHeader
          icon={<Terminal />}
          title="Commands"
          description="Explore all available commands and their usage"
        />

        {/* Search and Category Selection */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
            <div className="w-full h-10 bg-dark-2 rounded-lg"></div>
          </div>

          {/* Mobile Category Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:hidden">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-10 bg-dark-2 rounded-lg"></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="feature-card rounded-lg p-4 sticky top-24">
              <div className="h-6 bg-dark-2 rounded w-32 mb-4"></div>
              <div className="space-y-2">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-10 bg-dark-2 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Commands Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="feature-card rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="h-6 bg-dark-2 rounded w-32 mb-2"></div>
                      <div className="h-4 bg-dark-2 rounded w-48"></div>
                    </div>
                    <div className="h-6 bg-dark-2 rounded w-24"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="h-4 bg-dark-2 rounded w-20"></div>
                        <div className="h-8 bg-dark-2 rounded"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-4 bg-dark-2 rounded w-20"></div>
                        <div className="h-8 bg-dark-2 rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-4 bg-dark-2 rounded w-20"></div>
                      <div className="h-8 bg-dark-2 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <PageHeader
          icon={<Terminal />}
          title="Commands"
          description="Explore all available commands and their usage"
        />
        
        <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-center gap-3 text-red-400 mb-2">
            <AlertCircle className="w-5 h-5" />
            <h3 className="font-semibold">Error</h3>
          </div>
          <p className="text-gray-400">{error}</p>
          <div className="mt-4 flex gap-4">
            <a
              href="https://discord.gg/evelina"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-theme hover:text-theme/80 transition-colors"
            >
              Join Discord Server
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 text-sm text-theme hover:text-theme/80 transition-colors"
            >
              Try Again
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <PageHeader
        icon={<Terminal />}
        title="Commands"
        description="Explore all available commands and their usage"
      />

      {/* Search and Category Selection - Mobile Optimized */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search commands..."
            className="w-full pl-10 pr-4 py-2 bg-[#111] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-theme border border-dark-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Mobile Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:hidden">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                selectedCategory === category
                  ? 'bg-theme/20 text-theme'
                  : 'bg-dark-2 hover:bg-dark-1 text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {category !== 'All Commands' && categoryIcons[category as keyof typeof categoryIcons] && (
                  <div className={selectedCategory === category ? 'text-theme' : 'text-gray-400'}>
                    {React.createElement(categoryIcons[category as keyof typeof categoryIcons], { size: 16 })}
                  </div>
                )}
                <span className="truncate">{category}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Desktop Only */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="feature-card rounded-lg p-4 sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <nav className="space-y-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-theme/20 text-theme'
                      : 'hover:bg-dark-2 text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {category !== 'All Commands' && categoryIcons[category as keyof typeof categoryIcons] && (
                        <div className={selectedCategory === category ? 'text-theme' : 'text-gray-400'}>
                          {React.createElement(categoryIcons[category as keyof typeof categoryIcons], { size: 16 })}
                        </div>
                      )}
                      {category}
                    </div>
                    <span className={`text-sm ${selectedCategory === category ? 'text-theme' : 'text-gray-500'}`}>
                      {getCommandCountForCategory(category)}
                    </span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Commands Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommands.map((command) => (
              <div key={command.name} className="feature-card rounded-lg p-4">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-theme">
                        {command.name}
                      </h3>
                      <p className="text-gray-400 mt-1">{command.description}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#111] text-xs text-theme whitespace-nowrap">
                      {command.category.toLowerCase() in categoryMapping 
                        ? categoryMapping[command.category.toLowerCase() as keyof typeof categoryMapping] 
                        : command.category}
                    </span>
                  </div>
                  <div className="space-y-3 mt-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-sm">Permissions</span>
                        <div className="bg-[#111] px-3 py-2 rounded text-theme text-sm">
                          {capitalizePermissions(command.permissions)}
                        </div>
                      </div>
                      {command.aliases && command.aliases.length > 0 && (
                        <div className="flex flex-col gap-1">
                          <span className="text-gray-500 text-sm">Aliases</span>
                          <div className="bg-[#111] px-3 py-2 rounded text-gray-300 text-sm">
                            {command.aliases.join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-500 text-sm">Arguments</span>
                      <code className="bg-[#111] px-3 py-2 rounded text-gray-300 text-sm">
                        {command.arguments}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCommands.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No commands found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Commands;