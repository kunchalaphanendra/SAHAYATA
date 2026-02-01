
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile, LanguageCode, Scheme, Sector } from '../types';
import { SCHEMES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultsProps {
  profile: UserProfile | null;
  lang: LanguageCode;
}

const Results: React.FC<ResultsProps> = ({ profile, lang }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Sector | 'All'>('All');
  const [comparingIds, setComparingIds] = useState<string[]>([]);

  const eligibleSchemes = useMemo(() => {
    if (!profile) return [];
    
    return SCHEMES.filter(scheme => {
      // 1. Age check
      if (scheme.minAge && profile.age < scheme.minAge) return false;
      if (scheme.maxAge && profile.age > scheme.maxAge) return false;

      // 2. Gender check
      if (scheme.gender && scheme.gender !== 'All' && scheme.gender !== profile.gender) return false;

      // 3. Income check
      if (scheme.maxIncome && profile.income > scheme.maxIncome) return false;

      // 4. Disability check
      if (scheme.isDisabilityRequired && !profile.hasDisability) return false;
      
      // 5. Residence check
      if (scheme.residence && scheme.residence !== 'Both' && scheme.residence !== profile.residence) return false;

      // 6. BPL status check
      if (scheme.bplOnly && !profile.isBPL) return false;

      // 7. Marital status check
      if (scheme.maritalStatus && scheme.maritalStatus.length > 0 && !scheme.maritalStatus.includes(profile.maritalStatus)) return false;

      // 8. Occupation check
      if (scheme.occupation && scheme.occupation !== profile.occupation) return false;

      // 9. Family size check
      if (scheme.minFamilySize && profile.familySize < scheme.minFamilySize) return false;
      if (scheme.maxFamilySize && profile.familySize > scheme.maxFamilySize) return false;

      // 10. Caste check
      if (scheme.caste && scheme.caste.length > 0 && !scheme.caste.includes(profile.caste)) return false;

      return true;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [profile]);

  const filteredSchemes = useMemo(() => {
    if (activeCategory === 'All') return eligibleSchemes;
    return eligibleSchemes.filter(s => s.category === activeCategory);
  }, [eligibleSchemes, activeCategory]);

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setComparingIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : prev.length < 2 ? [...prev, id] : [prev[1], id]
    );
  };

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-40 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-20 rounded-[4rem] shadow-2xl border border-slate-100 max-w-2xl mx-auto"
        >
          <div className="w-28 h-28 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-slate-300">
             <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <h2 className="text-5xl font-black text-slate-900 mb-6 leading-none tracking-tighter">Profile Empty</h2>
          <p className="text-slate-500 mb-12 text-xl font-bold">Please identify yourself so we can run the discovery engine.</p>
          <button onClick={() => navigate('/discovery')} className="bg-indigo-600 text-white px-12 py-6 rounded-[2.5rem] shadow-2xl shadow-indigo-100 font-black text-2xl hover:scale-105 transition-all">
            Start Profiling
          </button>
        </motion.div>
      </div>
    );
  }

  const categories: (Sector | 'All')[] = ['All', 'Health', 'Education', 'Welfare', 'Housing', 'Employment', 'Agriculture'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 pb-40">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Modern Sidebar Filter */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="sticky top-28 space-y-12">
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-8">Filter by Sector</h3>
              <div className="flex flex-wrap lg:flex-col gap-4">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-8 py-5 rounded-[2rem] text-left font-black transition-all text-sm flex justify-between items-center ${
                      activeCategory === cat 
                      ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-100 scale-[1.05]' 
                      : 'bg-white text-slate-500 hover:bg-slate-50 border-2 border-slate-100'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-3 py-1 rounded-full font-black ${activeCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {cat === 'All' ? eligibleSchemes.length : eligibleSchemes.filter(s => s.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl space-y-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h4 className="font-black text-lg">Discovery Pulse</h4>
              </div>
              <p className="text-xs text-slate-400 font-bold leading-relaxed relative z-10">We found <span className="text-indigo-400">{eligibleSchemes.length} programs</span> perfectly matching your <span className="text-indigo-400">{profile.state}</span> residency and profile.</p>
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Talk to AI Assistant</button>
            </div>
          </div>
        </div>

        {/* Main Results Grid */}
        <div className="flex-grow">
          <div className="mb-16 flex flex-col sm:flex-row justify-between items-end gap-10">
            <div>
              <h1 className="text-6xl font-black text-slate-900 mb-4 tracking-tighter leading-none">Your Benefits</h1>
              <p className="text-slate-500 font-bold text-2xl leading-tight">Recommended for a <span className="text-indigo-600 font-black">{profile.age}y</span> {profile.gender} <span className="text-slate-400 font-medium">({profile.residence})</span>.</p>
            </div>
            <button 
              onClick={() => navigate('/discovery')}
              className="px-10 py-5 bg-slate-900 text-white font-black rounded-[2rem] shadow-2xl hover:scale-105 transition-all flex items-center gap-4 text-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              Adjust Profile
            </button>
          </div>

          {filteredSchemes.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-32 rounded-[4.5rem] text-center border-4 border-dashed border-slate-100"
            >
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-10 text-slate-200">
                 <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">No Exact Matches</h3>
              <p className="text-slate-400 font-bold text-lg max-w-md mx-auto leading-relaxed">Try updating your income or changing your sector filter.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {filteredSchemes.map((scheme, idx) => (
                <motion.div 
                  key={scheme.id} 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className={`bg-white rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all group border-2 flex flex-col relative overflow-hidden cursor-pointer ${comparingIds.includes(scheme.id) ? 'border-indigo-600 ring-8 ring-indigo-50' : 'border-slate-100'}`}
                  onClick={() => navigate(`/scheme/${scheme.id}`)}
                >
                  <div className="p-10 pb-6 relative z-10">
                    <div className="flex justify-between items-start mb-10">
                      <div className="flex flex-col gap-2">
                        <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest inline-block w-max ${
                          scheme.category === 'Health' ? 'bg-emerald-100 text-emerald-700' : 
                          scheme.category === 'Education' ? 'bg-blue-100 text-blue-700' : 
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {scheme.category}
                        </span>
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Program</span>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => toggleCompare(scheme.id, e)}
                        className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all ${comparingIds.includes(scheme.id) ? 'bg-indigo-600 text-white shadow-xl rotate-180' : 'bg-slate-50 text-slate-300 hover:bg-slate-100 hover:text-slate-500'}`}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                      </button>
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 mb-6 leading-none tracking-tight group-hover:text-indigo-600 transition-colors">{scheme.name}</h3>
                    <p className="text-slate-500 font-bold text-sm leading-relaxed line-clamp-2 mb-10">{scheme.description}</p>
                    
                    <div className="space-y-4 mb-8">
                      {scheme.benefits.slice(0, 2).map((b, i) => (
                        <div key={i} className="flex gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100 text-xs font-black text-slate-700 leading-tight">
                          <div className="w-5 h-5 bg-emerald-500 text-white rounded-lg flex items-center justify-center shrink-0">
                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                          </div>
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto bg-slate-900 p-10 flex items-center justify-between border-t border-slate-100">
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">View Official Roadmap</span>
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-slate-900 transition-all">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modern Comparison Drawer */}
      <AnimatePresence>
        {comparingIds.length > 0 && (
          <motion.div 
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-50"
          >
            <div className="bg-slate-900 text-white p-8 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row items-center justify-between border-4 border-white/5 gap-8">
               <div className="flex items-center gap-8">
                 <div className="flex -space-x-5">
                    {comparingIds.map(id => {
                      const s = SCHEMES.find(sch => sch.id === id);
                      return <div key={id} className="w-16 h-16 bg-indigo-600 rounded-[1.5rem] border-8 border-slate-900 flex items-center justify-center font-black text-xl shadow-2xl">{s?.name[0]}</div>;
                    })}
                    {comparingIds.length < 2 && <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] border-8 border-slate-900 border-dashed flex items-center justify-center font-black text-xl text-white/20">+</div>}
                 </div>
                 <div>
                    <h5 className="font-black text-lg leading-tight">Comparison Engine</h5>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{comparingIds.length} of 2 schemes selected</p>
                 </div>
               </div>
               <div className="flex gap-5 w-full sm:w-auto">
                  <button onClick={() => setComparingIds([])} className="px-8 py-5 text-xs font-black hover:text-white/50 transition-all uppercase tracking-widest">Clear</button>
                  <button 
                    disabled={comparingIds.length < 2}
                    className="flex-grow sm:flex-none px-10 py-5 bg-white text-slate-900 rounded-3xl font-black text-sm hover:scale-105 transition-all disabled:opacity-20 disabled:hover:scale-100"
                  >
                    Compare
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Results;
