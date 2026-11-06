import { Candidate, Constituency, EcoImpactStats, Manifesto, Party, CampaignQrCode, CivicIssue, VoterSlip, SupportedLanguage } from "@/types";

export const PARTIES: Party[] = [
  {
    id: "party-gfp",
    name: "Green Future Alliance",
    abbreviation: "GFA",
    symbolUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=128&auto=format&fit=crop&q=80",
    colorHex: "#16a34a",
    headquarters: "New Delhi",
    foundedYear: 2018,
    websiteUrl: "https://greenfuturealliance.org",
  },
  {
    id: "party-pca",
    name: "Progressive Citizens Alliance",
    abbreviation: "PCA",
    symbolUrl: "https://images.unsplash.com/photo-1572945753563-804f02882394?w=128&auto=format&fit=crop&q=80",
    colorHex: "#2563eb",
    headquarters: "Bengaluru",
    foundedYear: 2012,
    websiteUrl: "https://progressivecitizens.org",
  },
  {
    id: "party-dpf",
    name: "Democratic People's Front",
    abbreviation: "DPF",
    symbolUrl: "https://images.unsplash.com/photo-1569025743873-ea3a9ade8abf?w=128&auto=format&fit=crop&q=80",
    colorHex: "#d97706",
    headquarters: "Mumbai",
    foundedYear: 2004,
    websiteUrl: "https://dpfront.org",
  },
  {
    id: "party-nrp",
    name: "National Reform Party",
    abbreviation: "NRP",
    symbolUrl: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=128&auto=format&fit=crop&q=80",
    colorHex: "#9333ea",
    headquarters: "Hyderabad",
    foundedYear: 2016,
    websiteUrl: "https://nationalreformparty.org",
  },
  {
    id: "party-ind",
    name: "Independent Citizen Coalition",
    abbreviation: "IND",
    symbolUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=128&auto=format&fit=crop&q=80",
    colorHex: "#475569",
    headquarters: "Autonomous",
    foundedYear: 2024,
    websiteUrl: "https://independentcoalition.org",
  }
];

export const CONSTITUENCIES: Constituency[] = [
  {
    id: "const-delhi-central",
    code: "DL-04",
    name: "New Delhi Central",
    state: "Delhi NCT",
    type: "PARLIAMENTARY",
    totalRegisteredVoters: 1450200,
    pincodes: ["110001", "110002", "110003", "110004", "110005"],
    pollingStations: [
      {
        id: "ps-del-1",
        name: "Govt Boys Senior Secondary School",
        roomNumber: "Room 4 (Ground Floor)",
        address: "Mandir Marg, Near Gole Market, New Delhi 110001",
        partNumber: "04/012",
        lat: 28.6289,
        lng: 77.2065,
        queueStatus: "Low (< 10 mins)",
        wheelchairAccessible: true,
      },
      {
        id: "ps-del-2",
        name: "NDMC Community Hall",
        roomNumber: "Main Hall A",
        address: "Babar Road, Bengali Market, New Delhi 110001",
        partNumber: "04/018",
        lat: 28.6265,
        lng: 77.2312,
        queueStatus: "Moderate (15-30 mins)",
        wheelchairAccessible: true,
      },
    ],
    bounds: {
      minLat: 28.58,
      maxLat: 28.66,
      minLng: 77.18,
      maxLng: 77.26,
    },
  },
  {
    id: "const-blr-south",
    code: "KA-26",
    name: "Bengaluru South",
    state: "Karnataka",
    type: "PARLIAMENTARY",
    totalRegisteredVoters: 2218400,
    pincodes: ["560004", "560011", "560070", "560078", "560041"],
    pollingStations: [
      {
        id: "ps-blr-1",
        name: "BBMP Model Primary School",
        roomNumber: "Room 2 (East Wing)",
        address: "9th Main, Jayanagar 4th Block, Bengaluru 560011",
        partNumber: "26/045",
        lat: 12.9298,
        lng: 77.5843,
        queueStatus: "Low (< 10 mins)",
        wheelchairAccessible: true,
      },
      {
        id: "ps-blr-2",
        name: "National College Auditorium",
        roomNumber: "Auditorium Annex",
        address: "Basavanagudi, Bengaluru 560004",
        partNumber: "26/088",
        lat: 12.9421,
        lng: 77.5739,
        queueStatus: "Busy (> 45 mins)",
        wheelchairAccessible: true,
      },
    ],
    bounds: {
      minLat: 12.87,
      maxLat: 12.95,
      minLng: 77.54,
      maxLng: 77.63,
    },
  },
  {
    id: "const-mumbai-south",
    code: "MH-31",
    name: "Mumbai South",
    state: "Maharashtra",
    type: "PARLIAMENTARY",
    totalRegisteredVoters: 1540900,
    pincodes: ["400001", "400005", "400020", "400026", "400004"],
    pollingStations: [
      {
        id: "ps-mum-1",
        name: "Elphinstone High School",
        roomNumber: "Room 10",
        address: "Near Crawford Market, Fort, Mumbai 400001",
        partNumber: "31/022",
        lat: 18.9472,
        lng: 72.8336,
        queueStatus: "Moderate (15-30 mins)",
        wheelchairAccessible: true,
      },
    ],
    bounds: {
      minLat: 18.90,
      maxLat: 18.98,
      minLng: 72.80,
      maxLng: 72.85,
    },
  },
  {
    id: "const-varanasi",
    code: "UP-77",
    name: "Varanasi",
    state: "Uttar Pradesh",
    type: "PARLIAMENTARY",
    totalRegisteredVoters: 1810300,
    pincodes: ["221001", "221002", "221005", "221010"],
    pollingStations: [
      {
        id: "ps-vns-1",
        name: "Harishchandra Degree College",
        roomNumber: "Room 5",
        address: "Maidagin, Varanasi 221001",
        partNumber: "77/034",
        lat: 25.3176,
        lng: 83.0062,
        queueStatus: "Low (< 10 mins)",
        wheelchairAccessible: true,
      },
    ],
    bounds: {
      minLat: 25.26,
      maxLat: 25.36,
      minLng: 82.95,
      maxLng: 83.05,
    },
  },
];

