import { seoConfig } from '@/lib/seo';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'business.business';
  canonicalUrl?: string;
}

export function generateSEOMetadata({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
}: SEOProps) {
  return {
    title,
    description,
    keywords,
    metadataBase: new URL(seoConfig.site.url),
    alternates: {
      canonical: canonicalUrl || seoConfig.site.url,
    },
    openGraph: {
      type: ogType,
      title,
      description,
      url: canonicalUrl || seoConfig.site.url,
      siteName: seoConfig.site.name,
      images: [
        {
          url: ogImage || seoConfig.site.logo,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: seoConfig.site.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage || seoConfig.site.logo],
      creator: '@sandiyahrm',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  };
}
