
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SCHEMES } from '../constants';
import { Scheme, LanguageCode } from '../types';
import { askGeminiAboutScheme } from '../geminiService';
import { motion } from 'framer-motion';

interface SchemeDetailProps {
  lang: LanguageCode;
}

const SchemeDetail: React.FC<SchemeDetailProps> = ({ lang }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const found = SCHEMES.find(s => s.id === id);
    if (found) {
      setScheme(found);
      const initial: Record<string, boolean> = {};
      found.documents.forEach(d => initial[d] = false);
      setCheckedDocs(initial);
    }
  }, [id]);

  const toggleDoc = (doc: string) => {
    setCheckedDocs(prev => ({ ...prev, [doc]: !prev[doc] }));
  };

  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !scheme) return;
    setIsLoading(true);
    const answer = await askGeminiAboutScheme(scheme.name, question);
    setAiResponse(answer || '');
    setIsLoading(false);
  };

  if (!scheme) return <div className="p-12 text-center">Loading...</div>;

  const docProgress = Math.round((Object.values(checkedDocs).filter(Boolean).length / scheme.documents.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-400 font-bold mb-10 hover:text-indigo-600 transition-all group"
      >
        <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-all">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
        </div>
        Back to Results
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Main Info */}
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-slate-200 border border-slate-50 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"></path></svg>
             </div>
             
             <div className="relative z-10">
                <span className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4 block">{scheme.category}</span>
                <h1 className="text-5xl font-black text-slate-900 mb-6 leading-tight">{scheme.name}</h1>
                <p className="text-xl text-slate-500 leading-relaxed mb-10">{scheme.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                   {scheme.benefits.map((b, i) => (
                      <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                         <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                         </div>
                         <p className="font-bold text-slate-800 leading-snug">{b}</p>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Document Checklist */}
          <div className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-xl">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                <div>
                   <h3 className="text-2xl font-black mb-2">Documents Required</h3>
                   <p className="text-slate-400">Tick the ones you already have prepared.</p>
                </div>
                <div className="px-6 py-3 bg-white/10 rounded-2xl">
                   <span className="text-3xl font-black text-emerald-400">{docProgress}%</span>
                   <span className="text-xs text-slate-400 ml-2 block">Ready</span>
                </div>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {scheme.documents.map(doc => (
                   <button 
                    key={doc}
                    onClick={() => toggleDoc(doc)}
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                      checkedDocs[doc] ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                   >
                      <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-all ${
                        checkedDocs[doc] ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'
                      }`}>
                         {checkedDocs[doc] && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                      </div>
                      <span className={`font-bold ${checkedDocs[doc] ? 'text-white' : 'text-slate-300'}`}>{doc}</span>
                   </button>
                ))}
             </div>
          </div>
          
          {/* Steps */}
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100">
             <h3 className="text-2xl font-black text-slate-900 mb-10">Enrollment Process</h3>
             <div className="space-y-12 relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100 hidden sm:block" />
                {scheme.steps.map((step, i) => (
                   <div key={i} className="flex gap-8 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-lg shadow-indigo-100">
                         {i + 1}
                      </div>
                      <div className="pt-2">
                         <p className="text-lg font-bold text-slate-800 leading-relaxed">{step}</p>
                      </div>
                   </div>
                ))}
             </div>
             <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <a href={scheme.officialLink} target="_blank" className="flex-grow py-5 bg-slate-900 text-white text-center font-black text-lg rounded-3xl shadow-xl transition-all hover:bg-black">Apply on Official Site</a>
                <button className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 font-black text-lg rounded-3xl hover:bg-slate-50 transition-all">Download Guide (PDF)</button>
             </div>
          </div>
        </div>

        {/* AI Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-8">
             <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                <div className="bg-indigo-600 p-8 text-white">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                      </div>
                      <h4 className="text-xl font-black">AI Assistance</h4>
                   </div>
                   <p className="text-indigo-100 text-sm leading-relaxed">Ask any question about this scheme in plain language.</p>
                </div>
                <div className="p-8">
                   {aiResponse && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-medium leading-relaxed text-slate-700">
                         {aiResponse}
                      </motion.div>
                   )}
                   <form onSubmit={handleAskAi} className="space-y-4">
                      <textarea 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="e.g. Can my wife apply? What is the income limit?"
                        className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-sm resize-none font-medium h-32"
                      />
                      <button 
                        type="submit"
                        disabled={isLoading || !question.trim()}
                        className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl transition-all disabled:opacity-50"
                      >
                         {isLoading ? 'Processing...' : 'Ask Sahayata'}
                      </button>
                   </form>
                </div>
             </div>
             
             <div className="bg-amber-100 p-8 rounded-[2rem] border border-amber-200">
                <div className="flex gap-4 mb-4">
                   <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                   </div>
                   <h5 className="font-black text-amber-900 leading-tight">Attention</h5>
                </div>
                <p className="text-xs text-amber-800 font-bold leading-relaxed">Ensure all original documents are present during verification. Digital copies may not always be sufficient.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetail;