export const CANDIDATES: Candidate[] = [
  {
    id: "cand-aranya-sharma",
    fullName: "Dr. Aranya Sharma",
    partyId: "party-gfp",
    party: PARTIES[0],
    constituencyId: "const-delhi-central",
    constituencyName: "New Delhi Central",
    electionId: "elec-2026-gen",
    electionYear: 2026,
    bio: "Environmental scientist and community activist dedicated to zero-pollution urban governance, clean water access, and replacing wasteful paper election banners with verified digital townhalls.",
    education: "Ph.D. in Environmental Science (IIT Delhi)",
    age: 41,
    criminalCases: 0,
    assetsDeclared: 14500000,
    liabilitiesDeclared: 2200000,
    affidavitUrl: "https://eci.gov.in/affidavits/aranya-sharma-2026.pdf",
    profilePhotoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    socialLinks: {
      twitter: "@AranyaGreenDelhi",
      website: "https://aranyasharma.org",
      linkedin: "linkedin.com/in/aranya-sharma-env",
    },
    verificationStatus: "VERIFIED",
    verifiedBy: "Election Commission Officer (DL-West-02)",
    verifiedAt: "2026-03-12T10:30:00Z",
    qrCodeId: "qr-aranya-01",
    manifesto: {
      id: "man-aranya-01",
      candidateId: "cand-aranya-sharma",
      electionId: "elec-2026-gen",
      title: "Clean Skies & Honest Cities: 2026 Action Charter",
      pdfUrl: "https://raw.githubusercontent.com/smart-voter/sample-docs/main/manifesto-aranya.pdf",
      pageCount: 18,
      aiSummary: "Pledges 100% electrified municipal public transit within 24 months, zero single-use plastics in government procurement, real-time air quality monitors in all 15 wards, and an open digital grievance dashboard resolved within 48 hours.",
      keyPromises: [
        "100% electric bus coverage across New Delhi Central by 2028",
        "Subsidized rooftop solar for 25,000 middle-class households",
        "Open-budgeting citizen councils for all municipal ward funds",
        "Complete ban on roadside PVC flex election banners",
      ],
      translations: {
        en: {
          aiSummary: "Pledges 100% electrified municipal public transit within 24 months, zero single-use plastics in government procurement, real-time air quality monitors in all 15 wards, and an open digital grievance dashboard resolved within 48 hours.",
          keyPromises: [
            "100% electric bus coverage across New Delhi Central by 2028",
            "Subsidized rooftop solar for 25,000 middle-class households",
            "Open-budgeting citizen councils for all municipal ward funds",
            "Complete ban on roadside PVC flex election banners",
          ],
        },
        hi: {
          aiSummary: "24 महीनों के भीतर 100% इलेक्ट्रिक नगरपालिका सार्वजनिक परिवहन, सरकारी खरीद में शून्य एकल-उपयोग प्लास्टिक, सभी 15 वार्डों में रीयल-टाइम वायु गुणवत्ता मॉनिटर, और 48 घंटों में हल होने वाला खुला डिजिटल नागरिक शिकायत पोर्टल।",
          keyPromises: [
            "2028 तक नई दिल्ली सेंट्रल में 100% इलेक्ट्रिक बस कवरेज",
            "25,000 मध्यमवर्गीय परिवारों के लिए सब्सिडी वाले रूफटॉप सोलर",
            "सभी वार्ड फंडों के लिए खुली बजट नागरिक परिषदें",
            "सड़क किनारे पीवीसी फ्लैक्स चुनावी पोस्टरों पर पूर्ण प्रतिबंध",
          ],
        },
        kn: {
          aiSummary: "24 ತಿಂಗಳೊಳಗೆ 100% ವಿದ್ಯುತ್ ಸಾರ್ವಜನಿಕ ಸಾರಿಗೆ, ಸರ್ಕಾರಿ ಖರೀದಿಯಲ್ಲಿ ಪ್ಲಾಸ್ಟಿಕ್ ನಿರ್ಮೂಲನೆ, 15 ವಾರ್ಡ್‌ಗಳಲ್ಲಿ ವಾಯು ಮಾಲಿನ್ಯ ಮಾನಿಟರ್‌ಗಳು ಮತ್ತು 48 ಗಂಟೆಗಳಲ್ಲಿ ಪರಿಹಾರ ನೀಡುವ ಡಿಜಿಟಲ್ ಪೋರ್ಟಲ್.",
          keyPromises: [
            "2028 ರ ವೇಳೆಗೆ 100% ಎಲೆಕ್ಟ್ರಿಕ್ ಬಸ್ ಸೇವೆ",
            "25,000 ಕುಟುಂಬಗಳಿಗೆ ಸಬ್ಸಿಡಿ ರೂಫ್‌ಟಾಪ್ ಸೌರಶಕ್ತಿ",
            "ಮುಕ್ತ ಆಯವ್ಯಯ ನಾಗರಿಕ ಸಮಿತಿಗಳು",
            "ಪ್ಲಾಸ್ಟಿಕ್ ಪೋಸ್ಟರ್‌ಗಳ ಮೇಲೆ ಸಂಪೂರ್ಣ ನಿಷೇಧ",
          ],
        },
        mr: {
          aiSummary: "24 महिन्यांत 100% इलेक्ट्रिक सार्वजनिक वाहतूक, सरकारी खरेदीत प्लास्टिक बंदी, सर्व 15 प्रभागांत हवेची गुणवत्ता तपासणी यंत्रणा आणि 48 तासांत निवारण होणारे तक्रार निवारण पोर्टल.",
          keyPromises: [
            "2028 पर्यंत 100% इलेक्ट्रिक बस सेवा",
            "25,000 कुटुंबांसाठी अनुदानित रूफटॉप सोलर",
            "प्रभाग निधीसाठी खुली अर्थसंकल्प नागरिक परिषद",
            "रस्त्यावरील पीव्हीसी फ्लेक्स पोस्टर्सवर पूर्ण बंदी",
          ],
        },
      },
      categoryBreakdown: [
        {
          category: "Green & Climate",
          promise: "Deploy 200 micro-wetlands and urban forestry patches to slash summer heat island effect by 3°C.",
          timeline: "Year 1-2",
          budgetAllocation: "₹85 Crore",
        },
        {
          category: "Healthcare",
          promise: "Upgrade 12 community health clinics with 24/7 diagnostic labs and free respiratory health checkups.",
          timeline: "Year 1",
          budgetAllocation: "₹42 Crore",
        },
        {
          category: "Economy & Jobs",
          promise: "Green tech incubator providing 5,000 local youth apprenticeships in EV battery repair and solar maintenance.",
          timeline: "Year 2-3",
          budgetAllocation: "₹30 Crore",
        },
        {
          category: "Education",
          promise: "Solar-powered smart classrooms and digital libraries across 40 public schools.",
          timeline: "Immediate",
          budgetAllocation: "₹25 Crore",
        },
      ],
      language: "en",
      uploadedAt: "2026-02-28T14:20:00Z",
    },
  },
  {
    id: "cand-vikram-singh",
    fullName: "Vikramaditya Singh",
    partyId: "party-pca",
    party: PARTIES[1],
    constituencyId: "const-delhi-central",
    constituencyName: "New Delhi Central",
    electionId: "elec-2026-gen",
    electionYear: 2026,
    bio: "Former civil service officer and urban infrastructure planner advocating for high-speed transit, ease of business for small traders, and AI-driven civic grievance tracking.",
    education: "Master of Public Administration (St. Stephen's / Harvard Kennedy)",
    age: 52,
    criminalCases: 0,
    assetsDeclared: 38200000,
    liabilitiesDeclared: 5400000,
    affidavitUrl: "https://eci.gov.in/affidavits/vikram-singh-2026.pdf",
    profilePhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    socialLinks: {
      twitter: "@VikramSinghPCA",
      website: "https://vikramaditya.in",
    },
    verificationStatus: "VERIFIED",
    verifiedBy: "Election Commission Officer (DL-HQ-01)",
    verifiedAt: "2026-03-10T16:00:00Z",
    qrCodeId: "qr-vikram-01",
    manifesto: {
      id: "man-vikram-01",
      candidateId: "cand-vikram-singh",
      electionId: "elec-2026-gen",
      title: "Vibrant Capital: Infrastructure, Commerce & Integrity",
      pdfUrl: "https://raw.githubusercontent.com/smart-voter/sample-docs/main/manifesto-vikram.pdf",
      pageCount: 24,
      aiSummary: "Focuses on revitalizing commercial hubs (Connaught Place, Karol Bagh), introducing digital single-window permits for retail merchants, modernizing drainage pipelines, and implementing transparent municipal accounting.",
      keyPromises: [
        "Single-window digital trade license within 3 working days",
        "Underground storm-water drainage overhaul to eliminate monsoon waterlogging",
        "Zero corruption guarantee with blockchain-verified municipal contracts",
        "Public Wi-Fi and digital study corridors in 18 metro stations",
      ],
      translations: {
        en: {
          aiSummary: "Focuses on revitalizing commercial hubs (Connaught Place, Karol Bagh), introducing digital single-window permits for retail merchants, modernizing drainage pipelines, and implementing transparent municipal accounting.",
          keyPromises: [
            "Single-window digital trade license within 3 working days",
            "Underground storm-water drainage overhaul to eliminate monsoon waterlogging",
            "Zero corruption guarantee with blockchain-verified municipal contracts",
            "Public Wi-Fi and digital study corridors in 18 metro stations",
          ],
        },
        hi: {
          aiSummary: "कनॉट प्लेस और करोल बाग जैसे व्यापारिक केंद्रों का पुनरुद्धार, खुदरा व्यापारियों के लिए 3 दिन में सिंगल-विंडो डिजिटल लाइसेंस, जलभराव रोकने के लिए भूमिगत जल निकासी का आधुनिकीकरण, और पारदर्शी नगरपालिका लेखा।",
          keyPromises: [
            "खुदरा व्यापारियों के लिए 3 दिनों के भीतर डिजिटल व्यापार लाइसेंस",
            "मानसून के जलभराव को खत्म करने के लिए भूमिगत जल निकासी ओवरहाल",
            "नगरपालिका अनुबंधों में शून्य भ्रष्टाचार गारंटी",
            "18 मेट्रो स्टेशनों में मुफ्त सार्वजनिक वाई-फाई और डिजिटल स्टडी कॉरिडोर",
          ],
        },
        kn: {
          aiSummary: "ವಾಣಿಜ್ಯ ಕೇಂದ್ರಗಳ ಪುನರುಜ್ಜೀವನ, ಚಿಲ್ಲರೆ ವ್ಯಾಪಾರಿಗಳಿಗೆ ಏಕ-ಗವಾಕ್ಷಿ ಡಿಜಿಟಲ್ ಪರವಾನಗಿ ಮತ್ತು ಒಳಚರಂಡಿ ನವೀಕರಣ.",
          keyPromises: [
            "3 ದಿನಗಳಲ್ಲಿ ಡಿಜಿಟಲ್ ವ್ಯಾಪಾರ ಪರವಾನಗಿ",
            "ಮಳೆಗಾಲದ ಪ್ರವಾಹ ತಡೆಯಲು ಭೂಗತ ಚರಂಡಿ ನವೀಕರಣ",
            "18 ಮೆಟ್ರೋ ನಿಲ್ದಾಣಗಳಲ್ಲಿ ಸಾರ್ವಜನಿಕ ವೈ-ಫೈ",
          ],
        },
        mr: {
          aiSummary: "व्यापारी केंद्रांचे पुनरुज्जीवन, किरकोळ व्यापाऱ्यांसाठी सिंगल-विंडो डिजिटल परवाना आणि भूमिगत गटार योजनेचे आधुनिकीकरण.",
          keyPromises: [
            "3 दिवसांत डिजिटल व्यापार परवाना",
            "पावसाळ्यातील पाणी साचणे रोखण्यासाठी भूमिगत गटार सुधारणा",
            "18 मेट्रो स्थानकांवर सार्वजनिक वाय-फाय",
          ],
        },
      },
      categoryBreakdown: [
        {
          category: "Economy & Jobs",
          promise: "Creation of 15,000 MSME logistics jobs through modernized trade corridors and lower municipal compliance taxes.",
          timeline: "Year 1-2",
          budgetAllocation: "₹120 Crore",
        },
        {
          category: "Infrastructure",
          promise: "Automated multilevel parking systems at 8 congested central markets.",
          timeline: "Year 2",
          budgetAllocation: "₹150 Crore",
        },
      ],
      language: "en",
      uploadedAt: "2026-03-01T09:15:00Z",
    },
  },
  {
    id: "cand-kavya-reddy",
    fullName: "Kavya N. Reddy",
    partyId: "party-nrp",
    party: PARTIES[3],
    constituencyId: "const-blr-south",
    constituencyName: "Bengaluru South",
    electionId: "elec-2026-gen",
    electionYear: 2026,
    bio: "Deep-tech entrepreneur and urban transit reformer who co-founded two clean mobility startups. Focused on lake rejuvenation, rapid metro connectivity, and transparent citizen budgets.",
    education: "B.Tech Computer Science (NITK Surathkal), MBA (INSEAD)",
    age: 39,
    criminalCases: 0,
    assetsDeclared: 78000000,
    liabilitiesDeclared: 12000000,
    affidavitUrl: "https://eci.gov.in/affidavits/kavya-reddy-2026.pdf",
    profilePhotoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    socialLinks: {
      twitter: "@KavyaReddyNRP",
      website: "https://kavyareddy.org",
      linkedin: "linkedin.com/in/kavya-reddy-blr",
    },
    verificationStatus: "VERIFIED",
    verifiedBy: "Election Commission Officer (KA-BLR-01)",
    verifiedAt: "2026-03-08T09:00:00Z",
    qrCodeId: "qr-kavya-01",
    manifesto: {
      id: "man-kavya-01",
      candidateId: "cand-kavya-reddy",
      electionId: "elec-2026-gen",
      title: "Bengaluru 2030: Tech, Transit & Clean Waterways",
      pdfUrl: "https://raw.githubusercontent.com/smart-voter/sample-docs/main/manifesto-kavya.pdf",
      pageCount: 30,
      aiSummary: "Comprehensive 10-point roadmap to fix South Bengaluru's traffic bottlenecks via synchronized AI traffic signals, restore 7 dying lakes into biodiversity parks, and guarantee 24/7 piped Cauvery water to peripheral wards.",
      keyPromises: [
        "Sync 120 traffic junctions with AI adaptive traffic control system",
        "Restore Bellandur and Sarakki feeder lakes with tertiary treatment plants",
        "Last-mile feeder electric buses connecting every metro station",
        "Zero-paper municipal clearances via decentralized citizen digital portal",
      ],
      translations: {
        en: {
          aiSummary: "Comprehensive 10-point roadmap to fix South Bengaluru's traffic bottlenecks via synchronized AI traffic signals, restore 7 dying lakes into biodiversity parks, and guarantee 24/7 piped Cauvery water to peripheral wards.",
          keyPromises: [
            "Sync 120 traffic junctions with AI adaptive traffic control system",
            "Restore Bellandur and Sarakki feeder lakes with tertiary treatment plants",
            "Last-mile feeder electric buses connecting every metro station",
            "Zero-paper municipal clearances via decentralized citizen digital portal",
          ],
        },
        kn: {
          aiSummary: "ದಕ್ಷಿಣ ಬೆಂಗಳೂರಿನ ಸಂಚಾರ ದಟ್ಟಣೆಯನ್ನು ಎಐ ಸಿಗ್ನಲ್‌ಗಳ ಮೂಲಕ ನಿವಾರಿಸುವುದು, 7 ಕೆರೆಗಳ ಪುನಶ್ಚೇತನ, ಪ್ರತಿ ಮೆಟ್ರೋ ನಿಲ್ದಾಣಕ್ಕೆ ಫೀಡರ್ ಬಸ್ ಮತ್ತು ಕಾವೇರಿ ನೀರಿನ ಸಮರ್ಪಕ ಪೂರೈಕೆ.",
          keyPromises: [
            "120 ಸಂಚಾರ ಜಂಕ್ಷನ್‌ಗಳನ್ನು AI ಟ್ರಾಫಿಕ್ ಕಂಟ್ರೋಲ್ ಮೂಲಕ ಸಿಂಕ್ ಮಾಡುವುದು",
            "ಬೆಳ್ಳಂದೂರು ಮತ್ತು ಸರಕ್ಕಿ ಕೆರೆಗಳ ಪುನರುಜ್ಜೀವನ",
            "ಪ್ರತಿ ಮೆಟ್ರೋ ನಿಲ್ದಾಣಕ್ಕೂ ಕೊನೆಯ ಹಂತದ ಎಲೆಕ್ಟ್ರಿಕ್ ಫೀಡರ್ ಬಸ್‌ಗಳು",
            "ಕಾಗದರಹಿತ ನಾಗರಿಕ ಸೇವೆಗಳ ಪೋರ್ಟಲ್",
          ],
        },
        hi: {
          aiSummary: "बेंगलुरु साउथ के ट्रैफिक को एआई सिग्नल सिस्टम से ठीक करना, 7 झीलों का पुनरुद्धार और मेट्रो स्टेशनों से लास्ट-माइल इलेक्ट्रिक फीडर बसों का जाल।",
          keyPromises: [
            "120 ट्रैफिक जंक्शनों को AI सिग्नल से जोड़ना",
            "झील पुनरुद्धार एवं जल संरक्षण परियोजना",
            "हर मेट्रो स्टेशन के लिए लास्ट-माइल ई-बस सेवा",
          ],
        },
        mr: {
          aiSummary: "बेंगळुरूच्या वाहतूक कोंडीवर एआय सिग्नलद्वारे मात, 7 तलावांचे पुनरुज्जीवन आणि शेवटच्या टोकापर्यंत इलेक्ट्रिक फीडर बसेस.",
          keyPromises: [
            "120 चौकांमध्ये एआय ट्रॅफिक व्यवस्था",
            "तलाव पुनरुज्जीवन प्रकल्प",
            "मेट्रोसाठी ई-बस फीडर सेवा",
          ],
        },
      },
      categoryBreakdown: [
        {
          category: "Infrastructure",
          promise: "Double suburban rail & metro feeder integration across Bannerghatta & Kanakapura corridors.",
          timeline: "Year 1-2",
          budgetAllocation: "₹350 Crore",
        },
      ],
      language: "en",
      uploadedAt: "2026-03-03T11:00:00Z",
    },
  },
  {
    id: "cand-rajesh-shukla",
    fullName: "Rajeshwar Shukla",
    partyId: "party-dpf",
    party: PARTIES[2],
    constituencyId: "const-delhi-central",
    constituencyName: "New Delhi Central",
    electionId: "elec-2026-gen",
    electionYear: 2026,
    bio: "Grassroots union organizer and social advocate focusing on affordable rental housing for migrant workers, unorganized labor social security, and subsidized government rationing.",
    education: "B.A. Political Science (Delhi University)",
    age: 48,
    criminalCases: 1,
    criminalCasesDetails: "Section 143/188 IPC (Peaceful demonstration without prior permit during 2021 labor union march; no violent charges).",
    assetsDeclared: 4800000,
    liabilitiesDeclared: 450000,
    affidavitUrl: "https://eci.gov.in/affidavits/rajesh-shukla-2026.pdf",
    profilePhotoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    socialLinks: {
      twitter: "@RajeshShuklaDPF",
    },
    verificationStatus: "VERIFIED",
    verifiedBy: "Election Commission Officer (DL-North-04)",
    verifiedAt: "2026-03-14T11:45:00Z",
    qrCodeId: "qr-rajesh-01",
    manifesto: {
      id: "man-rajesh-01",
      candidateId: "cand-rajesh-shukla",
      electionId: "elec-2026-gen",
      title: "People's Rights First: Housing, Health & Labor Dignity",
      pdfUrl: "https://raw.githubusercontent.com/smart-voter/sample-docs/main/manifesto-rajesh.pdf",
      pageCount: 14,
      aiSummary: "Targets social safety nets for gig-economy workers, street vendor protection against extortion, construction worker pensions, and price controls on essential life-saving medicines.",
      keyPromises: [
        "Gig workers & delivery rider welfare board with accident insurance",
        "Legal vending zones for 10,000 registered street hawkers",
        "Free potable drinking water dispensing kiosks in all transit clusters",
        "Universal health coverage vouchers for unorganized laborers",
      ],
      translations: {
        en: {
          aiSummary: "Targets social safety nets for gig-economy workers, street vendor protection against extortion, construction worker pensions, and price controls on essential life-saving medicines.",
          keyPromises: [
            "Gig workers & delivery rider welfare board with accident insurance",
            "Legal vending zones for 10,000 registered street hawkers",
            "Free potable drinking water dispensing kiosks in all transit clusters",
            "Universal health coverage vouchers for unorganized laborers",
          ],
        },
        hi: {
          aiSummary: "गिग इकॉनॉमी और डिलीवरी कर्मचारियों के लिए सामाजिक सुरक्षा जाल, 10,000 स्ट्रीट वेंडर्स के लिए कानूनी वेंडिंग जोन, और असंगठित मजदूरों के लिए दुर्घटना बीमा।",
          keyPromises: [
            "गिग वर्कर्स और डिलीवरी राइडर्स के लिए वेलफेयर बोर्ड और 5 लाख का बीमा",
            "10,000 पंजीकृत स्ट्रीट वेंडर्स के लिए कानूनी सुरक्षित क्षेत्र",
            "सभी बस/मेट्रो स्टॉप पर मुफ्त पीने के पानी के कियोस्क",
            "असंगठित मजदूरों के लिए मुफ्त स्वास्थ्य सेवा वाउचर",
          ],
        },
        kn: {
          aiSummary: "ಗಿಗ್ ಕಾರ್ಮಿಕರಿಗೆ ಅಪಘಾತ ವಿಮೆ ಮತ್ತು ಬೀದಿ ವ್ಯಾಪಾರಿಗಳಿಗೆ ಕಾನೂನು ರಕ್ಷಣೆ ಒದಗಿಸುವ ಜನಪರ ನೀತಿ.",
          keyPromises: [
            "ಗಿಗ್ ಕಾರ್ಮಿಕರ ಕಲ್ಯಾಣ ಮಂಡಳಿ ಮತ್ತು ವಿಮೆ",
            "10,000 ಬೀದಿ ವ್ಯಾಪಾರಿಗಳಿಗೆ ಅಧಿಕೃತ ವಲಯ",
          ],
        },
        mr: {
          aiSummary: "गिग वर्कर्स आणि डिलिव्हरी रायडर्ससाठी कल्याणकारी मंडळ आणि फेरीवाल्यांना संरक्षण देणारी धोरणे.",
          keyPromises: [
            "डिलिव्हरी कर्मचाऱ्यांसाठी 5 लाखांचे अपघात विमा संरक्षण",
            "फेरीवाल्यांसाठी अधिकृत विक्री झोन",
          ],
        },
      },
      categoryBreakdown: [
        {
          category: "Healthcare",
          promise: "Universal emergency trauma care fund covering unorganized workers up to ₹5 Lakh.",
          timeline: "Year 1",
          budgetAllocation: "₹60 Crore",
        },
      ],
      language: "en",
      uploadedAt: "2026-03-02T16:00:00Z",
    },
  },
];

