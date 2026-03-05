
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SCHEMES, TRANSLATIONS } from '../constants';
import { UserProfile, LanguageCode, Application } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Upload, ArrowRight, ArrowLeft, FileText, ShieldCheck } from 'lucide-react';

interface ApplySchemeProps {
  profile: UserProfile | null;
  lang: LanguageCode;
  onApply: (app: Application) => void;
}

const ApplyScheme: React.FC<ApplySchemeProps> = ({ profile, lang, onApply }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scheme = useMemo(() => SCHEMES.find(s => s.id === id), [id]);
  const t = TRANSLATIONS[lang];

  const [step, setStep] = useState(1);
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!scheme || !profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-black">Scheme or Profile not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-indigo-600 font-bold underline">Go Home</button>
      </div>
    );
  }

  const handleUpload = (doc: string) => {
    if (!uploadedDocs.includes(doc)) {
      setUploadedDocs([...uploadedDocs, doc]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newApp: Application = {
      id: `APP-${Math.floor(Math.random() * 10000)}`,
      schemeId: scheme.id,
      schemeName: scheme.name,
      status: 'Pending',
      appliedDate: new Date().toLocaleDateString(),
      documentsUploaded: uploadedDocs
    };

    onApply(newApp);
    setStep(4); // Success step
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Progress Bar */}
      <div className="mb-12 flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-indigo-600 -z-10 -translate-y-1/2 transition-all duration-500" 
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        />
        {[1, 2, 3, 4].map(s => (
          <div 
            key={s}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all ${
              step >= s ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-400 border-2 border-slate-100'
            }`}
          >
            {step > s ? <CheckCircle size={18} /> : s}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100"
          >
            <h2 className="text-3xl font-black mb-2">Step 1: Review Eligibility</h2>
            <p className="text-slate-500 font-bold mb-8">Confirm your details for {scheme.name}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Applicant</span>
                <span className="font-black text-slate-900">{profile.name}</span>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Income Status</span>
                <span className="font-black text-slate-900">₹{profile.income.toLocaleString()} / Year</span>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Residence</span>
                <span className="font-black text-slate-900">{profile.residence} ({profile.state})</span>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Category</span>
                <span className="font-black text-slate-900">{profile.caste}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setStep(2)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-indigo-100"
              >
                Proceed to Documents <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100"
          >
            <h2 className="text-3xl font-black mb-2">Step 2: Upload Documents</h2>
            <p className="text-slate-500 font-bold mb-8">Please upload clear copies of the following required documents.</p>
            
            <div className="space-y-4 mb-10">
              {scheme.documents.map(doc => (
                <div key={doc} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${uploadedDocs.includes(doc) ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-slate-400'}`}>
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900">{doc}</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Required • PDF/JPG</p>
                    </div>
                  </div>
                  {uploadedDocs.includes(doc) ? (
                    <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest">
                      <CheckCircle size={16} /> Uploaded
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleUpload(doc)}
                      className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
                    >
                      <Upload size={16} /> Upload
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-slate-400 font-black px-6 py-4 hover:text-slate-600 transition-all">
                <ArrowLeft size={20} /> Back
              </button>
              <button 
                disabled={uploadedDocs.length < scheme.documents.length}
                onClick={() => setStep(3)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 disabled:hover:scale-100"
              >
                Review Application <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100"
          >
            <h2 className="text-3xl font-black mb-2">Step 3: Final Review</h2>
            <p className="text-slate-500 font-bold mb-8">Review your application before final submission.</p>
            
            <div className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 mb-10">
               <div className="flex items-start gap-4">
                  <ShieldCheck className="text-indigo-600 mt-1" size={24} />
                  <div>
                     <h4 className="font-black text-indigo-900 mb-2">Declaration</h4>
                     <p className="text-sm text-indigo-700 leading-relaxed font-medium">
                        I hereby declare that the information provided is true to the best of my knowledge. I understand that any false information may lead to rejection of my application.
                     </p>
                  </div>
               </div>
            </div>

            <div className="space-y-4 mb-10">
               <div className="flex justify-between py-4 border-b border-slate-50">
                  <span className="text-slate-400 font-bold">Scheme</span>
                  <span className="font-black text-slate-900">{scheme.name}</span>
               </div>
               <div className="flex justify-between py-4 border-b border-slate-50">
                  <span className="text-slate-400 font-bold">Applicant</span>
                  <span className="font-black text-slate-900">{profile.name}</span>
               </div>
               <div className="flex justify-between py-4 border-b border-slate-50">
                  <span className="text-slate-400 font-bold">Documents</span>
                  <span className="font-black text-emerald-600">{uploadedDocs.length} Verified</span>
               </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 text-slate-400 font-black px-6 py-4 hover:text-slate-600 transition-all">
                <ArrowLeft size={20} /> Back
              </button>
              <button 
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-indigo-600 text-white px-12 py-5 rounded-3xl font-black hover:scale-105 transition-all shadow-2xl shadow-indigo-200 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-16 rounded-[4rem] shadow-xl border border-slate-100 text-center"
          >
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4">Application Submitted!</h2>
            <p className="text-slate-500 font-bold text-xl mb-10 max-w-md mx-auto">
              Your application for {scheme.name} has been successfully received. You can track its status in your dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/dashboard')}
                className="bg-slate-900 text-white px-10 py-5 rounded-3xl font-black hover:scale-105 transition-all"
              >
                Go to Dashboard
              </button>
              <button 
                onClick={() => navigate('/')}
                className="bg-slate-50 text-slate-500 px-10 py-5 rounded-3xl font-black hover:bg-slate-100 transition-all"
              >
                Back to Home
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApplyScheme;
