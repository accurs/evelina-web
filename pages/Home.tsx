import React from 'react';
import { Bot, Shield, Ticket, Gift, UserPlus, Mic2, Tag, Lightbulb, Circle, Award, Clock, Music, Mail, Coins, MessageSquare, PartyPopper, DoorOpen, ShieldAlert, Headphones, Crown, Sparkles, ToggleLeft, Trophy, Bell, Music2, UserPlus2, Terminal, PartyPopperIcon, Search } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import AnimatedBackground from '../components/AnimatedBackground';
import { BiVoicemail } from 'react-icons/bi';
import { MdVoiceChat } from 'react-icons/md';

function Home() {
  useScrollAnimation();

  return (
    <div className="relative">
      {/* Hero Section */}
      <header className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Animated Background with Stars */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatedBackground />
          <div className="wave-container">
            <div className="wave-gradient"></div>
          </div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Evelina is Discord's</span>
            <br className="hidden sm:block" />
            <span className="text-white">ultimate </span>
            <span className="shimmer-text">all-in-one</span>
            <span className="text-white"> app</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-lg mx-auto">
            Simple, yet advanced, feature-rich and completely free Discord Application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://discord.com/oauth2/authorize?client_id=1242930981967757452"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaDiscord className="w-5 h-5" />
              Add to Discord
            </a>
            <Link 
              to="/commands"
              className="w-full sm:w-auto bg-gradient-to-r from-theme to-[#90c1d8] hover:from-theme/90 hover:to-[#90c1d8]/90 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Terminal className="w-5 h-5" />
              Commands
            </Link>
            <Link 
              to="/premium"
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
            >
              <Crown className="w-5 h-5" />
              Premium
            </Link>
          </div>
        </div>
      </header>

      {/* Cleaner Fade Transition */}
      <div className="relative z-10">
        <div className="absolute inset-x-0 -top-60 h-60 bg-gradient-to-b from-transparent via-black/30 to-[#0a0a0a]"></div>
        <div className="absolute inset-x-0 -top-40 h-40 bg-gradient-to-b from-transparent to-[#0a0a0a]"></div>
      </div>

      {/* Features Section */}
      <section className="relative z-20 w-full bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Features Heading */}
          <div className="relative">
            <h2 className="relative z-10 text-4xl font-bold text-center mb-16 shimmer-text scroll-fade">Features</h2>
          </div>

          {/* Security Features - Alternate Layout */}
          <div className="mb-32 bg-dark-2/50 rounded-xl p-8 scroll-fade">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <ShieldAlert className="w-8 h-8 text-theme" />
                <h3 className="text-3xl font-bold">Advanced Security</h3>
              </div>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Keep your server safe with our comprehensive security features.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="feature-card p-6 rounded-xl">
                <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-theme" />
                  Antinuke Protection
                </h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• Role deletion protection</li>
                  <li>• Channel security</li>
                  <li>• Anti-raid measures</li>
                </ul>
              </div>
              <div className="feature-card p-6 rounded-xl">
                <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-theme" />
                  Auto Moderation
                </h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• Spam detection</li>
                  <li>• Link filtering</li>
                  <li>• Customizable filters</li>
                </ul>
              </div>
            </div>
            <Link
              to="/features/automod"
              className="w-full sm:w-1/4 bg-[#181818B3] hover:bg-[#2c2c2c] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-100 flex items-center justify-center gap-2 mt-8 mx-auto"
            >
              <Shield className="w-5 h-5" />
              Auto Moderation
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {/* Ticket System */}
            <div className="feature-card p-6 rounded-xl scroll-fade">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-theme/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-theme" />
                </div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  Ticket System
                </h3>
              </div>
              <p className="text-gray-400">Advanced ticket management with custom forms, categories, and transcripts.</p>
              <Link
                to="/features/tickets"
                className="w-full bg-[#181818B3] hover:bg-[#2c2c2c] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-100 flex items-center justify-center gap-2 mt-4 mx-auto"
              >
                <MessageSquare className="w-5 h-5" />
                Tickets System
              </Link>
            </div>

            {/* Giveaways */}
            <div className="feature-card p-6 rounded-xl scroll-fade">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-theme/10 flex items-center justify-center">
                  <PartyPopper className="w-6 h-6 text-theme" />
                </div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  Giveaways
                </h3>
              </div>
              <p className="text-gray-400">Create and manage giveaways with custom requirements and multiple winners.</p>
              <Link
                to="/features/giveaways"
                className="w-full bg-[#181818B3] hover:bg-[#2c2c2c] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-100 flex items-center justify-center gap-2 mt-4 mx-auto"
              >
                <PartyPopper className="w-5 h-5" />
                Giveaways
              </Link>
            </div>

            {/* Welcome System */}
            <div className="feature-card p-6 rounded-xl scroll-fade">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-theme/10 flex items-center justify-center">
                  <DoorOpen className="w-6 h-6 text-theme" />
                </div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  Welcome System
                </h3>
              </div>
              <p className="text-gray-400">Customize welcome, leave, and boost messages with images and embeds.</p>
              <Link
                to="/features/welcome"
                className="w-full bg-[#181818B3] hover:bg-[#2c2c2c] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-100 flex items-center justify-center gap-2 mt-4 mx-auto"
              >
                <DoorOpen className="w-5 h-5" />
                Welcome System
              </Link>
            </div>
          </div>

          {/* Economy System - Full Width Feature */}
          <div className="mb-32 scroll-fade">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="feature-card rounded-xl p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-theme">
                      <span className="font-mono">;work</span>
                      <span className="text-gray-400 flex items-center gap-2">
                        <Coins className="w-4 h-4" /> 250 coins earned
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono">;balance</span>
                      <span className="text-gray-400 flex items-center gap-2">
                        <Coins className="w-4 h-4" /> 1,250 coins
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono">;shop</span>
                      <span className="text-gray-400 flex items-center gap-2">
                        <Tag className="w-4 h-4" /> Browse items
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/features/economy"
                  className="w-full bg-[#181818B3] hover:bg-[#2c2c2c] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-100 flex items-center justify-center gap-2 mt-8 mx-auto"
                >
                  <Gift className="w-5 h-5" />
                  Economy System
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <Coins className="w-8 h-8 text-theme" />
                  <h3 className="text-3xl font-bold shimmer-text">Advanced Economy System</h3>
                </div>
                <p className="text-gray-400 mb-6">
                  Engage your community with a fully-featured economy system. Members can work, earn coins, trade items, and more.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Circle className="w-2 h-2 text-theme" />
                    <span>Multiple ways to earn coins</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Circle className="w-2 h-2 text-theme" />
                    <span>Custom shop system</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Circle className="w-2 h-2 text-theme" />
                    <span>Trading between users</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Voice & Role Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 scroll-fade">
            {/* Voice Features */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Headphones className="w-6 h-6 text-theme" />
                Voice Features
              </h3>
              <div className="space-y-4">
                <div className="feature-card p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Mic2 className="w-5 h-5 text-theme" />
                    Voicemaster System
                  </h4>
                  <p className="text-gray-400">Create custom voice channels with full control.</p>
                  <Link
                    to="/features/voicemaster"
                    className="w-full bg-[#181818B3] hover:bg-[#2c2c2c] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-100 flex items-center justify-center gap-2 mt-4 mx-auto"
                  >
                    <Mic2 className="w-5 h-5" />
                    Voice Master
                  </Link>
                </div>
                <div className="feature-card p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-theme" />
                    Voice Leveling
                  </h4>
                  <p className="text-gray-400">Earn XP while being active in voice channels.</p>
                  <Link
                    to="/features/leveling"
                    className="w-full bg-[#181818B3] hover:bg-[#2c2c2c] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-100 flex items-center justify-center gap-2 mt-4 mx-auto"
                  >
                    <Trophy className="w-5 h-5" />
                    Leveling System
                  </Link>
                </div>
              </div>
            </div>

            {/* Role Features */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Crown className="w-6 h-6 text-theme" />
                Role Management
              </h3>
              <div className="space-y-4">
                <div className="feature-card p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-theme" />
                    Vanity Roles
                  </h4>
                  <p className="text-gray-400">Custom roles for server boosters and special members.</p>
                  <Link
                    to="/features/vanityroles"
                    className="w-full bg-[#181818B3] hover:bg-[#2c2c2c] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-100 flex items-center justify-center gap-2 mt-4 mx-auto"
                  >
                    <Tag className="w-5 h-5" />
                    Vanity Roles
                  </Link>
                </div>
                <div className="feature-card p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <ToggleLeft className="w-5 h-5 text-theme" />
                    Button & Reaction Roles
                  </h4>
                  <p className="text-gray-400">Self-assignable roles with custom buttons and reactions.</p>
                  <Link
                    to="/features/buttonroles"
                    className="w-full bg-[#181818B3] hover:bg-[#2c2c2c] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-100 flex items-center justify-center gap-2 mt-4 mx-auto"
                  >
                    <MdVoiceChat className="w-5 h-5" />
                    Button Roles
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 scroll-fade">
            {/* Leveling System */}
            <div className="feature-card p-6 rounded-xl text-center">
              <Trophy className="w-8 h-8 text-theme mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                Leveling System
              </h3>
              <p className="text-gray-400">Comprehensive leveling system for both text and voice activity.</p>
              <Link
                to="/features/leveling"
                className="w-full bg-[#181818B3] hover:bg-[#2c2c2c] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-100 flex items-center justify-center gap-2 mt-4 mx-auto"
              >
                <Trophy className="w-5 h-5" />
                Leveling System
              </Link>
            </div>

            {/* Bump Reminder */}
            <div className="feature-card p-6 rounded-xl text-center">
              <Bell className="w-8 h-8 text-theme mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                Bump Reminder
              </h3>
              <p className="text-gray-400">Never miss a bump with automated reminders and rewards.</p>
              <Link
                to="/features/bump"
                className="w-full bg-[#181818B3] hover:bg-[#2c2c2c] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-100 flex items-center justify-center gap-2 mt-4 mx-auto"
              >
                <Bell className="w-5 h-5" />
                Bump Reminder
              </Link>
            </div>

            {/* Music System */}
            <div className="feature-card p-6 rounded-xl text-center">
              <Music2 className="w-8 h-8 text-theme mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                Music System
              </h3>
              <p className="text-gray-400">High-quality music playback with playlist support.</p>
              <Link
                to="/features/music"
                className="w-full bg-[#181818B3] hover:bg-[#2c2c2c] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-100 flex items-center justify-center gap-2 mt-4 mx-auto"
              >
                <Music2 className="w-5 h-5" />
                Music Player
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;