export const CIVIC_ISSUES: CivicIssue[] = [
  {
    id: "issue-1",
    constituencyId: "const-delhi-central",
    title: "Severe Winter Air Smog & Lack of Ward Mist Sprinklers",
    category: "Pollution & Waste",
    description: "AQI crosses 450 every November. We urgently need localized smog mist cannons at Karol Bagh and Daryaganj markets, plus night mechanical road sweeping.",
    location: "Karol Bagh & Pusa Road Junction",
    upvotes: 384,
    status: "PLEDGED_BY_CANDIDATES",
    pledgedCandidateNames: ["Dr. Aranya Sharma", "Vikramaditya Singh"],
    createdAt: "2026-03-01T10:00:00Z",
  },
  {
    id: "issue-2",
    constituencyId: "const-delhi-central",
    title: "Monsoon Waterlogging Under Minto Bridge",
    category: "Roads & Transit",
    description: "Every rainy season, vehicles submerge under Minto Bridge. Requires high-capacity submersible automated stormwater pumps with dedicated generator backup.",
    location: "Minto Bridge Underpass, Connaught Place",
    upvotes: 512,
    status: "PLEDGED_BY_CANDIDATES",
    pledgedCandidateNames: ["Vikramaditya Singh"],
    createdAt: "2026-03-02T11:30:00Z",
  },
  {
    id: "issue-3",
    constituencyId: "const-blr-south",
    title: "Dangerous Potholes on Bannerghatta Main Road",
    category: "Roads & Transit",
    description: "Unfinished metro pillar work has left deep craters causing two-wheeler accidents daily. Needs cold-mix asphalt resurfacing before monsoon.",
    location: "Bannerghatta Road, Near Arekere Junction",
    upvotes: 620,
    status: "PLEDGED_BY_CANDIDATES",
    pledgedCandidateNames: ["Kavya N. Reddy"],
    createdAt: "2026-03-03T09:15:00Z",
  },
  {
    id: "issue-4",
    constituencyId: "const-blr-south",
    title: "Sarakki Lake Sewage Inflow & Fish Die-Off",
    category: "Clean Water",
    description: "Untreated residential sewage enters the lake from storm drains. We demand a 5 MLD decentralized sewage treatment plant.",
    location: "Sarakki Lake South Embankment, JP Nagar",
    upvotes: 440,
    status: "PLEDGED_BY_CANDIDATES",
    pledgedCandidateNames: ["Kavya N. Reddy"],
    createdAt: "2026-03-04T14:20:00Z",
  },
];

