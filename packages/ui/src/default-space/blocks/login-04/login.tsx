import type { ReactNode } from "react";
import Logo from "../../assets/logo/logo";
import { Button } from "@default/ui/primitives/button";
import { Input } from "@default/ui/primitives/input";
import { Checkbox } from "@default/ui/primitives/checkbox";
import { Label } from "@default/ui/primitives/label";

export type Login04Props = {
  title?: string;
  subtitle?: string;
  panelTitle?: string;
  homeHref?: string;
  socialAuth?: ReactNode;
  credentials?: ReactNode;
  footer?: ReactNode;
};

function Login04DemoForm() {
  return (
    <form className="space-y-6 w-full">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="login-04-demo-email"
            className="text-sm font-normal text-muted-foreground"
          >
            Email*
          </Label>
          <Input
            id="login-04-demo-email"
            type="email"
            placeholder="example@shadcnspace.com"
            className="h-9 border-border bg-background dark:bg-background text-foreground shadow-xs"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label
            htmlFor="login-04-demo-password"
            className="text-sm font-normal text-muted-foreground"
          >
            Password*
          </Label>
          <Input
            id="login-04-demo-password"
            type="password"
            placeholder="Enter your password"
            className="h-9 border-border bg-background dark:bg-background text-foreground shadow-xs"
            required
          />
        </div>
        <div className="flex items-center justify-between text-sm flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="login-04-demo-remember"
              className="border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground hover:cursor-pointer dark:bg-background"
            />
            <Label
              htmlFor="login-04-demo-remember"
              className="text-muted-foreground font-normal cursor-pointer leading-0"
            >
              Remember this device
            </Label>
          </div>
          <a
            href="#"
            className="text-foreground text-sm font-medium hover:underline underline-offset-4 transition-all"
          >
            Forgot Password?
          </a>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full rounded-lg hover:bg-primary/80 cursor-pointer h-10"
      >
        Sign in
      </Button>
      <p className="text-center text-sm font-normal text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a
          href="#"
          className="text-foreground font-medium hover:underline underline-offset-4 transition-all"
        >
          Create an account
        </a>
      </p>
    </form>
  );
}

function Login04DemoSocial() {
  return (
    <>
      <div className="flex items-center justify-center gap-3 w-full flex-col sm:flex-row">
        <Button
          variant="outline"
          className="h-9 shadow-xs flex-1 gap-2 px-5! py-2! rounded-lg text-sm font-medium dark:bg-background hover:cursor-pointer w-full"
        >
          <img
            src="https://images.shadcnspace.com/assets/svgs/icon-google.svg"
            alt="Google"
            width={16}
            height={16}
            className="w-4 h-4"
          />
          Sign in with Google
        </Button>
        <Button
          variant="outline"
          className="h-9 shadow-xs flex-1 gap-2 px-5! py-2! rounded-lg text-sm font-medium dark:bg-background hover:cursor-pointer w-full"
        >
          <img
            src="https://images.shadcnspace.com/assets/svgs/icon-github.svg"
            alt="Github"
            width={16}
            height={16}
            className="w-4 h-4 dark:invert"
          />
          Sign in with Github
        </Button>
      </div>
      <div className="w-full flex items-center gap-3 text-sm font-normal text-muted-foreground before:content-[''] before:h-px before:flex-1 before:bg-border after:content-[''] after:h-px after:flex-1 after:bg-border">
        or sign in with
      </div>
    </>
  );
}

const Login04 = ({
  title = "Welcome to Shadcn Space",
  subtitle = "Login to your account now",
  panelTitle = "Welcome Back to Your Creative Space",
  homeHref = "#",
  socialAuth,
  credentials,
  footer,
}: Login04Props) => {
  const showDemo = credentials === undefined;
  const social = socialAuth ?? (showDemo ? <Login04DemoSocial /> : null);
  const form = credentials ?? (showDemo ? <Login04DemoForm /> : null);

  return (
    <section className="bg-background min-h-screen flex items-center justify-center overflow-hidden">
      <div className="w-full flex min-h-screen items-stretch">
        <div className="hidden lg:flex lg:w-[480px] lg:shrink-0 dark">
          <div className="flex relative bg-background flex-col items-center justify-center p-16 text-center text-foreground w-full">
            <div className="z-10 flex flex-col gap-6 items-center max-w-sm">
              <a href={homeHref}>
                <Logo />
              </a>
              <p className="text-3xl font-medium">{panelTitle}</p>
            </div>
            <div className="absolute inset-0 z-0">
              <video
                className="object-cover h-full w-full"
                loop
                autoPlay
                muted
                playsInline
              >
                <source
                  src="https://images.shadcnspace.com/assets/video/wave-video-loop.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md flex flex-col gap-6 items-center">
            <a href={homeHref} className="lg:hidden">
              <Logo />
            </a>

            <div className="text-center flex flex-col gap-1">
              <p className="text-2xl font-medium text-foreground">{title}</p>
              <p className="text-sm font-normal text-muted-foreground">
                {subtitle}
              </p>
            </div>

            {social}
            {form}
            {footer}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login04;
