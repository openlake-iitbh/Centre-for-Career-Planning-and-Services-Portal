import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LogoutButton from './LogoutButton.jsx';
import { useAuthContext } from '../context/AuthContext';

const AllLinks = [
  { name: 'Home',           link: '/home',            user: 'all'     },
  { name: 'Profile',        link: '/profile',         user: 'all'     },
  { name: 'Applications',   link: '/applications',    user: 'all'     },
  { name: 'Saved Apps',     link: '/saved-applications', user: 'all'   },
  { name: 'Analytics',      link: '/analytics',       user: 'all'     },
  { name: 'Referrals',      link: '/referals',        user: 'all'     },
  { name: 'Resume Builder', link: '/resumebuilder',   user: 'student' },
];

const Sidebar = () => {
  const { authUser } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  // only show links for “all” users or matching role
  const links = AllLinks.filter(
    (l) => l.user === 'all' || l.user === authUser?.role
  );

  return (
    <>
      {/* ─── MOBILE TOP BAR ─────────────────────────────────────────── */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0fa18e] text-white px-4 flex items-center justify-between z-30">
        <Link to="/" className="flex items-center">
          <img src="/images/CCPS.png" alt="Logo" className="h-10 w-10" />
          <span className="ml-3 text-xl font-montserrat">CCPS</span>
        </Link>
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="p-2 hover:bg-[#13665b] rounded"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`
          md:hidden fixed top-16 left-0 w-64 bg-[#0fa18e] h-[calc(100vh-4rem)]
          transform transition-transform duration-300 z-30
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <nav className="flex flex-col h-full justify-between py-4">
          <div>
            {links.map((l) => (
              <Link
                key={l.name}
                to={l.link}
                className="block px-6 py-3 font-montserrat text-white hover:bg-[#13665b]"
                onClick={() => setIsOpen(false)}
              >
                {l.name}
              </Link>
            ))}
          </div>
          <div className="px-6">
            <LogoutButton />
          </div>
        </nav>
      </div>

      {/* ─── DESKTOP SIDEBAR ───────────────────────────────────────── */}
      <aside className="hidden md:flex fixed top-0 left-0 h-full w-64 bg-[#0fa18e] flex-col justify-between py-8 z-10">
        <div>
          <Link to="/" className="flex items-center px-6 mb-8">
            <img src="/images/CCPS.png" alt="Logo" className="h-10 w-10" />
            <span className="ml-3 text-2xl font-montserrat text-white">CCPS</span>
          </Link>
          <nav className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.name}
                to={l.link}
                className="block px-6 py-3 font-montserrat text-white hover:bg-[#13665b]"
              >
                {l.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="px-6">
          <LogoutButton />
        </div>
      </aside>

      {/* ─── PAGE CONTENT WRAPPER ──────────────────────────────────── */}
      <div className="md:pl-64 pt-16">
        {/* If you’re nesting routes, render children here: */}
        <Outlet />
        {/* Otherwise, render your page’s main content */}
      </div>
    </>
  );
};

export default Sidebar;