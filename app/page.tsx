// app/page.tsx
import Link from 'next/link';
import { getAllPortfolios } from '@/lib/db';
import { getCurrentUser, logout } from '@/lib/auth';
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
  LogOut,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';
import CopyLinkButton from '@/components/CopyLinkButton';

export default async function Home() {
  const userId = await getCurrentUser();
  
  if (!userId) {
    redirect('/login');
  }
  
  const user = await findUserById(userId);
  const portfolios = await getAllPortfolios();

  // Get the base URL for public links
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg p-6 flex flex-col">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
          <Ha size={20} />
          </div>
          <span className="text-xl font-bold text-gray-900">PortfolioHub</span>
        </Link>

        {/* Main Navigation */}
        <nav className="flex-1">
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-500 mb-4 tracking-wider">
              MAIN
            </p>
            <div className="space-y-2">
              <Link href="/" className="flex items-center gap-3 text-primary-600">
                <LayoutGrid size={20} />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              <Link href="/portfolios" className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors">
                <Folder size={20} />
                <span className="text-sm font-medium">My Portfolios</span>
              </Link>
              <Link href="/profile" className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors">
                <User size={20} />
                <span className="text-sm font-medium">Profile</span>
              </Link>
              <Link href="/favorites" className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors">
                <Star size={20} />
                <span className="text-sm font-medium">Favorites</span>
              </Link>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-500 mb-4 tracking-wider">
              ANALYTICS
            </p>
            <div className="space-y-2">
              <Link href="/traffic" className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors">
                <TrendingUp size={20} />
                <span className="text-sm font-medium">Traffic</span>
              </Link>
              <Link href="/performance" className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors">
                <BarChart3 size={20} />
                <span className="text-sm font-medium">Performance</span>
              </Link>
              <Link href="/schedule" className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors">
                <Calendar size={20} />
                <span className="text-sm font-medium">Schedule</span>
              </Link>
            </div>
          </div>

          {/* Decorative Icons Section */}
          <div className="bg-gray-100 rounded-xl p-4">
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
        <div className="mt-6 p-4 bg-gray-100 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center text-white font-semibold shadow-md">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
            </div>
            <Link href="/settings">
              <Settings className="text-gray-400 cursor-pointer hover:text-gray-600" size={18} />
            </Link>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Portfolios</h1>
              <p className="text-gray-500 flex items-center gap-2">
                <Folder size={16} />
                <span>Manage and share your portfolios</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </div>
              <Link href="/add" className="bg-primary-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-all shadow-md flex items-center gap-2">
                <Plus size={18} />
                New Portfolio
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { label: 'Total Portfolios', value: portfolios.length, icon: Folder, color: 'primary' },
            { label: 'Active Projects', value: '24', icon: TrendingUp, color: 'green' },
            { label: 'Total Views', value: '1.2k', icon: BarChart3, color: 'amber' },
            { label: 'Engagement', value: '86%', icon: Star, color: 'secondary' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center hover:shadow-xl transition-shadow">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center text-${stat.color}-600`}>
                <stat.icon size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* Portfolios Grid Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Your Portfolios</h2>
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {portfolios.length} total
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {portfolios.map((p: any) => {
              // Create public URL with username and portfolio title
              const publicUrl = `${baseUrl}/publica/${encodeURIComponent(user?.name || 'user')}/${encodeURIComponent(p.title)}`;
              
              return (
                <div key={p.id} className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary-600 shadow-sm">
                      <Folder size={20} />
                    </div>
                    <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600 shadow-sm">
                      {p.subtitle ? 'Active' : 'Draft'}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{p.title}</h3>
                  
                  {p.subtitle && (
                    <p className="text-sm text-gray-500 mb-3">{p.subtitle}</p>
                  )}

                  {/* Skills Preview */}
                  {p.skills && p.skills.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap mb-4">
                      {p.skills.slice(0, 3).map((skill: string, i: number) => (
                        <span key={i} className="bg-white px-2 py-1 rounded text-xs text-gray-600 shadow-sm">
                          {skill}
                        </span>
                      ))}
                      {p.skills.length > 3 && (
                        <span className="bg-white px-2 py-1 rounded text-xs text-gray-600 shadow-sm">
                          +{p.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Public Link Section */}
                  <div className="mb-3 p-2 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 truncate">
                        <span className="text-xs text-gray-500 block">Public link:</span>
                        <span className="text-xs font-mono text-gray-700 truncate block">
                          /publica/{user?.name || 'user'}/{p.title}
                        </span>
                      </div>
                      <CopyLinkButton url={publicUrl} />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between gap-2 pt-2">
                    <Link 
                      href={`/portfolio/${p.id}`}
                      className="flex-1 text-center text-sm font-medium text-primary-600 hover:text-primary-700 bg-white py-2 rounded-lg border border-gray-200 hover:border-primary-200 transition-colors"
                    >
                      Edit
                    </Link>
                    <a
                      href={publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center text-sm font-medium text-gray-600 hover:text-gray-900 bg-white py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center gap-1"
                    >
                      View <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {portfolios.length === 0 && (
            <div className="bg-gray-50 rounded-lg p-16 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 shadow-md">
                <Folder size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No portfolios yet</h3>
              <p className="text-gray-500 mb-6">Create your first portfolio to get started</p>
              <Link href="/add" className="bg-primary-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-all shadow-md inline-flex items-center gap-2">
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