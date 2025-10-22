const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API error (${endpoint}):`, error);
    return [] as any;
  }
}

// API Functions
export const api = {
  // Gallery
  getGallery: () => fetchAPI('/gallery'),
  getGalleryImage: (id: number) => fetchAPI(`/gallery/${id}`),

  // Company Info
  getCompanyInfo: () => fetchAPI('/company-info'),
  getTeamMembers: () => fetchAPI('/team-members'),

  // Employment Categories
  getEmploymentCategories: () => fetchAPI('/employment-categories'),
  getEmploymentCategory: (id: number) =>
    fetchAPI(`/employment-categories/${id}`),

  // Jobs
  getJobs: () => fetchAPI('/jobs'),
  getJob: (id: number) => fetchAPI(`/jobs/${id}`),

  // Recruitment
  getRecruitmentPolicy: () => fetchAPI('/recruitment-policy'),
  getRecruitmentProcess: () => fetchAPI('/recruitment-process'),

  // Legal Documents
  getLegalDocuments: () => fetchAPI('/legal-documents'),
  getLegalDocument: (id: number) => fetchAPI(`/legal-documents/${id}`),

  // Achievements
  getAchievements: () => fetchAPI('/achievements'),
  getAchievement: (id: number) => fetchAPI(`/achievements/${id}`),

  // Clients
  getClients: () => fetchAPI('/clients'),

  // Testimonials
  getTestimonials: () => fetchAPI('/testimonials'),
  getTestimonial: (id: number) => fetchAPI(`/testimonials/${id}`),

  // Demand Letters
  getDemandLetters: () => fetchAPI('/demand-letters'),
  getDemandLetter: (id: number) => fetchAPI(`/demand-letters/${id}`),

  // Contact
  submitContactForm: (data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) =>
    fetchAPI('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
