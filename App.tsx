
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TRANSLATIONS } from './constants';
import { LanguageCode, UserProfile } from './types';
import Discovery from './pages/Discovery';
import Results from './pages/Results';
import SchemeDetail from './pages/SchemeDetail';
import Dashboard from './pages/Dashboard';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [lang, setLang] = useState<LanguageCode>('en');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const t = TRANSLATIONS[lang];

  const mockAlerts = [
    { id: 1, title: 'PM-JAY Update', msg: 'New empanelled hospitals added in your district.', date: '2h ago' },
    { id: 2, title: 'Deadline Alert', msg: 'PMAY-U application window closing in 3 days.', date: '1d ago' }
  ];

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
        {/* Modern Navigation */}
        <header className="glass-card sticky top-0 z-50 py-4 px-4 sm:px-8 border-b border-slate-100">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-200">
                S
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-slate-900 leading-tight tracking-tight">{t.title}</h1>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">{t.subtitle}</p>
              </div>
            </Link>

            <div className="flex items-center gap-4 sm:gap-8">
              <nav className="hidden md:flex items-center gap-8 font-bold text-sm text-slate-500">
                <Link to="/discovery" className="hover:text-indigo-600 transition-all">Find Schemes</Link>
                <Link to="/dashboard" className="hover:text-indigo-600 transition-all">My Portal</Link>
              </nav>

              <div className="flex items-center gap-2">
                {/* Notification Bell */}
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-all relative"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                  </button>
                  
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-4 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
                      >
                        <div className="p-5 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                           <span className="font-black text-xs uppercase tracking-widest text-slate-400">Alerts Center</span>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                          {mockAlerts.map(alert => (
                            <div key={alert.id} className="p-4 hover:bg-slate-50 transition-all border-b border-slate-50">
                              <h5 className="font-bold text-sm text-slate-900">{alert.title}</h5>
                              <p className="text-xs text-slate-500 mt-1">{alert.msg}</p>
                              <span className="text-[10px] text-slate-300 mt-2 block">{alert.date}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <select 
                  value={lang} 
                  onChange={(e) => setLang(e.target.value as LanguageCode)}
                  className="bg-slate-50 border-transparent text-slate-900 text-sm font-bold rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none"
                >
                  <option value="en">EN</option>
                  <option value="hi">HI</option>
                  <option value="te">TE</option>
                  <option value="ta">TA</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Discovery setUserProfile={setUserProfile} lang={lang} />} />
            <Route path="/discovery" element={<Discovery setUserProfile={setUserProfile} lang={lang} />} />
            <Route path="/results" element={<Results profile={userProfile} lang={lang} />} />
            <Route path="/scheme/:id" element={<SchemeDetail lang={lang} />} />
            <Route path="/dashboard" element={<Dashboard profile={userProfile} setProfile={setUserProfile} lang={lang} />} />
          </Routes>
        </main>

        <footer className="py-12 px-4 border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
               <span className="font-bold text-slate-900">{t.title}</span>
            </div>
            <p className="text-xs font-bold text-slate-400">{t.footerRights}</p>
            <div className="flex gap-6 text-xs font-bold text-slate-400">
               <a href="#" className="hover:text-indigo-600 transition-all">Privacy</a>
               <a href="#" className="hover:text-indigo-600 transition-all">Terms</a>
               <a href="#" className="hover:text-indigo-600 transition-all">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
