
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Translation } from '../types';

interface HomeProps {
  t: Translation;
}

const Home: React.FC<HomeProps> = ({ t }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
            Empowering Citizens, One Scheme at a Time
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            {t.heroDesc}
          </p>
          <button
            onClick={() => navigate('/discovery')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-xl transition-all transform hover:scale-105 active:scale-95 accessible-focus"
          >
            {t.checkEligibility}
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Discovery</h3>
            <p className="text-slate-600">Our AI-driven engine matches your profile with hundreds of central and state schemes instantly.</p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Simple Language</h3>
            <p className="text-slate-600">No complex jargon. We explain benefits and steps in your mother tongue so everyone understands.</p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Step-by-Step Guide</h3>
            <p className="text-slate-600">Get a clear roadmap from registration to receiving benefits, including document checklists.</p>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Who is this for?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Elderly Citizens', 'Farmers', 'Students', 'Low Income Families'].map(user => (
              <div key={user} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-slate-100 rounded-full mx-auto mb-3 flex items-center justify-center text-slate-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path></svg>
                </div>
                <p className="font-semibold text-slate-800">{user}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Center Section */}
      <section className="py-24 px-4 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
           <div className="flex-grow space-y-8">
              <span className="px-6 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest">Offline Support</span>
              <h2 className="text-5xl font-black text-slate-900 leading-tight">Can't apply online? <br/><span className="text-indigo-600">We've got you covered.</span></h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                 Visit any of the 500,000+ Common Service Centres (CSCs) across India. Our portal helps you find the nearest one and tells you exactly what documents to carry.
              </p>
              <div className="flex gap-4">
                 <button onClick={() => navigate('/dashboard')} className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg hover:scale-105 transition-all">Find Nearest CSC</button>
                 <button className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-[2rem] font-black text-lg hover:bg-slate-50 transition-all">How it works</button>
              </div>
           </div>
           <div className="w-full md:w-1/2 grid grid-cols-2 gap-6">
              <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 space-y-4">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                 </div>
                 <h4 className="font-black text-slate-900">CSC Locator</h4>
                 <p className="text-sm text-slate-500 font-bold">Find centers in your village or city.</p>
              </div>
              <div className="p-8 bg-indigo-600 text-white rounded-[3rem] shadow-2xl space-y-4 translate-y-8">
                 <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 </div>
                 <h4 className="font-black">Verified Centers</h4>
                 <p className="text-sm text-indigo-100 font-bold">Only official government service points.</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
