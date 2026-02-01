
import { Scheme, LanguageCode, Translation } from './types';

export const SCHEMES: Scheme[] = [
  // --- HEALTH SECTOR ---
  {
    id: '1',
    name: 'Ayushman Bharat (PM-JAY)',
    category: 'Health',
    description: 'National health insurance providing ₹5 Lakh cover for families.',
    benefits: ['Cashless treatment', 'Covers 1,400+ procedures'],
    maxIncome: 250000,
    bplOnly: true,
    documents: ['Aadhar Card', 'Ration Card'],
    steps: ['Check name in SECC', 'Visit CSC center', 'Get Golden Card'],
    officialLink: 'https://pmjay.gov.in/'
  },
  {
    id: '2',
    name: 'Janani Suraksha Yojana',
    category: 'Health',
    description: 'Financial assistance for pregnant women for institutional delivery.',
    benefits: ['Cash incentive for birth', 'Free transport (102/108)'],
    gender: 'Female',
    maritalStatus: ['Married'],
    documents: ['MCP Card', 'Bank Passbook'],
    steps: ['Register with ASHA', 'Deliver in Govt Hospital'],
    officialLink: 'https://nhm.gov.in/'
  },
  {
    id: '3',
    name: 'National TB Elimination Program',
    category: 'Health',
    description: 'Free diagnosis and nutritional support for TB patients.',
    benefits: ['Free medicine (DOTS)', '₹500/month nutrition aid'],
    documents: ['Diagnostic report', 'Bank Details'],
    steps: ['Sputum test at Govt Lab', 'Direct enrollment'],
    officialLink: 'https://tbcindia.gov.in/'
  },

  // --- AGRICULTURE SECTOR ---
  {
    id: '10',
    name: 'PM Kisan Samman Nidhi',
    category: 'Agriculture',
    description: 'Income support of ₹6,000 per year for all landholding farmers.',
    benefits: ['₹2000 every 4 months', 'Direct Bank Transfer'],
    occupation: 'Farmer',
    documents: ['Land Records', 'Aadhar Card'],
    steps: ['Self-register on portal', 'Local revenue verify'],
    officialLink: 'https://pmkisan.gov.in/'
  },
  {
    id: '11',
    name: 'PM Fasal Bima Yojana',
    category: 'Agriculture',
    description: 'Crop insurance against natural calamities and pests.',
    benefits: ['Low premium (1.5-2%)', 'Full sum insured payment'],
    occupation: 'Farmer',
    documents: ['Sowing certificate', 'Land document'],
    steps: ['Register on PMFBY', 'Pay premium at Bank'],
    officialLink: 'https://pmfby.gov.in/'
  },
  {
    id: '12',
    name: 'PM KUSUM Solar Pump',
    category: 'Agriculture',
    description: 'Subsidy for installing solar-powered irrigation pumps.',
    benefits: ['60% Govt subsidy', 'Sell extra power to grid'],
    occupation: 'Farmer',
    documents: ['Land holding', 'Identity proof'],
    steps: ['Apply to State Nodal Agency', 'Survey of farm'],
    officialLink: 'https://mnre.gov.in/'
  },

  // --- EMPLOYMENT & SKILLS ---
  {
    id: '20',
    name: 'MGNREGA Rural Employment',
    category: 'Employment',
    description: '100 days of guaranteed wage employment for rural households.',
    benefits: ['Guaranteed wage', 'Unemployment allowance'],
    occupation: 'Daily Wage Laborer',
    residence: 'Rural',
    documents: ['Job Card', 'Aadhar Card'],
    steps: ['Apply to Gram Panchayat', 'Get Job Card'],
    officialLink: 'https://nrega.nic.in/'
  },
  {
    id: '21',
    name: 'PM Mudra Yojana (Business Loan)',
    category: 'Employment',
    description: 'Collateral-free loans up to ₹10 Lakh for small businesses.',
    benefits: ['No collateral', 'Low interest rates'],
    occupation: 'Small Business',
    documents: ['Business Plan', 'KYC'],
    steps: ['Visit any Bank/NBFC', 'Submit Mudra application'],
    officialLink: 'https://www.mudra.org.in/'
  },
  {
    id: '22',
    name: 'PM SVANidhi (Street Vendors)',
    category: 'Employment',
    description: 'Working capital micro-credit for urban/rural street vendors.',
    benefits: ['₹10,000 initial loan', '7% interest subsidy'],
    occupation: 'Street Vendor',
    documents: ['Vending Certificate', 'Aadhar'],
    steps: ['Apply via SVANidhi app', 'KYC check'],
    officialLink: 'https://pmsvanidhi.mohua.gov.in/'
  },
  {
    id: '23',
    name: 'PM Vishwakarma',
    category: 'Employment',
    description: 'Support for traditional artisans in 18 trades (carpenter, etc).',
    benefits: ['₹15,000 toolkit e-voucher', 'Loan at 5% interest'],
    occupation: 'Artisan',
    documents: ['Artisan ID', 'Aadhar'],
    steps: ['Register at CSC', 'Verification by Local Body'],
    officialLink: 'https://pmvishwakarma.gov.in/'
  },

  // --- EDUCATION ---
  {
    id: '30',
    name: 'Sukanya Samriddhi Yojana',
    category: 'Education',
    description: 'Small savings scheme for girl children with high interest.',
    benefits: ['8.2% Interest rate', 'Tax benefit (80C)'],
    gender: 'Female',
    maxAge: 10,
    documents: ['Birth certificate', 'Parent ID'],
    steps: ['Open at Post Office/Bank', 'Initial ₹250 deposit'],
    officialLink: 'https://www.india.gov.in/'
  },
  {
    id: '31',
    name: 'Post-Matric Scholarship (SC/ST)',
    category: 'Education',
    description: 'Financial assistance for higher studies for SC/ST students.',
    benefits: ['Full fee reimbursement', 'Maintenance allowance'],
    caste: ['SC', 'ST'],
    maxIncome: 250000,
    documents: ['Caste Certificate', 'Mark sheets'],
    steps: ['Apply on National Scholarship Portal'],
    officialLink: 'https://scholarships.gov.in/'
  },
  {
    id: '32',
    name: 'Pragati Scholarship (Girls)',
    category: 'Education',
    description: 'Supporting girl students pursuing technical education.',
    benefits: ['₹50,000 per year', 'Covers degree/diploma'],
    gender: 'Female',
    maxIncome: 800000,
    documents: ['Admission proof', 'Income certificate'],
    steps: ['Register on NSP', 'Institute verification'],
    officialLink: 'https://www.aicte-india.org/'
  },

  // --- WELFARE & HOUSING ---
  {
    id: '40',
    name: 'PMAY-Urban Housing',
    category: 'Housing',
    description: 'Interest subsidy on home loans for urban middle/low income.',
    benefits: ['Subsidy up to ₹2.67 Lakh', 'Priority for women'],
    residence: 'Urban',
    maxIncome: 600000,
    documents: ['Income proof', 'Affidavit of no house'],
    steps: ['Apply on PMAY portal', 'Verification'],
    officialLink: 'https://pmay-urban.gov.in/'
  },
  {
    id: '41',
    name: 'PMAY-Gramin Housing',
    category: 'Housing',
    description: 'Financial assistance for house construction in rural areas.',
    benefits: ['₹1.2 - 1.3 Lakh grant', '95 days MGNREGA wages'],
    residence: 'Rural',
    bplOnly: true,
    documents: ['SECC data check', 'Aadhar'],
    steps: ['Selection via SECC list', 'Gram Sabha verify'],
    officialLink: 'https://pmayg.nic.in/'
  },
  {
    id: '42',
    name: 'Atal Pension Yojana',
    category: 'Welfare',
    description: 'Fixed pension scheme for unorganized sector workers.',
    benefits: ['₹1000-5000 monthly pension', 'Life cover for spouse'],
    minAge: 18,
    maxAge: 40,
    documents: ['Bank Account', 'Aadhar'],
    steps: ['Fill form at Bank', 'Enable auto-debit'],
    officialLink: 'https://www.npscra.nsdl.co.in/'
  },
  {
    id: '43',
    name: 'PM Ujjwala Yojana (Free Gas)',
    category: 'Welfare',
    description: 'Free LPG connection for women of BPL households.',
    benefits: ['Zero-cost LPG kit', 'Refill subsidy'],
    gender: 'Female',
    bplOnly: true,
    documents: ['BPL Card', 'Aadhar', 'Ration Card'],
    steps: ['Apply to LPG Distributor', 'KYC submission'],
    officialLink: 'https://www.pmuy.gov.in/'
  }
];

