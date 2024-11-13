'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Sidebar({ isOpen, onToggle }) {
  const [width, setWidth] = useState(256);
  const sidebarRef = useRef(null);
  const resizeRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const router = useRouter();

  const startResizing = (e) => {
    setIsResizing(true);
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const resize = (e) => {
    if (isResizing && sidebarRef.current) {
      const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
      if (newWidth >= 200 && newWidth <= 600) { // 최소 200px, 최대 600px
        setWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing]);

  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: '🏠' },
    { name: 'Research Assistant', path: '/assistant', icon: '🤖' },
    { name: 'Research Reports', path: '/reports', icon: '📄' },
    { name: 'API Playground', path: '/playground', icon: '⚡' },
    { name: 'Invoices', path: '/invoices', icon: '📋' },
    { name: 'Documentation', path: '/docs', icon: '📚', external: true }
  ];

  return (
    <div className="relative">
      <div 
        ref={sidebarRef}
        className={`h-screen bg-white border-r transition-all duration-300 flex flex-col`}
        style={{ 
          width: isOpen ? `${width}px` : '0px',
          minWidth: isOpen ? '200px' : '0px',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden'
        }}
      >
        {/* Logo */}
        <div className="p-4 border-b">
          <img src="/logo.svg" alt="Tavily" className="h-8" />
        </div>

        {/* Account Selector */}
        <div className="p-4 border-b">
          <button className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white border rounded-md">
            <span>Personal</span>
            <span>▼</span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                {item.external ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                    <span className="ml-1">↗</span>
                  </a>
                ) : (
                  <Link
                    href={item.path}
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Resize Handle */}
        <div
          ref={resizeRef}
          className="absolute right-0 top-0 w-1 h-full cursor-ew-resize hover:bg-blue-500"
          onMouseDown={startResizing}
        />
      </div>

      <button
        onClick={onToggle}
        className="absolute top-4 left-full bg-white p-2 rounded-r-md border border-l-0 shadow-md hover:bg-gray-50"
      >
        {isOpen ? '◀' : '▶'}
      </button>
    </div>
  );
} 