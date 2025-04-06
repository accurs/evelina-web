import React, { useState } from 'react';
import { Bot, Shield, Ticket, Gift, UserPlus, Mic2, Tag, Lightbulb, SatelliteDish, Award, Clock, Music, Mail, LayoutTemplate as Template, ExternalLink, Terminal, Book, Hammer, Lock, RotateCcw, Contact2, Code, Menu, Users, Crown, MessageSquare, Settings, Coins, Star, Bell } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useScrollToTop } from './hooks/useScrollToTop';
import { usePageTitle } from './hooks/usePageTitle';
import Commands from './pages/Commands';
import Status from './pages/Status';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Economy from './pages/Economy';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
import Contact from './pages/Contact';
import EmbedBuilder from './pages/EmbedBuilder';
import EmbedTemplates from './pages/EmbedTemplates';
import Team from './pages/Team';
import Premium from './pages/Premium';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';
import MobileMenu from './components/MobileMenu';
import ScrollToTop from './components/ScrollToTop';
import NavDropdown from './components/NavDropdown';
import Avatars from './pages/Avatars';
import UserAvatars from './pages/UserAvatars';
import AutoModeration from './pages/features/AutoModeration';
import TicketSystem from './pages/features/TicketSystem';
import WelcomeSystem from './pages/features/WelcomeSystem';
import MusicPlayer from './pages/features/MusicPlayer';
import EconomySystem from './pages/features/EconomySystem';
import Giveaways from './pages/features/Giveaways';
import VoiceMaster from './pages/features/VoiceMaster';
import VanityRoles from './pages/features/VanityRoles';
import ButtonRoles from './pages/features/ButtonRoles';
import Leveling from './pages/features/Leveling';
import BumpReminder from './pages/features/BumpReminder';

// Epic Games Redirect Component
function EpicGamesRedirect() {
  React.useEffect(() => {
    const gameId = window.location.pathname.split('/epicgames/')[1];
    if (gameId) {
      window.location.href = `com.epicgames.launcher://apps/${gameId}?action=launch&silent=true`;
      // Close the window after a short delay to ensure the redirect has started
      setTimeout(() => window.close(), 500);
    }
  }, []);

  return null;
}

const features = [
  {
    title: 'Auto Moderation',
    description: 'Keep your server safe with advanced auto-mod features',
    icon: <Shield className="w-5 h-5" />,
    path: '/features/automod'
  },
  {
    title: 'Ticket System',
    description: 'Manage support tickets efficiently',
    icon: <Ticket className="w-5 h-5" />,
    path: '/features/tickets'
  },
  {
    title: 'Welcome System',
    description: 'Customize welcome messages and autoroles',
    icon: <UserPlus className="w-5 h-5" />,
    path: '/features/welcome'
  },
  {
    title: 'Music Player',
    description: 'High quality music playback with playlist support',
    icon: <Music className="w-5 h-5" />,
    path: '/features/music'
  },
  {
    title: 'Economy System',
    description: 'Engage your community with a virtual economy',
    icon: <Coins className="w-5 h-5" />,
    path: '/features/economy'
  },
  {
    title: 'Giveaways',
    description: 'Create and manage server giveaways',
    icon: <Gift className="w-5 h-5" />,
    path: '/features/giveaways'
  },
  {
    title: 'Voice Master',
    description: 'Create and manage custom voice channels',
    icon: <Mic2 className="w-5 h-5" />,
    path: '/features/voicemaster'
  },
  {
    title: 'Vanity Roles',
    description: 'Custom roles for boosters and special members',
    icon: <Crown className="w-5 h-5" />,
    path: '/features/vanityroles'
  },
  {
    title: 'Button Roles',
    description: 'Create interactive role selection menus',
    icon: <Tag className="w-5 h-5" />,
    path: '/features/buttonroles'
  },
  {
    title: 'Leveling System',
    description: 'Text and voice leveling with rewards',
    icon: <Star className="w-5 h-5" />,
    path: '/features/leveling'
  },
  {
    title: 'Bump Reminder',
    description: 'Never miss a bump with automated reminders',
    icon: <Bell className="w-5 h-5" />,
    path: '/features/bump'
  },
  {
    title: 'Avatar History',
    description: 'Browse user avatar history',
    icon: <Users className="w-5 h-5" />,
    path: '/avatars'
  }
];

