import {
  localizedText,
  localizedStringList,
  type LocalizedStringList,
  type LocalizedText,
} from '@shared/domain/localized-content';

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettingsHero {
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  ctaLabel: LocalizedText;
  ctaUrl: string;
  secondaryCtaLabel: LocalizedText;
  secondaryCtaUrl: string;
  imageUrl: string | null;
}

export interface SiteSettingsHeader {
  logoUrl: string | null;
  logoDarkUrl: string | null;
  adminLogoUrl: string | null;
  faviconUrl: string | null;
  siteName: LocalizedText;
}

export interface SiteSettingsFooter {
  copyright: LocalizedText;
  tagline: LocalizedText;
  socialLinks: SocialLink[];
}

export interface SiteSettingsSeo {
  title: LocalizedText;
  description: LocalizedText;
  ogImageUrl: string | null;
  keywords: LocalizedStringList;
}

export interface SiteSettingsContactInfo {
  email: string;
  phone: string | null;
  location: LocalizedText | null;
  address: LocalizedText | null;
  workHours: LocalizedText | null;
  showForm: boolean;
}

export interface SiteSettingsTheme {
  brandColor: string | null;
}

export interface AboutValue {
  icon: string;
  label: LocalizedText;
}

export interface AboutStat {
  label: LocalizedText;
  value: string;
}

export interface SiteSettingsAbout {
  brief: LocalizedText;
  mission: LocalizedText;
  vision: LocalizedText;
  imageUrl: string | null;
  values: AboutValue[];
  stats: AboutStat[];
}

export class SiteSettings {
  constructor(
    public readonly id: number,
    public readonly hero: SiteSettingsHero,
    public readonly header: SiteSettingsHeader,
    public readonly footer: SiteSettingsFooter,
    public readonly seo: SiteSettingsSeo,
    public readonly contactInfo: SiteSettingsContactInfo,
    public readonly theme: SiteSettingsTheme,
    public readonly about: SiteSettingsAbout,
    public readonly updatedAt: Date,
  ) {}
}

export const DEFAULT_SITE_SETTINGS = {
  id: 1,
  hero: {
    title: localizedText('Welcome to your site', 'Тавтай морил'),
    subtitle: localizedText('Website template', 'Веб сайтын загвар'),
    description: localizedText(
      'Customize this starter with your brand and content.',
      'Энэ суурийг өөрийн брэнд, контентоороо өөрчилнө үү.',
    ),
    ctaLabel: localizedText('Get started', 'Эхлэх'),
    ctaUrl: '/dashboard',
    secondaryCtaLabel: localizedText('Site settings', 'Сайтын тохиргоо'),
    secondaryCtaUrl: '/dashboard/site-settings',
    imageUrl: null,
  },
  header: {
    logoUrl: null,
    logoDarkUrl: null,
    adminLogoUrl: null,
    faviconUrl: null,
    siteName: localizedText('Your Site', 'Таны сайт'),
  },
  footer: {
    copyright: localizedText('© 2026 Your Site', '© 2026 Таны сайт'),
    tagline: localizedText(
      'Built with NestJS & Next.js',
      'NestJS & Next.js-ээр бүтээгдсэн',
    ),
    socialLinks: [],
  },
  seo: {
    title: localizedText('Your Site', 'Таны сайт'),
    description: localizedText(
      'Modern website starter with admin dashboard',
      'Админ самбартай орчин үеийн веб сайтын загвар',
    ),
    ogImageUrl: null,
    keywords: localizedStringList(
      ['website', 'template', 'nextjs'],
      ['веб', 'загвар', 'nextjs'],
    ),
  },
  contactInfo: {
    email: 'hello@example.com',
    phone: null,
    location: localizedText('Remote', 'Алсын'),
    address: null,
    workHours: localizedText('Mon–Fri 9:00–18:00', 'Да–Ба 9:00–18:00'),
    showForm: false,
  },
  theme: {
    brandColor: null,
  },
  about: {
    brief: localizedText(
      'A minimal foundation for marketing pages and an admin console.',
      'Маркетинг хуудас болон админ консолын минимал суурь.',
    ),
    mission: localizedText(
      'Ship a polished site quickly and extend it as you grow.',
      'Сайтаа хурдан гаргаад хөгжихтэйгээ цэвэр өргөтгөнө.',
    ),
    vision: localizedText(
      'Clear architecture that stays maintainable over time.',
      'Цаг хугацаанд нь хадгалахад хялбар, цэвэр архитектур.',
    ),
    imageUrl: null,
    values: [
      {
        icon: 'heart',
        label: localizedText('Quality', 'Чанар'),
      },
      {
        icon: 'users',
        label: localizedText('Teamwork', 'Багийн ажил'),
      },
    ],
    stats: [
      {
        label: localizedText('Years', 'Жил'),
        value: '10+',
      },
      {
        label: localizedText('Pages', 'Хуудас'),
        value: '1+',
      },
    ],
  },
} as const;
