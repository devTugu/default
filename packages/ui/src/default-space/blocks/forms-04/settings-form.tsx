// @ts-nocheck
"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  Mail,
  Lock,
  Trash2,
  Check,
} from "lucide-react";
import { Button } from "@default/ui/primitives/button";
import { Card } from "@default/ui/primitives/card";
import { Input } from "@default/ui/primitives/input";
import { Label } from "@default/ui/primitives/label";
import { Switch } from "@default/ui/primitives/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@default/ui/primitives/tabs";
import { Field, FieldLabel, FieldDescription } from "@default/ui/primitives/field";
import { Textarea } from "@default/ui/primitives/textarea";
import { Separator } from "@default/ui/primitives/separator";

const TABS_CONFIG = [
  { value: "account", label: "Account", icon: User },
  { value: "appearance", label: "Appearance", icon: Palette },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "security", label: "Security", icon: Shield },
];

const SettingsForm = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  return (
    <section className="py-10 lg:py-16">
      <div className="max-w-6xl xl:px-16 lg:px-8 px-4 mx-auto w-full flex flex-col gap-6">
        <div>
          <p className="text-3xl font-bold tracking-tight text-foreground">
            Settings
          </p>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Card className="border-border shadow-sm overflow-hidden bg-background py-0">
          <Tabs
            defaultValue="account"
            orientation="vertical"
            className="flex flex-col md:flex-row min-h-150 gap-0"
          >
            <TabsList className="md:w-64 w-full h-auto bg-background dark:bg-background p-4 flex flex-col items-stretch gap-1">
              {TABS_CONFIG.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="justify-start px-3 py-2.5 h-auto text-sm font-medium data-active:bg-primary/5! group-data-[variant=default]/tabs-list:data-active:shadow-none data-active:border-border! cursor-pointer"
                >
                  <tab.icon className="mr-2 size-4" /> {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <Separator
              orientation="vertical"
              className="hidden md:block h-auto"
            />

            <form className="flex-1">
              <TabsContent
                value="account"
                className="m-0 p-6 md:p-8 space-y-8 animate-in fade-in duration-300"
              >
                <div className="space-y-1">
                  <p className="text-xl font-semibold text-foreground">
                    Account Information
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Update your personal details and how others see you.
                  </p>
                </div>

                <div className="grid gap-6 max-w-2xl">
                  <Field>
                    <FieldLabel htmlFor="display-name">Display Name</FieldLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
                      <Input
                        id="display-name"
                        placeholder="Sunil Joshi"
                        className="pl-10 h-10 border-border/80"
                      />
                    </div>
                    <FieldDescription>
                      This is the name people will see when interacting with
                      you.
                    </FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="email-settings">
                      Email Address
                    </FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
                      <Input
                        id="email-settings"
                        type="email"
                        placeholder="suniljoshi@example.com"
                        className="pl-10 h-10 border-border/80"
                      />
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="bio-settings">Bio</FieldLabel>
                    <Textarea
                      id="bio-settings"
                      className="min-h-30 border-border/80 resize-none"
                      placeholder="Write a brief introduction about yourself"
                    />
                  </Field>
                </div>

                <div className="flex justify-start">
                  <Button
                    onClick={handleSave}
                    className="px-6 h-10 cursor-pointer hover:bg-primary/80"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <span className="flex items-center gap-2">
                        <Check className="size-4" /> Saved
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Save className="size-4" /> Save Changes
                      </span>
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent
                value="appearance"
                className="m-0 p-6 md:p-8 space-y-8 animate-in fade-in duration-300"
              >
                <div className="space-y-1">
                  <p className="text-xl font-semibold">Appearance</p>
                  <p className="text-sm text-muted-foreground">
                    Tailor your workspace's visual style.
                  </p>
                </div>

                <div className="space-y-4 max-w-2xl">
                  <div className="flex items-center justify-between p-5 rounded-xl border bg-muted/10 group transition-colors hover:border-border">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark themes.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-xl border bg-muted/10 group transition-colors hover:border-border">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">
                        Compact View
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Maximum data density for lists and grids.
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="notifications"
                className="m-0 p-6 md:p-8 space-y-8 animate-in fade-in duration-300"
              >
                <div className="space-y-1">
                  <p className="text-xl font-semibold">Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Control how you receive updates and alerts.
                  </p>
                </div>

                <div className="border rounded-xl divide-y bg-background overflow-hidden">
                  {[
                    "Weekly Summary",
                    "New Message Alerts",
                    "Account Activity",
                    "Marketing Emails",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between p-5 hover:bg-muted/5 transition-colors"
                    >
                      <Label className="font-medium">{item}</Label>
                      <Switch defaultChecked={item !== "Marketing Emails"} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent
                value="security"
                className="m-0 p-6 md:p-8 space-y-8 animate-in fade-in duration-300"
              >
                <div className="space-y-1">
                  <p className="text-xl font-semibold">Security</p>
                  <p className="text-sm text-muted-foreground">
                    Protect your account with robust credentials.
                  </p>
                </div>

                <div className="grid gap-6 max-w-2xl">
                  <Field>
                    <FieldLabel htmlFor="current-pass">
                      Current Password
                    </FieldLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
                      <Input
                        id="current-pass"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-10"
                      />
                    </div>
                  </Field>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="new-pass">New Password</FieldLabel>
                      <Input
                        id="new-pass"
                        type="password"
                        placeholder="••••••••"
                        className="h-10"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="confirm-pass">
                        Confirm Password
                      </FieldLabel>
                      <Input
                        id="confirm-pass"
                        type="password"
                        placeholder="••••••••"
                        className="h-10"
                      />
                    </Field>
                  </div>

                  <div className="flex justify-start">
                    <Button className="px-6 h-10 cursor-pointer hover:bg-primary/80">
                      Update Password
                    </Button>
                  </div>

                  <div className="pt-8 border-t">
                    <div className="p-6 rounded-xl border border-destructive/20 bg-destructive/10">
                      <p className="text-destructive font-bold mb-1 flex items-center gap-2 leading-normal">
                        <Trash2 className="size-4" /> Delete Account
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Permanently remove your account and all associated data.
                        This action is irreversible.
                      </p>
                      <Button
                        variant="destructive"
                        className="px-6 font-medium h-10 cursor-pointer"
                      >
                        Deactivate Account
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </Card>
      </div>
    </section>
  );
};

export default SettingsForm;