const information = [
  {
    title: 'Embed Builder',
    description: 'Create beautiful Discord embeds',
    icon: <Code className="w-5 h-5" />,
    path: '/embed'
  },
  {
    title: 'Embed Templates',
    description: 'Browse pre-made embed templates',
    icon: <Template className="w-5 h-5" />,
    path: '/templates'
  },
  {
    title: 'Documentation',
    description: 'Learn how to use Evelina',
    icon: <Book className="w-5 h-5" />,
    path: 'https://docs.evelina.bot',
    external: true
  },
  {
    title: 'Team',
    description: 'Meet the people behind Evelina',
    icon: <Users className="w-5 h-5" />,
    path: '/team'
  },
  {
    title: 'Feedback',
    description: 'See what our users are saying',
    icon: <MessageSquare className="w-5 h-5" />,
    path: '/feedback'
  }
];

function AppContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useScrollToTop();
  usePageTitle();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Toaster position="top-right" />
      <ScrollToTop />
      
      {/* Navbar */}
      <div className="fixed w-full z-50 top-0">
        <nav className="bg-[#0a0a0a]/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            {/* Left side */}
            <Link to="/" className="text-2xl font-bold text-white flex items-center gap-3 hover:opacity-90 transition-opacity h-20">
              <img 
                src="https://cdn.evelina.bot/web/icon.png" 
                alt="Evelina" 
                className="w-10 h-10 rounded-full"
              />
              Evelina
            </Link>
            
            {/* Center */}
            <div className="hidden lg:flex items-center">
              <NavDropdown title="Features" items={features} />
              <NavDropdown title="Information" items={information} />
              <Link to="/commands" className="h-20 px-4 flex items-center text-gray-400 hover:text-theme transition-colors">
                Commands
              </Link>
              <Link to="/status" className="h-20 px-4 flex items-center text-gray-400 hover:text-theme transition-colors">
                Status
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4 h-20">
              <Link
                to="/premium"
                className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-theme/20"
              >
                <Crown className="w-4 h-4" />
                Premium
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
        {/* Border line */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Main Content */}
      <div className="pt-20">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/commands" element={<Commands />} />
          <Route path="/status" element={<Status />} />
          <Route path="/team" element={<Team />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/economy" element={<Economy />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/embed" element={<EmbedBuilder />} />
          <Route path="/templates" element={<EmbedTemplates />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/avatars/:userId" element={<UserAvatars />} />

          {/* Epic Games Redirect Route */}
          <Route path="/epicgames/*" element={<EpicGamesRedirect />} />

          {/* Feature Routes */}
          <Route path="/features/automod" element={<AutoModeration />} />
          <Route path="/features/tickets" element={<TicketSystem />} />
          <Route path="/features/welcome" element={<WelcomeSystem />} />
          <Route path="/features/music" element={<MusicPlayer />} />
          <Route path="/features/economy" element={<EconomySystem />} />
          <Route path="/features/giveaways" element={<Giveaways />} />
          <Route path="/features/voicemaster" element={<VoiceMaster />} />
          <Route path="/features/vanityroles" element={<VanityRoles />} />
          <Route path="/features/buttonroles" element={<ButtonRoles />} />
          <Route path="/features/leveling" element={<Leveling />} />
          <Route path="/features/bump" element={<BumpReminder />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="relative z-20 bg-dark-4/80 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-theme">Evelina</h3>
              <p className="text-gray-400 text-sm">
                The ultimate Discord bot for your server management needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-theme">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors footer-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/commands" className="text-gray-400 hover:text-white transition-colors footer-link">
                    Commands
                  </Link>
                </li>
                <li>
                  <Link to="/status" className="text-gray-400 hover:text-white transition-colors footer-link">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-theme">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition-colors footer-link">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors footer-link">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/refund" className="text-gray-400 hover:text-white transition-colors footer-link">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-theme">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://discord.gg/evelina" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors footer-link flex items-center gap-2">
                    <FaDiscord className="w-4 h-4" />
                    Join our Discord
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors footer-link flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-2 pt-8 text-center text-gray-400">
            <p>© 2024 - 2025 evelina.bot • All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;