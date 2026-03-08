// components/DownloadButton.tsx
'use client';

import { Download } from 'lucide-react';

export default function DownloadButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 transition-colors border border-gray-200 rounded-lg hover:border-primary-200 print:hidden"
    >
      <Download size={18} />
      <span className="text-sm font-medium">Download PDF</span>
    </button>
  );
}