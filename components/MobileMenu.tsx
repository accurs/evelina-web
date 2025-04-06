import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bot, Home, Terminal, Circle, Code, ExternalLink, Activity, Users, Shield, MessageSquare, UserPlus, Music, Coins, Crown, Gift, ChevronDown, Mic2, Tag, Star, Book, Settings, Bell } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [informationOpen, setInformationOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[90%] max-w-md max-h-[90vh] overflow-y-auto bg-[#1a1a1a] p-6 shadow-xl rounded-lg">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <img 
              src="https://cdn.evelina.bot/web/icon.png" 
              alt="Evelina" 
              className="w-10 h-10 rounded-full"
            />
            <span className="font-bold text-xl">Evelina</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Features Dropdown */}
          <div>
            <button
              onClick={() => setFeaturesOpen(!featuresOpen)}
              className="flex items-center justify-between w-full text-sm font-medium text-gray-400 mb-2"
            >
              <span>Features</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${featuresOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`grid grid-cols-3 gap-2 transition-all duration-200 ${
              featuresOpen ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
            }`}>
              <Link
                to="/features/automod"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <Shield className="w-6 h-6" />
                <span className="text-sm text-center">Auto Mod</span>
              </Link>
              <Link
                to="/features/tickets"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm text-center">Tickets</span>
              </Link>
              <Link
                to="/features/welcome"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <UserPlus className="w-6 h-6" />
                <span className="text-sm text-center">Welcome</span>
              </Link>
              <Link
                to="/features/music"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <Music className="w-6 h-6" />
                <span className="text-sm text-center">Music</span>
              </Link>
              <Link
                to="/features/economy"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <Coins className="w-6 h-6" />
                <span className="text-sm text-center">Economy</span>
              </Link>
              <Link
                to="/features/giveaways"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <Gift className="w-6 h-6" />
                <span className="text-sm text-center">Giveaways</span>
              </Link>
              <Link
                to="/features/voicemaster"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <Mic2 className="w-6 h-6" />
                <span className="text-sm text-center">Voice Master</span>
              </Link>
              <Link
                to="/features/vanityroles"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <Crown className="w-6 h-6" />
                <span className="text-sm text-center">Vanity Roles</span>
              </Link>
              <Link
                to="/features/buttonroles"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <Tag className="w-6 h-6" />
                <span className="text-sm text-center">Button Roles</span>
              </Link>
              <Link
                to="/features/leveling"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <Star className="w-6 h-6" />
                <span className="text-sm text-center">Leveling</span>
              </Link>
              <Link
                to="/features/bump"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <Bell className="w-6 h-6" />
                <span className="text-sm text-center">Bump</span>
              </Link>
              <Link
                to="/avatars"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <Users className="w-6 h-6" />
                <span className="text-sm text-center">Avatars</span>
              </Link>
            </div>
          </div>

          {/* Information Dropdown */}
          <div>
            <button
              onClick={() => setInformationOpen(!informationOpen)}
              className="flex items-center justify-between w-full text-sm font-medium text-gray-400 mb-2"
            >
              <span>Information</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${informationOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`grid grid-cols-2 gap-2 transition-all duration-200 ${
              informationOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
            }`}>
              <Link
                to="/embed"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <Code className="w-6 h-6" />
                <span className="text-sm text-center">Embed Builder</span>
              </Link>
              <Link
                to="/templates"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <Code className="w-6 h-6" />
                <span className="text-sm text-center">Templates</span>
              </Link>
              <a
                href="https://docs.evelina.bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <Book className="w-6 h-6" />
                <span className="text-sm text-center">Documentation</span>
              </a>
              <Link
                to="/team"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <Users className="w-6 h-6" />
                <span className="text-sm text-center">Team</span>
              </Link>
              <Link
                to="/feedback"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm text-center">Feedback</span>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Navigation</h3>
            <nav className="space-y-2">
              <Link
                to="/commands"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <Terminal className="w-5 h-5" />
                Commands
              </Link>
              <Link
                to="/status"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-black/20 text-gray-300 hover:text-white transition-colors"
                onClick={onClose}
              >
                <Activity className="w-5 h-5" />
                Status
              </Link>
            </nav>
          </div>

          <div className="space-y-2">
            <Link
              to="/premium"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white transition-colors justify-center"
              onClick={onClose}
            >
              <Crown className="w-5 h-5" />
              Premium
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white transition-colors justify-center"
              onClick={onClose}
            >
              <Settings className="w-5 h-5" />
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;