export const SAMPLE_VOTER_SLIPS: VoterSlip[] = [
  {
    voterEpicNumber: "DEL-894210",
    voterName: "Aman Sharma",
    constituencyName: "New Delhi Central (DL-04)",
    partNumber: "04/012",
    serialNumber: "384",
    pollingStationName: "Govt Boys Senior Secondary School",
    pollingStationAddress: "Mandir Marg, Near Gole Market, New Delhi 110001",
    electionDate: "Sunday, April 19, 2026",
    votingHours: "07:00 AM - 06:00 PM IST",
    qrPayload: "EPIC:DEL-894210|PART:04/012|SER:384|BOOTH:04/012",
  },
  {
    voterEpicNumber: "KA-410982",
    voterName: "Priya Rao",
    constituencyName: "Bengaluru South (KA-26)",
    partNumber: "26/045",
    serialNumber: "142",
    pollingStationName: "BBMP Model Primary School",
    pollingStationAddress: "9th Main, Jayanagar 4th Block, Bengaluru 560011",
    electionDate: "Sunday, April 19, 2026",
    votingHours: "07:00 AM - 06:00 PM IST",
    qrPayload: "EPIC:KA-410982|PART:26/045|SER:142|BOOTH:26/045",
  },
];

class DataStore {
  private candidates: Candidate[] = [...CANDIDATES];
  private constituencies: Constituency[] = [...CONSTITUENCIES];
  private parties: Party[] = [...PARTIES];
  private issues: CivicIssue[] = [...CIVIC_ISSUES];
  private voterSlips: VoterSlip[] = [...SAMPLE_VOTER_SLIPS];

