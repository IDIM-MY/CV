/**
 * ISHAN MADUSHANKA - PORTFOLIO DATA STORE
 * All portfolio content is managed here for easy editing.
 * Strictly adheres to privacy guidelines (public-safe data only).
 */

export const portfolioData = {
  personal: {
    fullName: "I.D. Ishan Madushanka",
    shortName: "Ishan",
    lastName: "Madushanka",
    title: "Technology Stream Graduate & Certified Technical Professional",
    subtitles: [
      "Aluminium Fabricator",
      "RAC Technician",
      "Web & Graphic Designer"
    ],
    badge: "Welcome to my Portfolio 👋",
    location: "Thelwatta, Galle, Sri Lanka",
    phones: ["+94 72 333 1165", "+94 75 129 6509"],
    email: "idishanmadushanka@gmail.com",
    cvPath: "assets/cv/Ishan_Madushanka_CV.pdf",
    
    // Social Links
    socials: {
      linkedin: "https://linkedin.com/in/ishan-madushanka",
      github: "https://github.com/ishan-madushanka",
      facebook: "https://www.facebook.com/share/1CCkCez8CA/",
      whatsapp: "https://wa.me/94723331165?text=Hello%20Ishan,%20I%20viewed%20your%20portfolio%20and%20would%20like%20to%20connect!"
    },

    objective: "A technology stream graduate and NVQ Level 4 certified technician skilled in mechanical and structural fabrication. Adept at systematic troubleshooting and eager to contribute hands-on expertise to a high-performance team.",
    aboutText: "I am passionate about technology, design and innovation; always eager to learn new skills and take on challenges. My journey connects precision engineering — from architectural aluminium fabrication and Refrigeration & Air Conditioning (RAC) — to creative digital design and modern web development.",
    signature: "Ishan Madushanka"
  },

  // Editable Stats (Real & Truthful)
  stats: [
    { label: "Awards & Honors", value: 5, suffix: "+", icon: "trophy" },
    { label: "Featured Projects", value: 4, suffix: "+", icon: "laptop" },
    { label: "Experience & Training", value: 2, suffix: "+ Years", icon: "briefcase" }
  ],

  // Education Timeline
  education: [
    {
      degree: "G.C.E. Advanced Level (A/L) – Engineering Technology Stream",
      institution: "G/Sri Sumangala National School, Hikkaduwa",
      period: "2025",
      badge: "Completed",
      details: [
        "Engineering Technology: C",
        "Science for Technology: C",
        "Information & Communication Technology (ICT): S",
        "General Information Technology (GIT): A"
      ],
      icon: "graduation-scroll"
    },
    {
      degree: "G.C.E. Ordinary Level (O/L)",
      institution: "G/Weragoda Vijayaba Maha Vidyalaya, Weragoda",
      period: "Jan 2021 – Dec 2022",
      badge: "Completed",
      details: [
        "Mathematics: A",
        "Buddhism: B",
        "History: B",
        "Design & Construction Technology: B",
        "Dancing (Oriental): B",
        "Science: C",
        "Sinhala Language & Literature: C",
        "Business & Accounting Studies: C",
        "English Language: S"
      ],
      icon: "graduation-scroll"
    },
    {
      degree: "NVQ Level 4 – Aluminium Fabricator (Certified)",
      institution: "Vocational Training Center (VTA) – Hikkaduwa",
      period: "July 2023 – Jan 2024",
      badge: "NVQ Level 4 Certified",
      details: [
        "Architectural aluminium frame drafting, site measurement & calculation",
        "Precision cutting, structural fabrication and hardware fitting",
        "Casement & sliding window assemblies, commercial partition installations",
        "Industrial quality control, safety procedures and scrap minimization"
      ],
      icon: "window-frame"
    },
    {
      degree: "NVQ Level 4 – Refrigeration & Air Conditioning (RAC) Technician",
      institution: "College of Technology – Galle",
      period: "Jan 2026 – Dec 2026",
      badge: "Currently Following",
      details: [
        "Thermodynamic refrigeration cycle and heat pump diagnostics",
        "Split & inverter air conditioning system installation & servicing",
        "Safe handling of flammable refrigerants (R32 / R290)",
        "System evacuation, recovery, manifold pressure testing & gas charging"
      ],
      icon: "ac-unit"
    }
  ],

  // Experience Timeline
  experience: [
    {
      role: "Trainee Aluminium Fabricator",
      company: "Mr. Kumara Aluminium Workshop, Elpitiya",
      period: "Jan 2024 – June 2024",
      type: "Work Experience",
      description: "Hands-on architectural fabrication and installation of bespoke aluminium structures for residential and commercial clients.",
      highlights: [
        "Performed precision measurement, mitering, and corner assembly using pneumatic crimpers and punchers.",
        "Fabricated sliding doors, casement windows, louvers, and curtain wall sections.",
        "Conducted on-site installations, structural leveling, and acoustic/weather seal adjustments.",
        "Maintained safe workshop protocol and reduced material waste through optimized cutting layouts."
      ],
      icon: "window-frame"
    },
    {
      role: "RAC Technical Training & Flammable Refrigerants Workshop",
      company: "College of Technology – Galle",
      period: "Nov 2026",
      type: "Technical Workshop & Training",
      description: "Advanced workshop on good practices in refrigeration, inverter AC maintenance, and eco-friendly flammable refrigerants.",
      highlights: [
        "Practical training on recovery procedures and leak detection in modern split AC units.",
        "Compliance with international safety protocols for low-GWP refrigerants (R32 / hydrocarbon R290).",
        "Copper tube brazing, pipe flaring, swaging, and vacuum dehydration."
      ],
      icon: "gas-cylinder"
    }
  ],

  // Skills Data with Ring Percentages
  skills: {
    radialRings: [
      { name: "Fabrication & HVAC", percent: 95, color: "#4ECB8D", icon: "wrench" },
      { name: "Web Dev", percent: 90, color: "#3B82F6", icon: "code-brackets" },
      { name: "Design", percent: 85, color: "#8B7BFF", icon: "photoshop" },
      { name: "Multimedia", percent: 90, color: "#10B981", icon: "premiere-pro" }
    ],

    techLogos: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "JavaScript", icon: "javascript" },
      { name: "PHP", icon: "php" },
      { name: "Laravel", icon: "laravel" },
      { name: "WordPress", icon: "wordpress" }
    ],

    categories: [
      {
        title: "Aluminium Fabrication & HVAC",
        icon: "ac-unit",
        items: [
          "Site Measurement & Estimation",
          "Precision Profile Cutting & Jointing",
          "Casement & Sliding Windows/Doors",
          "Commercial Partitions & Shopfronts",
          "Split & Inverter RAC Maintenance",
          "Safe Gas Charging (R32 / R410A)",
          "Vacuuming, Leak Testing & Evacuation",
          "Safety Standards & Quality Control"
        ]
      },
      {
        title: "Web & Software Development",
        icon: "code-brackets",
        items: [
          "HTML5, CSS3, Flexbox & CSS Grid",
          "Modern JavaScript (ES6+ Modules)",
          "Three.js 3D Web Graphics",
          "GSAP & ScrollTrigger Animations",
          "PHP & MySQL Database Design",
          "Laravel MVC Architecture",
          "WordPress Custom Theme & CMS",
          "Python Scripting Fundamentals"
        ]
      },
      {
        title: "Graphic Design & Multimedia",
        icon: "photoshop",
        items: [
          "Adobe Photoshop (Photo Compositing & UI)",
          "Adobe Illustrator (Vector & Brand Identity)",
          "Adobe Premiere Pro (Video Editing & Color Grading)",
          "Motion Graphics & Visual Effects",
          "Digital Marketing Creatives",
          "Audio Mixing & Sound Synchronization"
        ]
      },
      {
        title: "Technical & IT Competencies",
        icon: "laptop",
        items: [
          "Microsoft Word & Technical Documentation",
          "Microsoft Excel (Costing Models & Formulas)",
          "Microsoft PowerPoint (Client Presentations)",
          "Hardware Diagnostics & Network Setup",
          "PC Assembly & Preventive Maintenance",
          "Git & GitHub Version Control"
        ]
      }
    ],

    expertiseChips: [
      "Management Skills",
      "Creativity",
      "Digital Marketing",
      "Negotiation",
      "Critical Thinking",
      "Teamwork & Leadership",
      "Blueprint Reading",
      "Precision Measuring"
    ]
  },

  // Certifications
  certificates: [
    {
      title: "WordPress Web Designing Master",
      issuer: "Skill Plus",
      year: "2026",
      grade: "Merit",
      desc: "Comprehensive mastery of responsive WordPress development, custom theme architectures, WooCommerce, and speed optimization.",
      icon: "wordpress"
    },
    {
      title: "Adobe Photoshop Basic to Advanced",
      issuer: "Master.lk",
      year: "2026",
      grade: "Merit",
      desc: "Advanced digital image retouching, color grading, raster masking, visual hierarchy, and photo-manipulation workflows.",
      icon: "photoshop"
    },
    {
      title: "Adobe Premiere Pro Basic to Advanced",
      issuer: "Master.lk",
      year: "2026",
      grade: "Merit",
      desc: "Video editing pipelines, multicam editing, audio mastering, lumetri color grading, and dynamic title effects.",
      icon: "premiere-pro"
    },
    {
      title: "Information & Communication Technology",
      issuer: "ICT Bootcamp – Ambalangoda",
      year: "2023",
      grade: "Grade: A+",
      desc: "Software architecture fundamentals, algorithmic logic, computer systems, and networking protocols.",
      icon: "laptop"
    },
    {
      title: "English for Career Skills",
      issuer: "Vocational Training Authority (VTA) – Hikkaduwa",
      year: "2023",
      grade: "Certified",
      desc: "Professional workplace communication, technical report writing, interview presentation, and technical English terminology.",
      icon: "graduation-scroll"
    },
    {
      title: "Web Development & Digital Marketing",
      issuer: "Foundation of Goodness",
      year: "2024",
      grade: "Merit",
      desc: "Full-cycle web creation, responsive layout design, SEO optimization, social media marketing campaigns, and analytics.",
      icon: "code-brackets"
    },
    {
      title: "Graphic Design (Photoshop & Illustrator)",
      issuer: "Foundation of Goodness",
      year: "2024",
      grade: "Certified",
      desc: "Visual branding, vector typography, packaging design, and visual communication principles.",
      icon: "illustrator"
    },
    {
      title: "Artificial Intelligence & Python Programming",
      issuer: "Foundation of Goodness",
      year: "2024",
      grade: "Good",
      desc: "Python programming structures, algorithmic logic, automated data scripting, and AI tool integration.",
      icon: "python"
    },
    {
      title: "Advanced MS Office Suite",
      issuer: "Foundation of Goodness",
      year: "2024",
      grade: "Good",
      desc: "Advanced Excel spreadsheet modeling, Word document automation, and PowerPoint presentation design.",
      icon: "briefcase"
    },
    {
      title: "Computer Hardware & Network Setup",
      issuer: "Foundation of Goodness",
      year: "2024",
      grade: "Satisfactory",
      desc: "PC hardware assembly, peripheral configuration, LAN cabling, switch setup, and troubleshooting.",
      icon: "circuit-chip"
    }
  ],

  // Awards & Activities
  awards: [
    {
      title: "Goodness Star Award",
      issuer: "Foundation of Goodness",
      date: "December 2024",
      desc: "Recognized for exemplary character, positive influence, community leadership, service, humility, and personal integrity.",
      icon: "trophy"
    },
    {
      title: "School Prefect Board Member",
      issuer: "Sri Sumangala National School",
      date: "2023 – 2025",
      desc: "Elected school leader responsible for maintaining student discipline, school event management, and peer mentorship.",
      icon: "trophy"
    },
    {
      title: "School Science Society Member",
      issuer: "Sri Sumangala National School",
      date: "2023 – 2025",
      desc: "Active participation in annual science exhibitions, technical workshops, and engineering innovation projects.",
      icon: "trophy"
    }
  ],

  // Projects Divided into 2 Equal Categories: Technical/NVQ & Digital/Design
  projects: [
    // ----------------------------------------------------
    // CATEGORY 1: TECHNICAL & NVQ CERTIFIED PROJECTS
    // ----------------------------------------------------
    {
      id: "electrolab",
      category: "technical",
      categoryLabel: "Technical & NVQ",
      title: "ElectroLab – 2D Electrical & HVAC Wiring Simulator",
      subtitle: "Interactive Circuit & HVAC Wiring Simulator (විදුලි හා HVAC පරිපථ 2D සිමියුලේටරය)",
      description: "A specialized browser-based interactive schematic simulator designed for electrical and RAC students to wire split-AC units, compressor relays, contactors, and thermostat controls safely.",
      longDescription: "ElectroLab was developed to bridge the gap between classroom theory and dangerous high-voltage electrical work in HVAC systems. Users can drag components (relays, dual capacitors, compressors, fan motors, thermostats), connect wires interactively, test circuits for short-circuits or open loops, and observe real-time voltage/current readouts in a safe virtual environment.",
      tech: ["HTML5 Canvas", "JavaScript (ES6+)", "CSS3 Glassmorphism", "Audio API"],
      role: "Lead Front-End Architect & Technical Designer",
      liveUrl: "https://rif-air.github.io/Rif-Air/",
      thumbnail: "assets/images/ai/AC.jpeg",
      features: [
        "Interactive drag-and-drop circuit components with realistic terminals",
        "HVAC dual capacitor and PSC compressor motor wiring simulations",
        "Dynamic live current flow animation with polarity checks",
        "Fault diagnosis simulator (blown capacitor, grounded compressor, stuck relay)"
      ]
    },
    {
      id: "rac-question-bank",
      category: "technical",
      categoryLabel: "Technical & NVQ",
      title: "RAC Diagnostic System & Refrigeration Practice Suite",
      subtitle: "NVQ Level 4 RAC Technical Platform",
      description: "A comprehensive diagnostic and technical revision application for Refrigeration & Air Conditioning technicians. Features interactive P-T pressure-temperature lookups, thermodynamic cycle calculators, and flammable refrigerant safety protocols.",
      longDescription: "Designed specifically for technicians and trainees pursuing NVQ Level 4 RAC certification. It features thermodynamic calculations, psychrometric conversions, R32/R290 flammable refrigerant safety guides, manifold pressure diagnostics, and system evacuation tracking.",
      tech: ["JavaScript", "HTML5 / CSS3", "Thermodynamic Formulas", "Local Storage", "PWA"],
      role: "Full-Stack Developer & Content Curator",
      liveUrl: "contact.html",
      thumbnail: "assets/images/ai/RAC.jpeg",
      features: [
        "Interactive Pressure-Temperature (P-T) chart lookup for R32, R410A, and R134a",
        "Superheat and subcooling diagnostic calculator for split inverter systems",
        "Flammable refrigerant (A2L / A3) charging guidelines and safety checklists",
        "Categorized troubleshooting guides for compressors, expansion valves, and coils"
      ]
    },
    {
      id: "aluminium-estimator",
      category: "technical",
      categoryLabel: "Technical & NVQ",
      title: "Aluminium Architectural Cut & Cost Estimator",
      subtitle: "NVQ Level 4 Automated Frame Fabrication Calculator",
      description: "A precision web utility for aluminium fabricators to compute required extrusion lengths, cutting waste optimization, glass pane dimensions, and estimated bill of materials (BOM).",
      longDescription: "Developed to automate the complex calculations involved in building casement and sliding aluminium windows. Fabricators input wall opening dimensions, and the tool outputs exact frame profile lengths, glass cut dimensions, rubber gasket allowances, and hardware quantities.",
      tech: ["HTML5", "CSS3", "JavaScript ES6", "SVG Vector Layout"],
      role: "Creator & Fabricator",
      liveUrl: "contact.html",
      thumbnail: "assets/images/ai/AL.jpeg",
      features: [
        "Automatic subtraction calculations for casement and sliding tracks",
        "1D bin-packing optimization to minimize 20-foot extrusion scrap",
        "Instant bill-of-quantities (BOQ) printable summary",
        "Pre-configured profiles for Sri Lankan standard aluminium series (100mm, 70mm, 45mm)"
      ]
    },

    // ----------------------------------------------------
    // CATEGORY 2: DIGITAL, SOFTWARE & DESIGN PROJECTS
    // ----------------------------------------------------
    {
      id: "art-flux-designer",
      category: "digital",
      categoryLabel: "Digital & Design",
      title: "ART FLUX DESIGNER – Premium Creative Solutions",
      subtitle: "Graphic Design Business, Branding & Visual Media Agency",
      description: "Founder and lead visual designer of Art Flux Designer, delivering high-impact corporate branding, vector logo creation, commercial print packages, social media advertising creatives, and UI design solutions.",
      longDescription: "Art Flux Designer is Ishan's professional creative design venture. Dedicated to elevating brands through cutting-edge visual identity systems, vector illustrations, typography hierarchy, social media marketing campaigns, and premium merchandise graphics. Demonstrates advanced mastery in Adobe Illustrator, Photoshop, and visual storytelling.",
      tech: ["Adobe Illustrator", "Adobe Photoshop", "Brand Strategy", "Digital Marketing", "Commercial Print"],
      role: "Founder & Creative Director",
      liveUrl: "https://art-flux.github.io/designer/",
      facebookUrl: "https://www.facebook.com/share/1CCkCez8CA/",
      thumbnail: "assets/images/ai/GD.jpeg",
      features: [
        "Complete corporate visual brand identities and vector logo guidelines",
        "High-conversion social media marketing graphics and banner suites",
        "Commercial print-ready packaging, brochures, and promotional materials",
        "Modern UI/UX concept designs and vector assets for web platforms"
      ]
    },
    {
      id: "cv-generator",
      category: "digital",
      categoryLabel: "Digital & Design",
      title: "Interactive CV & Resume Builder Web Application",
      subtitle: "ATS-Optimized Live Web Resume Generator",
      description: "A fast, responsive browser application enabling job seekers and engineering graduates to compile, customize, live-preview, and export clean, professional, ATS-standard CV documents in PDF format.",
      longDescription: "Built with pure vanilla web technologies to deliver an instantaneous, client-side resume builder. Users can input work experience, NVQ credentials, technical skills, and educational qualifications, switch between modern themes, preview layouts in real-time, and download print-ready PDFs without any server dependencies.",
      tech: ["JavaScript (ES6+)", "HTML5 Canvas", "CSS3 Print Media", "PDF Export"],
      role: "Creator & Front-End Developer",
      liveUrl: "cv.html",
      thumbnail: "assets/images/ai/CV.jpeg",
      features: [
        "Real-time interactive live resume preview with dynamic typography",
        "ATS-friendly formatting tailored for technical & engineering professions",
        "One-click high-fidelity PDF generation directly in the browser",
        "Zero backend requirement – 100% privacy-safe client-side data handling"
      ]
    },
    {
      id: "vfx-showcase",
      category: "digital",
      categoryLabel: "Digital & Design",
      title: "Video / VFX Works & Commercial Motion Graphics",
      subtitle: "Cinematic Editing, Color Grading & Visual Effects",
      description: "A curated visual portfolio showcasing commercial video edits, motion typography, 3D title sequences, and color grading produced using Adobe Premiere Pro and After Effects.",
      longDescription: "A portfolio of multimedia projects created for regional workshops, events, and brand campaigns. Demonstrates expertise in timing, pacing, multi-track audio synchronization, Lumetri Color grading, keyframe masking, and visual storytelling.",
      tech: ["Adobe Premiere Pro", "Adobe After Effects", "Photoshop", "Audition"],
      role: "Video Editor & Motion Designer",
      liveUrl: "https://art-flux.github.io/designer/",
      thumbnail: "assets/images/ai/VD.jpeg",
      features: [
        "Cinematic color grading workflows using custom LUT profiles",
        "Audio-reactive beat matching and dynamic speed ramping",
        "Translucent lower-third motion graphics and animated branding",
        "Optimized rendering presets for high-bitrate streaming platforms"
      ]
    }
  ],

  // Contact Form Settings (FormSubmit AJAX - Direct client-side email delivery to idishanmadushanka@gmail.com)
  contactConfig: {
    formEndpoint: "https://formsubmit.co/ajax/idishanmadushanka@gmail.com",
    email: "idishanmadushanka@gmail.com",
    mailtoFallback: "mailto:idishanmadushanka@gmail.com"
  }
};