export const TRANSLATIONS: Record<LanguageCode, Translation> = {
  en: {
    title: 'Sahayata',
    subtitle: 'Citizen Welfare Concierge',
    checkEligibility: 'Find My Schemes',
    heroDesc: 'Your personal AI-powered portal to discover, understand, and enroll in government welfare programs.',
    languageName: 'English',
    footerRights: '© 2024 Sahayata Portal. Digital Empowerment for Every Citizen.'
  },
  hi: {
    title: 'सहायता',
    subtitle: 'नागरिक कल्याण सेवा',
    checkEligibility: 'योजनाएं खोजें',
    heroDesc: 'सरकारी कल्याण कार्यक्रमों की खोज, समझने और नामांकन करने के लिए आपका व्यक्तिगत पोर्टल।',
    languageName: 'हिन्दी',
    footerRights: '© 2024 सहायता पोर्टल। हर नागरिक के لیے डिजिटल अधिकार।'
  },
  te: { title: 'సహాయత', subtitle: 'ప్రభుత్వ పథకాల సేవ', checkEligibility: 'పథకాలను కనుగొనండి', heroDesc: 'ప్రభుత్వ సంక్షేమ పథకాలను కనుగొనడానికి మీ వ్యక్తిగత పోర్టల్.', languageName: 'తెలుగు', footerRights: '© 2024 సహాయత పోర్టల్.' },
  ta: { title: 'சஹாயதா', subtitle: 'அரசு நலத்திட்ட சேவை', checkEligibility: 'திட்டங்களைக் கண்டறியவும்', heroDesc: 'அரசு நலத்திட்டங்களைக் கண்டறிவதற்கான உங்கள் தனிப்பட்ட போர்டல்.', languageName: 'தமிழ்', footerRights: '© 2024 சஹாயதா போர்டல்.' }
};

export const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
];
