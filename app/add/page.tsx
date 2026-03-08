// app/add/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Folder, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Globe,
  ChevronLeft,
  ChevronRight,
  Save,
  Image,
  Code,
  Briefcase,
  Award,
  Cpu,
  Zap,
  Heart,
  Star,
  Settings,
  LogOut,
  Home,
  Menu,
  X
} from 'lucide-react';

export default function AddPortfolio() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    name: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
    profileImageUrl: '',
    logoUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);

    const payload = {
      title: formData.title || formData.name,
      subtitle: formData.subtitle || undefined,
      bio: formData.bio || undefined,
      email: formData.email || undefined,
      phone: formData.phone || undefined,
      location: formData.location || undefined,
      profileImageUrl: formData.profileImageUrl || undefined,
      logoUrl: formData.logoUrl || undefined,
      skills: skillsArray,
      socialLinks: {
        github: formData.github || undefined,
        linkedin: formData.linkedin || undefined,
        twitter: formData.twitter || undefined,
        website: formData.website || undefined
      }
    };

    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok) {
      router.push(`/portfolio/${data.portfolio.id}`);
    } else {
      alert('Error: ' + data.error);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'social', label: 'Social', icon: Globe },
    { id: 'images', label: 'Images', icon: Image }
  ];

  const MobileMenu = () => (
    <div className="lg:hidden">
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Menu size={24} />
      </button>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-xl p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-gray-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-1 mb-6">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                    activeTab === tab.id 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="text-sm font-medium">{tab.label}</span>
                  <span className="ml-auto text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                    {index + 1}/5
                  </span>
                </button>
              ))}
            </div>

            <div className="bg-gray-100 rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-gray-500 mb-3">QUICK ACTIONS</p>
              <div className="flex gap-2 flex-wrap">
                {[Heart, Star, Zap, Cpu, Award, Briefcase].map((Icon, i) => (
                  <div key={i} className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-gray-500 shadow-sm">
                    <Icon size={18} />
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 transition-colors mb-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ChevronLeft size={20} />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </Link>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                  U
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">User</p>
                  <p className="text-xs text-gray-500 truncate">user@example.com</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-red-600 transition-colors w-full text-sm"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white shadow-lg p-6 flex-col fixed h-screen overflow-y-auto">
        <Link href="/" className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            <Home size={20} />
          </div>
          <span className="text-xl font-bold text-gray-900">PortfolioHub</span>
        </Link>

        <nav className="flex-1">
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-500 mb-4 tracking-wider px-3">
              CREATE PORTFOLIO
            </p>
            <div className="space-y-1">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="text-sm font-medium">{tab.label}</span>
                  <span className="ml-auto text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                    {index + 1}/5
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-4 mx-3">
            <p className="text-xs font-semibold text-gray-500 mb-3 tracking-wider">
              QUICK ACTIONS
            </p>
            <div className="flex gap-2 flex-wrap">
              {[Heart, Star, Zap, Cpu, Award, Briefcase].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-gray-500 hover:bg-primary-600 hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>
        </nav>

        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 transition-colors mt-6 mx-3"
        >
          <ChevronLeft size={20} />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>

        <div className="mt-4 mx-3 p-4 bg-gray-100 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center text-white font-semibold shadow-md">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">User</p>
              <p className="text-xs text-gray-500 truncate">user@example.com</p>
            </div>
            <Link href="/settings">
              <Settings className="text-gray-400 cursor-pointer hover:text-gray-600" size={18} />
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-red-600 transition-colors w-full text-sm"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-lg p-4 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm">
              <Home size={16} />
            </div>
            <span className="text-lg font-bold text-gray-900">PortfolioHub</span>
          </Link>
          <MobileMenu />
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:ml-72 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Create New Portfolio</h1>
            <p className="text-sm sm:text-base text-gray-500 flex items-center gap-2">
              <Folder size={16} />
              <span>Fill in the details to create your portfolio</span>
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex justify-between mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm font-semibold text-gray-900">Progress</span>
            <span className="text-xs sm:text-sm text-primary-600 font-semibold">
              {Math.round(((tabs.findIndex(t => t.id === activeTab) + 1) / tabs.length) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full transition-all duration-300"
              style={{ width: `${((tabs.findIndex(t => t.id === activeTab) + 1) / tabs.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 sm:py-2.5 pl-10 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    Professional Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Full Stack Developer"
                      className="w-full px-4 py-2 sm:py-2.5 pl-10 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                    placeholder="Building amazing web experiences"
                    className="w-full px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    rows={4}
                    placeholder="Tell your story..."
                    className="w-full px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all resize-vertical"
                  />
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 sm:py-2.5 pl-10 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1 234 567 890"
                      className="w-full px-4 py-2 sm:py-2.5 pl-10 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="San Francisco, CA"
                      className="w-full px-4 py-2 sm:py-2.5 pl-10 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-primary-50 p-4 sm:p-6 rounded-lg">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    Skills
                  </label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    placeholder="React, Node.js, TypeScript"
                    className="w-full px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                  <p className="text-xs text-primary-600 mt-2 sm:mt-3 flex items-center gap-1">
                    <Zap size={14} />
                    Separate with commas
                  </p>
                </div>

                {formData.skills && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 mb-2 sm:mb-3 tracking-wider">PREVIEW</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.split(',').map((s, i) => s.trim() && (
                        <span
                          key={i}
                          className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm shadow-md"
                        >
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Social Tab */}
            {activeTab === 'social' && (
              <div className="space-y-4 sm:space-y-6">
                {[
                  { label: 'GitHub', icon: Github, key: 'github', placeholder: 'https://github.com/username' },
                  { label: 'LinkedIn', icon: Linkedin, key: 'linkedin', placeholder: 'https://linkedin.com/in/username' },
                  { label: 'Twitter', icon: Twitter, key: 'twitter', placeholder: 'https://twitter.com/username' },
                  { label: 'Website', icon: Globe, key: 'website', placeholder: 'https://yourwebsite.com' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                      {field.label}
                    </label>
                    <div className="relative">
                      <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="url"
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2 sm:py-2.5 pl-10 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.profileImageUrl}
                    onChange={(e) => setFormData({...formData, profileImageUrl: e.target.value})}
                    placeholder="https://example.com/profile.jpg"
                    className="w-full px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={() => {
                const currentIndex = tabs.findIndex(t => t.id === activeTab);
                if (currentIndex > 0) {
                  setActiveTab(tabs[currentIndex - 1].id);
                }
              }}
              className={`px-4 py-2.5 rounded-lg font-medium border border-gray-300 flex items-center justify-center gap-2 transition-all text-sm ${
                activeTab === tabs[0].id 
                  ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md'
              }`}
              disabled={activeTab === tabs[0].id}
            >
              <ChevronLeft size={18} />
              Previous
            </button>

            {activeTab !== tabs[tabs.length - 1].id ? (
              <button
                type="button"
                onClick={() => {
                  const currentIndex = tabs.findIndex(t => t.id === activeTab);
                  if (currentIndex < tabs.length - 1) {
                    setActiveTab(tabs[currentIndex + 1].id);
                  }
                }}
                className="bg-black text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-all shadow-md flex items-center justify-center gap-2 text-sm"
              >
                Next
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className={`bg-primary-600 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-md flex items-center justify-center gap-2 text-sm ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-700'
                }`}
              >
                {loading ? 'Creating...' : 'Publish Portfolio'}
                {!loading && <Save size={18} />}
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}