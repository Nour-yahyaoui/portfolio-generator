// components/MobileMenu.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LayoutGrid, Folder, User, Star, TrendingUp, BarChart3, Calendar, Heart, Zap, Cpu, Briefcase } from 'lucide-react';
import LogoutButton from './LogoutButton';

interface MobileMenuProps {
  user: any;
}

export default function MobileMenu({ user }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-xl p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-gray-900">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-1 mb-6">
              <Link 
                href="/" 
                className="flex items-center gap-3 px-3 py-2.5 text-primary-600 bg-primary-50 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <LayoutGrid size={20} />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              <Link 
                href="/portfolios" 
                className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <Folder size={20} />
                <span className="text-sm font-medium">My Portfolios</span>
              </Link>
              <Link 
                href="/profile" 
                className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <User size={20} />
                <span className="text-sm font-medium">Profile</span>
              </Link>
              <Link 
                href="/favorites" 
                className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <Star size={20} />
                <span className="text-sm font-medium">Favorites</span>
              </Link>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <p className="text-xs font-semibold text-gray-500 mb-3 px-3">ANALYTICS</p>
              <div className="space-y-1">
                <Link href="/traffic" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <TrendingUp size={20} />
                  <span className="text-sm font-medium">Traffic</span>
                </Link>
                <Link href="/performance" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <BarChart3 size={20} />
                  <span className="text-sm font-medium">Performance</span>
                </Link>
                <Link href="/schedule" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <Calendar size={20} />
                  <span className="text-sm font-medium">Schedule</span>
                </Link>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-gray-500 mb-3">QUICK ACTIONS</p>
              <div className="flex gap-2 flex-wrap">
                {[Heart, Star, Zap, Cpu, Briefcase].map((Icon, i) => (
                  <div key={i} className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-gray-500 shadow-sm">
                    <Icon size={18} />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                </div>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}