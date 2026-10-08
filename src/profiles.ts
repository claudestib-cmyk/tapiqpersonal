
/**
 * TAPIQ PERSONAL NFC LANDING PAGE
 *
 * Personal information displayed on the public website.
 * Only include contact details and links you want others to see.
 */

export type SocialKey =
  | 'facebook'
  | 'instagram'
  | 'tiktok'
  | 'linkedin'
  | 'youtube'
  | 'whatsapp'
  | 'googleBusiness'

export type CardProfile = {
  slug: string
  name: string
  role: string
  company: string
  bio: string
  location?: string
  initials: string
  avatarUrl?: string
  coverUrl?: string
  accent: string
  email?: string
  phone?: string
  website?: string
  socials: Partial<Record<SocialKey, string>>
}

export const profiles: CardProfile[] = [
  {
    // PERSONAL PROFILE
    slug: 'my-profile',

    // BASIC INFORMATION
    name: 'Steven Claude B. Jumao-as',
    role: 'Full Stack Web Developer | Founder of Tapiq',
    company: 'Tapiq',

    // SHORT INTRODUCTION
    bio: 'Computer Engineering graduate, web developer, and founder of Tapiq. Passionate about building digital experiences and smart solutions that make everyday connections simpler.',

    // LOCATION
    location: 'Bohol, Philippines',

    // PROFILE PHOTO
    initials: 'ME',

    avatarUrl: '/profile.png',

    coverUrl: '/background.png',

    // BRAND COLOR
    accent: '#2563eb',

    // CONTACT INFORMATION
    email: 'claudesteven.jumaoas@gmail.com',
    phone: '+639910348459',
    website: 'https://steven-claude.vercel.app/',

    // SOCIAL MEDIA LINKS
    socials: {
      facebook: 'https://www.facebook.com/stevenclaude.jumaoas.1/',
      instagram: 'https://www.instagram.com/steven_klud/',
      tiktok: 'https://www.tiktok.com/@stib_fox',
      linkedin: 'https://www.linkedin.com/in/steven-claude-jumao-as-99475a3a7/',
    },
  },
]

export const getProfile = (slug: string) =>
  profiles.find((p) => p.slug === slug)