  private totalScans = 12520;
  private totalPaperSaved = 58400;

  getEcoStats(): EcoImpactStats {
    return {
      paperPostersSaved: this.totalPaperSaved,
      treesPreserved: Math.round((this.totalPaperSaved / 1250) * 10) / 10,
      co2PreventedKg: Math.round(this.totalPaperSaved * 0.12 * 10) / 10,
      plasticFlexAvoidedKg: Math.round(this.totalPaperSaved * 0.08 * 10) / 10,
      waterSavedLiters: Math.round(this.totalPaperSaved * 10),
    };
  }

  getConstituencies(): Constituency[] {
    return this.constituencies;
  }

  getParties(): Party[] {
    return this.parties;
  }

  getCandidates(filter?: { constituencyId?: string; partyId?: string; status?: string }): Candidate[] {
    return this.candidates.filter((c) => {
      if (filter?.constituencyId && c.constituencyId !== filter.constituencyId) return false;
      if (filter?.partyId && c.partyId !== filter.partyId) return false;
      if (filter?.status && c.verificationStatus !== filter.status) return false;
      return true;
    });
  }

  getCandidateById(id: string): Candidate | undefined {
    return this.candidates.find((c) => c.id === id);
  }

  findConstituencyByLocation(lat?: number, lng?: number, pincode?: string): Constituency | undefined {
    if (pincode) {
      const found = this.constituencies.find((c) => c.pincodes.includes(pincode));
      if (found) return found;
    }

    if (lat !== undefined && lng !== undefined) {
      const found = this.constituencies.find(
        (c) =>
          lat >= c.bounds.minLat &&
          lat <= c.bounds.maxLat &&
          lng >= c.bounds.minLng &&
          lng <= c.bounds.maxLng
      );
      if (found) return found;

      let closest = this.constituencies[0];
      let minDistance = Infinity;
      for (const c of this.constituencies) {
        const centerLat = (c.bounds.minLat + c.bounds.maxLat) / 2;
        const centerLng = (c.bounds.minLng + c.bounds.maxLng) / 2;
        const dist = Math.hypot(lat - centerLat, lng - centerLng);
        if (dist < minDistance) {
          minDistance = dist;
          closest = c;
        }
      }
      return closest;
    }

    return this.constituencies[0];
  }

