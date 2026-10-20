// @ts-nocheck
import { Button } from "@default/ui/primitives/button";
import { Card, CardContent, CardFooter, CardHeader } from "@default/ui/primitives/card";
import { Field, FieldLabel } from "@default/ui/primitives/field";
import { Input } from "@default/ui/primitives/input";
import { Label } from "@default/ui/primitives/label";
import { Switch } from "@default/ui/primitives/switch";

const ProfileForm = () => {
  return (
    <section className="py-8 sm:py-16 lg:py-20 bg-muted">
      <div className="max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto">
        <div className="flex flex-col gap-8 items-center w-full">
          <a href="#">
            <img
              src="https://images.shadcnspace.com/assets/logo/shadcnspace-logo-black.svg"
              alt="default"
              className="dark:hidden "
            />
            <img
              src="https://images.shadcnspace.com/assets/logo/shadcnspace-logo-white.svg"
              alt="default"
              className="hidden dark:block "
            />
          </a>
          <Card className="p-0 max-w-3xl w-full gap-0">
            <CardHeader className="gap-6 px-6 pt-4 border-b border-border pb-4">
              <h2 className="text-base font-medium text-card-foreground">
                Edit your profile
              </h2>
            </CardHeader>
            <CardContent className="py-4 px-6">
              <div className="flex sm:flex-row flex-col gap-6">
                <div className="max-w-md w-full md:pe-10 sm:border-e border-border sm:order-first order-last">
                  <form className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                      <Field className="gap-1.5">
                        <FieldLabel
                          htmlFor="fullname"
                          className="text-sm text-muted-foreground font-normal"
                        >
                          Full Name
                        </FieldLabel>
                        <Input
                          id="fullname"
                          type="text"
                          defaultValue="Sunil Joshi"
                          className="dark:bg-background h-9 text-sm shadow-xs text-muted-foreground font-normal"
                        />
                      </Field>
                      <Field className="gap-1.5">
                        <FieldLabel
                          htmlFor="email"
                          className="text-sm text-muted-foreground font-normal"
                        >
                          Email
                        </FieldLabel>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="suniljoshi19@shadcnspace.com"
                          className="dark:bg-background h-9 text-sm shadow-xs text-muted-foreground font-normal"
                        />
                      </Field>
                      <Field className="gap-1.5">
                        <FieldLabel
                          htmlFor="title"
                          className="text-sm text-muted-foreground font-normal"
                        >
                          Title
                        </FieldLabel>
                        <Input
                          id="title"
                          type="text"
                          defaultValue="UI/UX Designer"
                          className="dark:bg-background h-9 shadow-xs text-sm text-muted-foreground font-normal"
                        />
                      </Field>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col gap-1">
                          <Label
                            htmlFor="hireme"
                            className="text-primary text-sm font-medium"
                          >
                            Hire me
                          </Label>
                          <p className="text-sm text-muted-foreground font-normal">
                            Enabling this feature will allow other users to
                            contact you with work inquiries.
                          </p>
                        </div>
                        <Switch id="hireme" />
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col gap-1">
                          <Label
                            htmlFor="privacy"
                            className="text-primary text-sm font-medium"
                          >
                            Privacy
                          </Label>
                          <p className="text-sm text-muted-foreground font-normal">
                            Enabling privacy will hide your profile, only you
                            will be able to see it. Not recommended if you’re an
                            author.
                          </p>
                        </div>
                        <Switch id="privacy" />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <h6 className="text-primary text-sm font-medium">
                        Avatar
                      </h6>
                      <p className="text-sm text-muted-foreground font-normal">
                        By clicking this checkbox, you agree to the terms and
                        conditions.
                      </p>
                    </div>
                    <img
                      src="https://images.shadcnspace.com/assets/profiles/profile-user.svg"
                      alt="user-profile"
                      className="w-30 h-30 rounded-full mx-auto"
                    />
                    <div className="flex flex-col items-center">
                      <h5 className="text-primary text-base font-medium">
                        Sunil Joshi
                      </h5>
                      <p className="text-sm text-muted-foreground font-normal">
                        UI/UX Designer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="[.border-t]:pt-5 py-5 px-6 border-t border-border flex sm:flex-row flex-col justify-between sm:items-center items-start gap-5 bg-card">
              <p className="text-muted-foreground text-sm font-normal">Last updated: 17 Jan, 2026</p>
              <div className="flex gap-3 items-center">
                <Button variant={'outline'} className="rounded-lg cursor-pointer h-9 shadow-xs">Cancel</Button>
                <Button className="rounded-lg cursor-pointer h-9 hover:bg-primary/80">Save Changes</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProfileForm;
