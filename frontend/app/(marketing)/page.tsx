import { getPublicSiteSettings } from '@/entities/public-api';
import { getEmptySiteSettings } from '@/entities/site-settings/lib/normalize-site-settings';
import { AboutBriefSection, HeroSection } from '@/widgets/marketing';

export default async function HomePage() {
  const settings = await getPublicSiteSettings();
  const defaults = getEmptySiteSettings();
  const hero = settings?.hero ?? defaults.hero;
  const about = settings?.about ?? defaults.about;

  return (
    <>
      <HeroSection hero={hero} brandColor={settings?.theme?.brandColor} />
      <AboutBriefSection about={about} className="bg-muted/20" />
    </>
  );
}