  // Civic Issues Tracker
  getCivicIssues(constituencyId?: string): CivicIssue[] {
    if (constituencyId) {
      return this.issues.filter((i) => i.constituencyId === constituencyId);
    }
    return this.issues;
  }

  upvoteIssue(issueId: string): CivicIssue | null {
    const issue = this.issues.find((i) => i.id === issueId);
    if (!issue) return null;
    issue.upvotes += 1;
    return issue;
  }

  createCivicIssue(newIssue: { constituencyId: string; title: string; category: any; description: string; location: string }): CivicIssue {
    const created: CivicIssue = {
      id: `issue-${Date.now()}`,
      constituencyId: newIssue.constituencyId,
      title: newIssue.title,
      category: newIssue.category,
      description: newIssue.description,
      location: newIssue.location,
      upvotes: 1,
      status: "REPORTED",
      pledgedCandidateNames: [],
      createdAt: new Date().toISOString(),
    };
    this.issues.unshift(created);
    return created;
  }

  // Digital Voter Slip
  lookupVoterSlip(query: string): VoterSlip | null {
    const q = query.trim().toUpperCase();
    const found = this.voterSlips.find(
      (v) => v.voterEpicNumber.toUpperCase() === q || v.voterName.toUpperCase().includes(q)
    );
    if (found) return found;

    // Create a dynamic valid voter slip for demo if not found
    const fallback: VoterSlip = {
      voterEpicNumber: q.length >= 6 ? q : `IND-${Math.floor(100000 + Math.random() * 900000)}`,
      voterName: query.length > 2 ? query : "Citizen Voter",
      constituencyName: "New Delhi Central (DL-04)",
      partNumber: "04/012",
      serialNumber: `${Math.floor(100 + Math.random() * 800)}`,
      pollingStationName: "Govt Boys Senior Secondary School",
      pollingStationAddress: "Mandir Marg, Near Gole Market, New Delhi 110001",
      electionDate: "Sunday, April 19, 2026",
      votingHours: "07:00 AM - 06:00 PM IST",
      qrPayload: `EPIC:${q}|BOOTH:04/012|VERIFIED_CITIZEN_2026`,
    };
    this.voterSlips.push(fallback);
    return fallback;
  }

