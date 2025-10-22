// SEO Configuration and meta tags for all pages
export const seoConfig = {
  site: {
    url: 'https://sandiyahrm.com',
    name: 'Sandiya HR Management',
    description: 'Ethical recruitment agency offering zero-cost services to connect professionals with global opportunities',
    locale: 'en_US',
    logo: 'https://sandiyahrm.com/sandhaya.png',
    socialLinks: {
      facebook: 'https://www.facebook.com/p/Sandiya-Human-Resources-Pvt-Ltd-100064059644304/',
      instagram: 'https://www.instagram.com/sandiyahrm',
      linkedin: 'https://www.linkedin.com/company/sandiya-hr',
      twitter: 'https://twitter.com/sandiyahrm',
    },
    contact: {
      phone: '+977-14374161',
      email: 'sandiyahr17@gmail.com',
      address: 'Dhumbarahi, Kathmandu, Nepal',
    }
  },
  
  pages: {
    home: {
      title: 'Sandiya HR Management - Ethical Recruitment Services',
      description: 'Connect with global job opportunities through ethical, zero-cost recruitment services. Trusted by thousands of professionals.',
      keywords: 'recruitment, jobs, HR services, Nepal, global opportunities, ethical hiring',
    },
    about: {
      title: 'About Us - Sandiya Human Resources',
      description: 'Learn about our team and commitment to ethical recruitment practices. 10+ years of industry experience.',
      keywords: 'about sandiya hr, recruitment company, team, ethical practices',
    },
    gallery: {
      title: 'Gallery - Sandiya HR',
      description: 'Explore our gallery showcasing successful placements and company events.',
      keywords: 'gallery, photos, placements, events, company culture',
    },
    clients: {
      title: 'Our Clients - Sandiya HR',
      description: '500+ global partners trust Sandiya HR for recruitment services.',
      keywords: 'clients, partners, companies, recruitment partners',
    },
    achievements: {
      title: 'Achievements - Sandiya HR',
      description: '1000+ successful placements, ISO certified, award-winning recruitment agency.',
      keywords: 'achievements, awards, certifications, success stories',
    },
    contact: {
      title: 'Contact Us - Sandiya HR',
      description: 'Get in touch with our team. We respond within 24 hours.',
      keywords: 'contact, phone, email, location, inquiry',
    },
    policy: {
      title: 'Recruitment Policy - Sandiya HR',
      description: 'Our commitment to ethical recruitment and worker protection standards.',
      keywords: 'policy, ethics, standards, recruitment practices, worker protection',
    },
    employmentCategories: {
      title: 'Employment Categories - Sandiya HR',
      description: 'Explore various job categories and employment opportunities available.',
      keywords: 'employment, jobs, categories, opportunities, positions',
    },
  },
};

// Generate Open Graph meta tags
export function generateOGTags(page: string, imageUrl?: string) {
  const pageConfig = seoConfig.pages[page as keyof typeof seoConfig.pages] || seoConfig.pages.home;
  
  return {
    'og:title': pageConfig.title,
    'og:description': pageConfig.description,
    'og:url': `${seoConfig.site.url}/${page}`,
    'og:type': 'website',
    'og:image': imageUrl || seoConfig.site.logo,
    'og:site_name': seoConfig.site.name,
    'og:locale': seoConfig.site.locale,
  };
}

// Generate Twitter meta tags
export function generateTwitterTags(page: string, imageUrl?: string) {
  const pageConfig = seoConfig.pages[page as keyof typeof seoConfig.pages] || seoConfig.pages.home;
  
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': pageConfig.title,
    'twitter:description': pageConfig.description,
    'twitter:image': imageUrl || seoConfig.site.logo,
    'twitter:creator': '@sandiyahrm',
  };
}

// Generate canonical URL
export function generateCanonical(page: string) {
  return `${seoConfig.site.url}/${page}`;
}
