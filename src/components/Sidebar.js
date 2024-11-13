'use client';
import { useState, useRef, useEffect } from 'react';

export default function Sidebar({ isOpen, onToggle }) {
  const [width, setWidth] = useState(256); // 기본 너비 16 * 16 = 256px
  const sidebarRef = useRef(null);
  const resizeRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

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
            <li>
              <a href="#" className="flex items-center px-3 py-2 text-blue-600 bg-blue-50 rounded-md">
                <span className="mr-3">🏠</span>
                <span className="whitespace-nowrap">Overview</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <span className="mr-3">🤖</span>
                Research Assistant
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <span className="mr-3">📄</span>
                Research Reports
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <span className="mr-3">⚡</span>
                API Playground
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <span className="mr-3">📋</span>
                Invoices
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <span className="mr-3">📚</span>
                Documentation
                <span className="ml-1">↗</span>
              </a>
            </li>
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
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(0)',
          transition: 'transform 0.3s ease'
        }}
      >
        {isOpen ? '◀' : '▶'}
      </button>
    </div>
  );
} 