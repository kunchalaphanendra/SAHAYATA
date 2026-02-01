
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile, LanguageCode, Category, Gender, MaritalStatus } from '../types';
import { STATES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface DiscoveryProps {
  setUserProfile: (profile: UserProfile) => void;
  lang: LanguageCode;
}

const Discovery: React.FC<DiscoveryProps> = ({ setUserProfile, lang }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 7;

  const [formData, setFormData] = useState<UserProfile>({
    age: 25,
    gender: 'Male',
    state: 'Delhi',
    income: 0,
    caste: 'General',
    occupation: 'Unemployed',
    hasDisability: false,
    residence: 'Urban',
    isBPL: false,
    maritalStatus: 'Single',
    familySize: 4,
    hasChronicIllness: false,
    language: lang
  });

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else {
      setUserProfile(formData);
      navigate('/results');
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const OptionButton = ({ label, selected, onClick, icon }: any) => (
    <button
      onClick={onClick}
      className={`p-6 rounded-[2rem] border-2 text-left transition-all flex items-center gap-5 w-full ${
        selected 
        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xl ring-2 ring-indigo-100' 
        : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${selected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
        {icon}
      </div>
      <span className="font-black text-xl leading-tight">{label}</span>
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto py-10 sm:py-20 px-4 flex flex-col min-h-[90vh]">
      {/* Progress Header */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-5">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-1">Profiling Progress</h2>
            <p className="text-4xl font-black text-slate-900 tracking-tight">Step {step}</p>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-indigo-600">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
        </div>
        <div className="bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner border border-slate-100">
          <motion.div 
            className="bg-indigo-600 h-full rounded-full shadow-[0_0_15px_rgba(79,70,229,0.3)]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          />
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        <AnimatePresence initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, position: 'absolute' }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-[3.5rem] shadow-2xl p-8 sm:p-16 border border-slate-100 w-full"
          >
            {step === 1 && (
              <div className="space-y-12">
                <div className="space-y-4">
                   <h2 className="text-5xl font-black text-slate-900 leading-none">Who are you?</h2>
                   <p className="text-slate-500 font-bold text-lg">Basic demographics help filter age and gender specific welfare.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Age</label>
                    <input
                      type="number"
                      autoFocus
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
                      className="w-full text-4xl p-8 bg-slate-50 border-4 border-transparent focus:border-indigo-600 rounded-[2.5rem] outline-none font-black transition-all shadow-inner text-indigo-600"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Gender</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['Male', 'Female'].map(g => (
                        <button
                          key={g}
                          onClick={() => setFormData({...formData, gender: g as Gender})}
                          className={`py-8 rounded-[2.5rem] font-black text-2xl border-4 transition-all ${formData.gender === g ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl scale-[1.05]' : 'bg-white border-slate-100 text-slate-300 hover:border-slate-200'}`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-12">
                <div className="space-y-4">
                   <h2 className="text-5xl font-black text-slate-900 leading-none">Your Location</h2>
                   <p className="text-slate-500 font-bold text-lg">Central schemes vary by state, and many are for rural zones only.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <OptionButton 
                    label="Rural / Village" 
                    selected={formData.residence === 'Rural'} 
                    onClick={() => setFormData({...formData, residence: 'Rural'})}
                    icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>}
                  />
                  <OptionButton 
                    label="Urban / City" 
                    selected={formData.residence === 'Urban'} 
                    onClick={() => setFormData({...formData, residence: 'Urban'})}
                    icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>}
                  />
                </div>
                <div className="pt-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Home State / UT</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full mt-4 text-3xl p-8 bg-slate-50 border-4 border-transparent focus:border-indigo-600 rounded-[2.5rem] outline-none font-black appearance-none text-slate-900"
                  >
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-12">
                <div className="space-y-4">
                   <h2 className="text-5xl font-black text-slate-900 leading-none">Economy</h2>
                   <p className="text-slate-500 font-bold text-lg">Financial profiling ensures we don't show schemes you earn too much for.</p>
                </div>
                <div className="space-y-10">
                  <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="flex justify-between items-center mb-10 relative z-10">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Annual Family Income</span>
                      <span className="text-4xl font-black">₹{formData.income.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1500000"
                      step="25000"
                      value={formData.income}
                      onChange={(e) => setFormData({...formData, income: parseInt(e.target.value)})}
                      className="w-full h-5 bg-white/20 rounded-full appearance-none cursor-pointer accent-white hover:accent-orange-400 transition-all relative z-10"
                    />
                  </div>
                  
                  <div 
                    onClick={() => setFormData({...formData, isBPL: !formData.isBPL})}
                    className={`flex items-center gap-8 p-10 rounded-[3rem] border-4 cursor-pointer transition-all ${formData.isBPL ? 'border-indigo-600 bg-indigo-50 shadow-2xl' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${formData.isBPL ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-300'}`}>
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-black text-slate-900 text-2xl">BPL Status</h4>
                      <p className="text-slate-500 font-bold">I possess a valid Below Poverty Line (BPL) card.</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all ${formData.isBPL ? 'bg-indigo-600 border-indigo-200' : 'border-slate-100 bg-slate-50'}`}>
                      {formData.isBPL && <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-12">
                <div className="space-y-4">
                   <h2 className="text-5xl font-black text-slate-900 leading-none">Social & Work</h2>
                   <p className="text-slate-500 font-bold text-lg">Occupation-specific schemes (like Farmers or Artisans) are high impact.</p>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  {['General', 'OBC', 'SC', 'ST'].map(c => (
                    <button
                      key={c}
                      onClick={() => setFormData({...formData, caste: c as Category})}
                      className={`p-8 rounded-[2.5rem] font-black text-2xl border-4 transition-all ${formData.caste === c ? 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-[1.05]' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Primary Occupation</label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                    className="w-full text-3xl p-8 bg-slate-50 border-4 border-transparent focus:border-indigo-600 rounded-[2.5rem] outline-none font-black appearance-none text-slate-900"
                  >
                    <option value="Unemployed">Unemployed / Student</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Daily Wage Laborer">Daily Wage Laborer</option>
                    <option value="Small Business">Entrepreneur</option>
                    <option value="Artisan">Handicraft / Artisan</option>
                    <option value="Street Vendor">Street Vendor</option>
                  </select>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-12">
                <div className="space-y-4">
                   <h2 className="text-5xl font-black text-slate-900 leading-none">Household</h2>
                   <p className="text-slate-500 font-bold text-lg">Subsidy amounts often scale based on the number of dependents.</p>
                </div>
                <div className="space-y-10">
                   <div className="bg-slate-50 p-10 rounded-[3rem] border-4 border-dashed border-slate-200">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-8 text-center">Family Size</label>
                      <div className="flex items-center justify-center gap-14">
                         <button 
                            onClick={() => setFormData(f => ({...f, familySize: Math.max(1, f.familySize - 1)}))}
                            className="w-20 h-20 rounded-3xl bg-white border-4 border-slate-200 text-4xl font-black text-slate-400 hover:border-indigo-600 hover:text-indigo-600 hover:shadow-xl transition-all flex items-center justify-center"
                         >-</button>
                         <span className="text-8xl font-black text-indigo-600 tabular-nums">{formData.familySize}</span>
                         <button 
                            onClick={() => setFormData(f => ({...f, familySize: f.familySize + 1}))}
                            className="w-20 h-20 rounded-3xl bg-white border-4 border-slate-200 text-4xl font-black text-slate-400 hover:border-indigo-600 hover:text-indigo-600 hover:shadow-xl transition-all flex items-center justify-center"
                         >+</button>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {['Single', 'Married', 'Widow', 'Divorced'].map(m => (
                      <button
                        key={m}
                        onClick={() => setFormData({...formData, maritalStatus: m as MaritalStatus})}
                        className={`py-6 px-2 rounded-[2rem] font-black border-4 text-sm transition-all ${formData.maritalStatus === m ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-12">
                <div className="space-y-4">
                   <h2 className="text-5xl font-black text-slate-900 leading-none">Well-being</h2>
                   <p className="text-slate-500 font-bold text-lg">Health status triggers eligibility for various insurance and medical grants.</p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div 
                    onClick={() => setFormData({...formData, hasDisability: !formData.hasDisability})}
                    className={`flex items-center gap-8 p-10 rounded-[3rem] border-4 cursor-pointer transition-all ${formData.hasDisability ? 'border-indigo-600 bg-indigo-50 shadow-2xl' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${formData.hasDisability ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-300'}`}>
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-black text-slate-900 text-2xl">Physical Disability</h4>
                      <p className="text-slate-500 font-bold">Disability (40% or more) as per Govt guidelines.</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all ${formData.hasDisability ? 'bg-indigo-600 border-indigo-200' : 'border-slate-100 bg-slate-50'}`}>
                      {formData.hasDisability && <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>}
                    </div>
                  </div>

                  <div 
                    onClick={() => setFormData({...formData, hasChronicIllness: !formData.hasChronicIllness})}
                    className={`flex items-center gap-8 p-10 rounded-[3rem] border-4 cursor-pointer transition-all ${formData.hasChronicIllness ? 'border-indigo-600 bg-indigo-50 shadow-2xl' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${formData.hasChronicIllness ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-300'}`}>
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-black text-slate-900 text-2xl">Chronic Conditions</h4>
                      <p className="text-slate-500 font-bold">Ongoing serious medical treatment or illness.</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all ${formData.hasChronicIllness ? 'bg-indigo-600 border-indigo-200' : 'border-slate-100 bg-slate-50'}`}>
                      {formData.hasChronicIllness && <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="text-center py-10 space-y-10">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.6 }}
                  className="w-40 h-40 bg-green-100 text-green-600 rounded-[3.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-green-100/50"
                >
                  <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                </motion.div>
                <div className="space-y-4">
                   <h2 className="text-6xl font-black text-slate-900 tracking-tighter">Identity Built</h2>
                   <p className="text-2xl text-slate-500 max-w-lg mx-auto font-bold">We are ready to match your specific profile with our national scheme database.</p>
                </div>
                <div className="bg-slate-900 p-10 rounded-[3.5rem] grid grid-cols-2 sm:grid-cols-4 gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 border-4 border-white/5">
                   <div className="flex flex-col gap-2 bg-white/5 p-4 rounded-3xl"><span>Age</span><span className="text-indigo-400 text-lg">{formData.age}</span></div>
                   <div className="flex flex-col gap-2 bg-white/5 p-4 rounded-3xl"><span>Zone</span><span className="text-indigo-400 text-lg">{formData.residence}</span></div>
                   <div className="flex flex-col gap-2 bg-white/5 p-4 rounded-3xl"><span>Income</span><span className="text-indigo-400 text-lg">₹{Math.floor(formData.income/1000)}k</span></div>
                   <div className="flex flex-col gap-2 bg-white/5 p-4 rounded-3xl"><span>Family</span><span className="text-indigo-400 text-lg">{formData.familySize}</span></div>
                </div>
              </div>
            )}

            <div className="mt-16 flex gap-6">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="px-12 py-8 border-4 border-slate-100 text-slate-400 font-black text-xl rounded-[2.5rem] hover:bg-slate-50 transition-all hover:border-slate-300"
                >
                  Back
                </button>
              )}
              <button
                onClick={nextStep}
                className="flex-grow py-8 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-3xl rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(79,70,229,0.3)] transition-all transform hover:-translate-y-2 active:translate-y-0"
              >
                {step === totalSteps ? 'Discover Matches' : 'Continue'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Discovery;