  verifyCandidate(candidateId: string, status: "VERIFIED" | "REJECTED", officerName: string, reason?: string): Candidate | null {
    const candidate = this.candidates.find((c) => c.id === candidateId);
    if (!candidate) return null;
    candidate.verificationStatus = status;
    candidate.verifiedBy = officerName;
    candidate.verifiedAt = new Date().toISOString();
    return candidate;
  }

  addCandidate(newCandidate: Partial<Candidate>): Candidate {
    const party = this.parties.find((p) => p.id === newCandidate.partyId) || this.parties[0];
    const constObj = this.constituencies.find((c) => c.id === newCandidate.constituencyId) || this.constituencies[0];

    const candidate: Candidate = {
      id: `cand-${Date.now()}`,
      fullName: newCandidate.fullName || "New Candidate",
      partyId: party.id,
      party,
      constituencyId: constObj.id,
      constituencyName: constObj.name,
      electionId: "elec-2026-gen",
      electionYear: 2026,
      bio: newCandidate.bio || "",
      education: newCandidate.education || "Graduate",
      age: newCandidate.age || 35,
      criminalCases: newCandidate.criminalCases || 0,
      criminalCasesDetails: newCandidate.criminalCasesDetails || "",
      assetsDeclared: newCandidate.assetsDeclared || 0,
      liabilitiesDeclared: newCandidate.liabilitiesDeclared || 0,
      affidavitUrl: newCandidate.affidavitUrl || "https://eci.gov.in/affidavits/sample.pdf",
      profilePhotoUrl: newCandidate.profilePhotoUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
      socialLinks: newCandidate.socialLinks || {},
      verificationStatus: "PENDING_VERIFICATION",
      manifesto: newCandidate.manifesto,
    };

    this.candidates.unshift(candidate);
    return candidate;
  }

