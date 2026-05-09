import { MetadataRoute } from 'next';
import { SITE_NAME } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://voicaai.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  ];
}
