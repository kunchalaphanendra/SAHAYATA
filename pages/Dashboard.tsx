
import React, { useState, useMemo } from 'react';
import { UserProfile, LanguageCode, Category, Gender, MaritalStatus } from '../types';
import { STATES, SCHEMES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  profile: UserProfile | null;
  setProfile: (p: UserProfile) => void;
  lang: LanguageCode;
}

type Tab = 'Applications' | 'Profile' | 'Saved' | 'Settings';

const Dashboard: React.FC<DashboardProps> = ({ profile, setProfile, lang }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('Applications');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editData, setEditData] = useState<UserProfile | null>(profile);

  const eligibleCount = useMemo(() => {
    if (!profile) return 0;
    return SCHEMES.filter(scheme => {
      if (scheme.minAge && profile.age < scheme.minAge) return false;
      if (scheme.maxAge && profile.age > scheme.maxAge) return false;
      if (scheme.gender && scheme.gender !== 'All' && scheme.gender !== profile.gender) return false;
      if (scheme.maxIncome && profile.income > scheme.maxIncome) return false;
      if (scheme.isDisabilityRequired && !profile.hasDisability) return false;
      if (scheme.residence && scheme.residence !== 'Both' && scheme.residence !== profile.residence) return false;
      if (scheme.bplOnly && !profile.isBPL) return false;
      if (scheme.maritalStatus && scheme.maritalStatus.length > 0 && !scheme.maritalStatus.includes(profile.maritalStatus)) return false;
      if (scheme.occupation && scheme.occupation !== profile.occupation) return false;
      if (scheme.caste && scheme.caste.length > 0 && !scheme.caste.includes(profile.caste)) return false;
      return true;
    }).length;
  }, [profile]);

  const handleSaveProfile = () => {
    if (editData) {
      setProfile(editData);
      setIsEditingProfile(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editData) return;
    const { name, value, type } = e.target;
    setEditData({
      ...editData,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    });
  };

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-20 rounded-[4rem] shadow-xl border border-slate-100 max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-6">Access Portal</h2>
          <p className="text-slate-500 mb-10 text-xl font-bold">Please complete your profile to view your personal dashboard.</p>
          <button onClick={() => navigate('/discovery')} className="bg-indigo-600 text-white px-12 py-5 rounded-[2.5rem] font-black text-xl hover:scale-105 transition-all">
            Identify Myself
          </button>
        </motion.div>
      </div>
    );
  }

  const navItems: { name: Tab; icon: string }[] = [
    { name: 'Applications', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { name: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'Saved', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' },
    { name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
  ];

  const dummyApplications = [
    { name: 'Ayushman Bharat', date: 'May 12, 2024', status: 'In Review', id: 'AB-902' },
    { name: 'PM Kisan Samman', date: 'Mar 20, 2024', status: 'Approved', id: 'KS-114' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Left Nav */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600" />
            <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2.5rem] mx-auto mb-6 flex items-center justify-center text-4xl font-black shadow-inner">
              {profile.occupation[0]}
            </div>
            <h3 className="text-2xl font-black text-slate-900 leading-tight">My Citizen Profile</h3>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2">{profile.state} Resident</p>
            
            <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">Profile Verified</span>
                  <span className="text-indigo-600">Active</span>
               </div>
               <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[95%]" />
               </div>
            </div>
          </div>

          <nav className="flex flex-col gap-3">
            {navItems.map(item => (
              <button 
                key={item.name} 
                onClick={() => setActiveTab(item.name)}
                className={`w-full text-left px-8 py-5 rounded-[2rem] font-black transition-all flex items-center gap-4 text-sm ${activeTab === item.name ? 'bg-slate-900 text-white shadow-2xl' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon}></path></svg>
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3 space-y-12">
          {activeTab === 'Applications' && (
            <>
              <div className="bg-white rounded-[4rem] p-12 shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="flex justify-between items-end mb-10">
                  <h2 className="text-4xl font-black text-slate-900 leading-tight">My Activity</h2>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Live Updates</p>
                </div>
                <div className="space-y-6">
                   {dummyApplications.map((app, i) => (
                      <div key={app.id} className="p-8 rounded-[3rem] bg-slate-50 border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group hover:bg-white hover:shadow-2xl transition-all">
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-slate-100 flex items-center justify-center font-black text-xl shadow-sm text-indigo-600">
                               {app.name[0]}
                            </div>
                            <div>
                               <h4 className="text-xl font-black text-slate-900">{app.name}</h4>
                               <p className="text-xs font-bold text-slate-400 mt-1">Ref ID: {app.id} • Applied {app.date}</p>
                            </div>
                         </div>
                         <span className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${app.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                            {app.status}
                         </span>
                      </div>
                   ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-indigo-600 text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                   <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Real-time Matching</h4>
                   <p className="text-4xl font-black mb-4">{eligibleCount}</p>
                   <p className="text-indigo-100 font-bold text-sm">New schemes found for your current profile.</p>
                   <button onClick={() => navigate('/results')} className="mt-8 px-6 py-3 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Explore results</button>
                </div>
                <div className="bg-white border border-slate-100 p-10 rounded-[3.5rem] shadow-sm relative overflow-hidden">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Upcoming Events</h4>
                   <p className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Kisan Diwas 2024</p>
                   <p className="text-slate-500 font-bold text-sm leading-relaxed">Special enrollment drive starting in your district next week.</p>
                   <div className="mt-8 w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                   </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'Profile' && (
            <div className="bg-white rounded-[4rem] p-12 shadow-sm border border-slate-100">
               <div className="flex justify-between items-start mb-12">
                  <div>
                     <h2 className="text-4xl font-black text-slate-900 mb-2">Profile Details</h2>
                     <p className="text-slate-500 font-bold">Manage your socio-economic data used for scheme discovery.</p>
                  </div>
                  {!isEditingProfile ? (
                    <button 
                      onClick={() => { setEditData(profile); setIsEditingProfile(true); }}
                      className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-4">
                       <button onClick={() => setIsEditingProfile(false)} className="px-6 py-4 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600">Cancel</button>
                       <button onClick={handleSaveProfile} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Save Changes</button>
                    </div>
                  )}
               </div>

               {isEditingProfile && editData ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Age</label>
                       <input type="number" name="age" value={editData.age} onChange={handleInputChange} className="w-full p-6 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none font-black text-xl" />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Annual Income (₹)</label>
                       <input type="number" name="income" value={editData.income} onChange={handleInputChange} className="w-full p-6 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none font-black text-xl" />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">State of Residence</label>
                       <select name="state" value={editData.state} onChange={handleInputChange} className="w-full p-6 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none font-black text-xl">
                          {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                       </select>
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Category (Caste)</label>
                       <select name="caste" value={editData.caste} onChange={handleInputChange} className="w-full p-6 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none font-black text-xl">
                          <option value="General">General</option>
                          <option value="OBC">OBC</option>
                          <option value="SC">SC</option>
                          <option value="ST">ST</option>
                       </select>
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Family Size</label>
                       <input type="number" name="familySize" value={editData.familySize} onChange={handleInputChange} className="w-full p-6 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none font-black text-xl" />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Marital Status</label>
                       <select name="maritalStatus" value={editData.maritalStatus} onChange={handleInputChange} className="w-full p-6 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none font-black text-xl">
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Widow">Widow</option>
                          <option value="Divorced">Divorced</option>
                       </select>
                    </div>
                 </div>
               ) : (
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {[
                      { label: 'Age', val: `${profile.age} Years` },
                      { label: 'State', val: profile.state },
                      { label: 'Income', val: `₹${profile.income.toLocaleString()}/yr` },
                      { label: 'Caste', val: profile.caste },
                      { label: 'Family Size', val: `${profile.familySize} Members` },
                      { label: 'Status', val: profile.maritalStatus },
                      { label: 'BPL Card', val: profile.isBPL ? 'Yes' : 'No' },
                      { label: 'Disability', val: profile.hasDisability ? 'Yes' : 'No' },
                      { label: 'Residence', val: profile.residence }
                    ].map(item => (
                      <div key={item.label} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                         <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-2">{item.label}</span>
                         <span className="text-lg font-black text-slate-900">{item.val}</span>
                      </div>
                    ))}
                 </div>
               )}
            </div>
          )}

          {activeTab === 'Saved' && (
            <div className="bg-white rounded-[4rem] p-24 text-center border-4 border-dashed border-slate-100">
               <h3 className="text-3xl font-black text-slate-900 mb-4">No Saved Schemes</h3>
               <p className="text-slate-500 font-bold max-w-sm mx-auto mb-10">Start by exploring schemes and clicking the 'Save' icon to keep track of interesting programs.</p>
               <button onClick={() => navigate('/results')} className="bg-slate-900 text-white px-10 py-5 rounded-3xl font-black">Browse Schemes</button>
            </div>
          )}
          
          {activeTab === 'Settings' && (
            <div className="bg-white rounded-[4rem] p-12 shadow-sm border border-slate-100 space-y-10">
               <h2 className="text-4xl font-black text-slate-900">Portal Settings</h2>
               <div className="space-y-6">
                  <div className="flex items-center justify-between p-8 bg-slate-50 rounded-3xl border border-slate-100">
                     <div>
                        <h5 className="font-black text-slate-900">SMS Alerts</h5>
                        <p className="text-sm text-slate-500">Get text messages when application status changes.</p>
                     </div>
                     <div className="w-14 h-8 bg-indigo-600 rounded-full relative p-1 cursor-pointer">
                        <div className="absolute right-1 w-6 h-6 bg-white rounded-full shadow-sm" />
                     </div>
                  </div>
                  <div className="flex items-center justify-between p-8 bg-slate-50 rounded-3xl border border-slate-100">
                     <div>
                        <h5 className="font-black text-slate-900">Multi-factor Auth</h5>
                        <p className="text-sm text-slate-500">Secure your portal with an extra layer of protection.</p>
                     </div>
                     <div className="w-14 h-8 bg-slate-200 rounded-full relative p-1 cursor-pointer">
                        <div className="absolute left-1 w-6 h-6 bg-white rounded-full shadow-sm" />
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
