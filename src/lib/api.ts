/**
 * API Service untuk Landing Page
 * Mengambil data dari admin backend
 */

const API_BASE_URL = 'https://hibiscusefsya.com/admin/api';

// Types
export interface HeroContent {
  badge_text: string;
  title: string;
  subtitle: string;
  description: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text: string;
  secondary_button_link: string;
  background_image: string;
  stats: Array<{ value: string; label: string }>;
}

export interface AboutContent {
  section_title: string;
  section_subtitle: string;
  heading: string;
  description: string;
  features: Array<{ icon: string; title: string; description: string }>;
  stats: Array<{ value: string; label: string }>;
  image: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
  link: string;
  is_coming_soon: boolean;
  is_active: boolean;
  sort_order: number;
}

export interface ServiceCategory {
  id: number;
  title: string;
  icon: string;
  color: string;
  bg_color: string;
  services: Service[];
}

export interface ContactContent {
  section_title: string;
  section_subtitle: string;
  heading: string;
  description: string;
  contact_info: {
    email: string;
    phone: string;
    address: string;
  };
  social_links: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    twitter?: string;
    linkedin?: string;
  };
  map_embed: string;
}

// Helper function untuk fetch dengan error handling
async function fetchAPI<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.warn(`API request failed: ${endpoint}`);
      return null;
    }
    
    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data as T;
    }
    
    return null;
  } catch (error) {
    console.warn(`Failed to fetch from API: ${endpoint}`, error);
    return null;
  }
}

// API Functions
export async function getHeroContent(): Promise<HeroContent | null> {
  return fetchAPI<HeroContent>('/hero.php');
}

export async function getAboutContent(): Promise<AboutContent | null> {
  return fetchAPI<AboutContent>('/about.php');
}

export async function getServices(): Promise<ServiceCategory[] | null> {
  return fetchAPI<ServiceCategory[]>('/services.php');
}

export async function getContactContent(): Promise<ContactContent | null> {
  return fetchAPI<ContactContent>('/contact.php');
}

// Submit contact form
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    return {
      success: result.success || false,
      message: result.message || 'Terjadi kesalahan',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Gagal mengirim pesan. Silakan coba lagi.',
    };
  }
}
