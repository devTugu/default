// @ts-nocheck
"use client";

const shinyKeyframes = `
@keyframes default-ui-shiny {
  0% { background-position: 100%; }
  100% { background-position: -100%; }
}
.default-ui-shiny-text {
  animation: default-ui-shiny 3s linear infinite;
}
`;

const AnimatedShinyText = () => {
  return (
    <>
      <style>{shinyKeyframes}</style>
      <p className="default-ui-shiny-text inline-block bg-[linear-gradient(120deg,rgba(0,0,0,0)_40%,rgba(0,0,0,0.8)_50%,rgba(0,0,0,0)_60%)] dark:bg-[linear-gradient(120deg,rgba(255,255,255,0)_40%,rgba(255,255,255,0.8)_50%,rgba(255,255,255,0)_60%)] bg-size-[200%_100%] bg-clip-text text-xl font-medium text-[var(--muted-foreground)]/70 sm:text-2xl">
        Shiny Button Text
      </p>
    </>
  );
};

export default AnimatedShinyText;
