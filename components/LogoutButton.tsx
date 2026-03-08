// components/LogoutButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-red-600 transition-colors w-full"
    >
      <LogOut size={18} />
      <span className="text-sm font-medium">Logout</span>
    </button>
  );
}