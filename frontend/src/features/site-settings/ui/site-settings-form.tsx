'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Skeleton } from '@/shared/ui/skeleton';
import { AdminContentLocaleProvider } from '@/shared/i18n/admin-content-locale-context';
import { AdminContentLocaleTabs } from '@/shared/ui/admin-content-locale-tabs';
import { SiteSettingsAboutSection } from './site-settings-about-section';
import { SiteSettingsContactSection } from './site-settings-contact-section';
import { SiteSettingsFooterSection } from './site-settings-footer-section';
import { SiteSettingsHeaderSection } from './site-settings-header-section';
import { SiteSettingsHeroSection } from './site-settings-hero-section';
import { SiteSettingsSeoSection } from './site-settings-seo-section';
import { SiteSettingsThemeSection } from './site-settings-theme-section';
import { useSiteSettingsForm } from './use-site-settings-form';

export function SiteSettingsForm() {
  const {
    t,
    tCommon,
    canUpdate,
    data,
    isLoading,
    form,
    socialLinks,
    updateSettings,
    onSubmit,
  } = useSiteSettingsForm();

  if (isLoading || !data) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <AdminContentLocaleProvider resetKey={data.updatedAt}>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {t('lastUpdated', {
                date: new Date(data.updatedAt).toLocaleString(),
              })}
            </p>
            {canUpdate ? (
              <Button type="submit" disabled={updateSettings.isPending}>
                {updateSettings.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : null}
                {tCommon('saveChanges')}
              </Button>
            ) : null}
          </div>

          <AdminContentLocaleTabs className="rounded-lg border px-4" />

          <Tabs defaultValue="hero">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7">
              <TabsTrigger value="hero">{t('tabHero')}</TabsTrigger>
              <TabsTrigger value="about">{t('tabAbout')}</TabsTrigger>
              <TabsTrigger value="theme">{t('tabTheme')}</TabsTrigger>
              <TabsTrigger value="header">{t('tabHeader')}</TabsTrigger>
              <TabsTrigger value="footer">{t('tabFooter')}</TabsTrigger>
              <TabsTrigger value="seo">{t('tabSeo')}</TabsTrigger>
              <TabsTrigger value="contact">{t('tabContact')}</TabsTrigger>
            </TabsList>

            <TabsContent value="hero" className="pt-4">
              <SiteSettingsHeroSection
                control={form.control}
                canUpdate={canUpdate}
              />
            </TabsContent>

            <TabsContent value="about" className="pt-4">
              <SiteSettingsAboutSection
                control={form.control}
                canUpdate={canUpdate}
              />
            </TabsContent>

            <TabsContent value="theme" className="pt-4">
              <SiteSettingsThemeSection
                control={form.control}
                canUpdate={canUpdate}
              />
            </TabsContent>

            <TabsContent value="header" className="space-y-4 pt-4">
              <SiteSettingsHeaderSection
                control={form.control}
                canUpdate={canUpdate}
              />
            </TabsContent>

            <TabsContent value="footer" className="space-y-4 pt-4">
              <SiteSettingsFooterSection
                control={form.control}
                canUpdate={canUpdate}
                socialLinks={socialLinks}
              />
            </TabsContent>

            <TabsContent value="seo" className="pt-4">
              <SiteSettingsSeoSection
                control={form.control}
                canUpdate={canUpdate}
              />
            </TabsContent>

            <TabsContent value="contact" className="pt-4">
              <SiteSettingsContactSection
                control={form.control}
                canUpdate={canUpdate}
              />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </AdminContentLocaleProvider>
  );
}