  resolveQrCode(codeHash: string): { candidate: Candidate | undefined; qrCode: CampaignQrCode | undefined } {
    const normalized = codeHash.trim().toUpperCase();
    const candidate = this.candidates.find(
      (c) =>
        c.id.toUpperCase() === normalized ||
        (c.qrCodeId && c.qrCodeId.toUpperCase() === normalized) ||
        normalized.includes(c.party.abbreviation.toUpperCase()) ||
        c.fullName.toUpperCase().includes(normalized)
    );

    this.totalScans += 1;
    this.totalPaperSaved += 2;

    return {
      candidate: candidate || this.candidates[0],
      qrCode: {
        id: `qr-${Date.now()}`,
        codeHash: normalized,
        candidateId: candidate ? candidate.id : this.candidates[0].id,
        candidateName: candidate ? candidate.fullName : this.candidates[0].fullName,
        partyAbbr: candidate ? candidate.party.abbreviation : "GFA",
        locationLabel: "Roadside Eco-Booth Stand",
        scanCount: 1,
        paperPostersSaved: 2,
        createdAt: new Date().toISOString(),
      },
    };
  }

  createQrCode(candidateId: string, locationLabel: string): CampaignQrCode {
    const candidate = this.candidates.find((c) => c.id === candidateId);
    const codeHash = `${candidate ? candidate.party.abbreviation : "IND"}-${Date.now().toString(36).toUpperCase()}`;
    const newQr: CampaignQrCode = {
      id: `qr-${Date.now()}`,
      codeHash,
      candidateId,
      candidateName: candidate ? candidate.fullName : "Candidate",
      partyAbbr: candidate ? candidate.party.abbreviation : "IND",
      locationLabel,
      scanCount: 0,
      paperPostersSaved: 0,
      createdAt: new Date().toISOString(),
    };
    return newQr;
  }

  getAllQrCodes(): CampaignQrCode[] {
    return [];
  }
}

const globalForStore = globalThis as unknown as { store: DataStore };
export const dataStore = globalForStore.store || new DataStore();
if (process.env.NODE_ENV !== "production") globalForStore.store = dataStore;
