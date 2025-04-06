import React, { useState, useEffect } from 'react';
import { Code, Search, Copy, AlertCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';

interface Template {
  code: string;
  embed: string;
  id: string;
  image: string;
  name: string;
  user_id: string;
}

const categories = [
  'All',
  'Jail',
  'Unjail',
  'Ban',
  'Unban',
  'Kick',
  'Mute',
  'Unmute'
];

function EmbedTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTemplates = async () => {
    try {
      setError(null);
      const response = await fetch('/api/templates');
      if (!response.ok) throw new Error('Failed to fetch templates');
      const data = await response.json();
      setTemplates(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load templates. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-dark-2 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <Copy className="h-10 w-10 text-theme p-2" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-100">Copied to clipboard</p>
              <p className="mt-1 text-sm text-gray-400">The embed code has been copied to your clipboard.</p>
            </div>
          </div>
        </div>
      </div>
    ), { position: "top-right", duration: 2000 });
  };

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.name.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-32 bg-dark-2 rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="feature-card rounded-lg p-6">
                <div className="h-48 bg-dark-2 rounded-lg mb-4"></div>
                <div className="h-6 bg-dark-2 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-dark-2 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <PageHeader
        icon={<Code />}
        title="Embed Templates"
        description="Browse and use pre-made embed templates"
      />

      {error && (
        <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-center gap-3 text-red-400 mb-2">
            <AlertCircle className="w-5 h-5" />
            <h3 className="font-semibold">Error</h3>
          </div>
          <p className="text-gray-400">{error}</p>
          <button
            onClick={fetchTemplates}
            className="mt-4 inline-flex items-center gap-2 text-sm text-theme hover:text-theme/80 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      )}

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2 bg-[#111] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-theme border border-dark-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-[#111] rounded-lg text-white border border-dark-4 focus:outline-none focus:ring-2 focus:ring-theme"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="feature-card rounded-lg overflow-hidden">
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-48 object-cover bg-dark-2"
            />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{template.name}</h3>
                <button
                  onClick={() => handleCopyCode(template.embed)}
                  className="p-2 bg-theme/20 hover:bg-theme/30 text-theme rounded-lg transition-colors"
                  title="Copy embed code"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No templates found matching your criteria.
        </div>
      )}
    </div>
  );
}

export default EmbedTemplates;