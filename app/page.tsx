// app/page.tsx
import Link from 'next/link';
import { getAllPortfolios } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { findUserById } from '@/lib/db/users';
import { redirect } from 'next/navigation';
import { 
  LayoutGrid, 
  Plus, 
  Folder, 
  User, 
  Settings, 
  Bell, 
  Star, 
  TrendingUp,
  Calendar,
  Home as Ha,
  BarChart3,
  Heart,
  Briefcase,
  Cpu,
  Zap,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';
import CopyLinkButton from '@/components/CopyLinkButton';
import MobileMenu from '@/components/MobileMenu';

export default async function Home() {
  const userId = await getCurrentUser();
  
  if (!userId) {
    redirect('/login');
  }
  
  const user = await findUserById(userId);
  const portfolios = await getAllPortfolios();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:flex w-72 bg-white shadow-lg p-6 flex-col fixed h-screen">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            <Ha size={20} />
          </div>
          <span className="text-xl font-bold text-gray-900">PortfolioHub</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="flex-1 overflow-y-auto">
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-500 mb-4 tracking-wider px-3">
              MAIN
            </p>
            <div className="space-y-1">
              <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-primary-600 bg-primary-50 rounded-lg">
                <LayoutGrid size={20} />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              <Link href="/portfolios" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Folder size={20} />
                <span className="text-sm font-medium">My Portfolios</span>
              </Link>
              <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <User size={20} />
                <span className="text-sm font-medium">Profile</span>
              </Link>
              <Link href="/favorites" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Star size={20} />
                <span className="text-sm font-medium">Favorites</span>
              </Link>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-500 mb-4 tracking-wider px-3">
              ANALYTICS
            </p>
            <div className="space-y-1">
              <Link href="/traffic" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <TrendingUp size={20} />
                <span className="text-sm font-medium">Traffic</span>
              </Link>
              <Link href="/performance" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <BarChart3 size={20} />
                <span className="text-sm font-medium">Performance</span>
              </Link>
              <Link href="/schedule" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Calendar size={20} />
                <span className="text-sm font-medium">Schedule</span>
              </Link>
            </div>
          </div>

          {/* Decorative Icons */}
          <div className="bg-gray-100 rounded-xl p-4 mx-3">
            <p className="text-xs font-semibold text-gray-500 mb-3 tracking-wider">
              QUICK ACTIONS
            </p>
            <div className="flex gap-2 flex-wrap">
              {[Heart, Star, Zap, Cpu, Briefcase].map((Icon, i) => (
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

        {/* User Profile */}
        <div className="mt-6 mx-3 p-4 bg-gray-100 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center text-white font-semibold shadow-md flex-shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
            </div>
            <Link href="/settings" className="flex-shrink-0">
              <Settings className="text-gray-400 cursor-pointer hover:text-gray-600" size={18} />
            </Link>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-lg p-4 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm">
              <Ha size={16} />
            </div>
            <span className="text-lg font-bold text-gray-900">PortfolioHub</span>
          </Link>
          <MobileMenu user={user} />
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:ml-72 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">My Portfolios</h1>
              <p className="text-sm sm:text-base text-gray-500 flex items-center gap-2">
                <Folder size={16} />
                <span>Manage and share your portfolios</span>
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="relative ml-auto sm:ml-0">
                <Bell className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </div>
              <Link href="/add" className="bg-primary-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-all shadow-md flex items-center gap-2 text-sm sm:text-base whitespace-nowrap">
                <Plus size={18} />
                <span className="hidden xs:inline">New Portfolio</span>
                <span className="xs:hidden">New</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-4 sm:mb-6 lg:mb-8">
          {[
            { label: 'Total', value: portfolios.length, icon: Folder, color: 'primary' },
            { label: 'Projects', value: '24', icon: TrendingUp, color: 'green' },
            { label: 'Views', value: '1.2k', icon: BarChart3, color: 'amber' },
            { label: 'Engagement', value: '86%', icon: Star, color: 'secondary' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 lg:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">{stat.label}</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-${stat.color}-100 rounded-lg sm:rounded-xl flex items-center justify-center text-${stat.color}-600`}>
                  <stat.icon size={20} className="sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolios Grid */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Your Portfolios</h2>
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {portfolios.length} total
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {portfolios.map((p: any) => {
              const publicUrl = `${baseUrl}/publica/${encodeURIComponent(user?.name || 'user')}/${encodeURIComponent(p.title)}`;
              
              return (
                <div key={p.id} className="bg-gray-50 rounded-lg p-4 sm:p-5 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center text-primary-600 shadow-sm">
                      <Folder size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600 shadow-sm">
                      {p.subtitle ? 'Active' : 'Draft'}
                    </span>
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">{p.title}</h3>
                  
                  {p.subtitle && (
                    <p className="text-xs sm:text-sm text-gray-500 mb-3 line-clamp-2">{p.subtitle}</p>
                  )}

                  {/* Skills Preview */}
                  {p.skills && p.skills.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap mb-4">
                      {p.skills.slice(0, 2).map((skill: string, i: number) => (
                        <span key={i} className="bg-white px-2 py-0.5 rounded text-xs text-gray-600 shadow-sm">
                          {skill.length > 10 ? skill.slice(0, 8) + '...' : skill}
                        </span>
                      ))}
                      {p.skills.length > 2 && (
                        <span className="bg-white px-2 py-0.5 rounded text-xs text-gray-600 shadow-sm">
                          +{p.skills.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Public Link */}
                  <div className="mb-3 p-2 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-gray-500 block">Public link:</span>
                        <span className="text-xs font-mono text-gray-700 truncate block">
                          /publica/{user?.name || 'user'}/{p.title}
                        </span>
                      </div>
                      <CopyLinkButton url={publicUrl} />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <Link 
                      href={`/portfolio/${p.id}`}
                      className="flex-1 text-center text-xs sm:text-sm font-medium text-primary-600 hover:text-primary-700 bg-white py-2 rounded-lg border border-gray-200 hover:border-primary-200 transition-colors"
                    >
                      Edit
                    </Link>
                    <a
                      href={publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 bg-white py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center gap-1"
                    >
                      View <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {portfolios.length === 0 && (
            <div className="bg-gray-50 rounded-lg p-8 sm:p-12 lg:p-16 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 shadow-md">
                <Folder size={28} className="sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No portfolios yet</h3>
              <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">Create your first portfolio to get started</p>
              <Link href="/add" className="bg-primary-600 text-white px-4 sm:px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-all shadow-md inline-flex items-center gap-2 text-sm sm:text-base">
                <Plus size={18} />
                Create Portfolio
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}