// @ts-nocheck
import { Bubble, BubbleContent, BubbleReactions } from "@default/ui/primitives/bubble";

const MESSAGES = [
  { variant: "default", text: "This bubble uses the default variant." },
  { variant: "secondary", text: "Switching to secondary looks like this." },
  {
    variant: "muted",
    text: "Muted lowers the emphasis, handy for quieter, less important messages.",
  },
  {
    variant: "tinted",
    text: "Tinted washes the bubble in a soft primary color.",
  },
  { variant: "outline", text: "Outline keeps just a border, no fill." },
  { variant: "ghost", text: "Ghost drops the frame entirely for plain text." },
  {
    variant: "destructive",
    text: "Destructive flags a failed message like this one.",
  },
] as const;

const BubbleVariants = () => {
  return (
    <div className="flex w-full max-w-90 flex-col gap-6">
      {MESSAGES.map(({ variant, text }, index) => (
        <Bubble
          key={variant}
          variant={variant}
          align={index % 2 === 0 ? "start" : "end"}
        >
          <BubbleContent>{text}</BubbleContent>
          {variant === "muted" && (
            <BubbleReactions role="img" aria-label="Reaction: party popper">
              <span>🎉</span>
            </BubbleReactions>
          )}
        </Bubble>
      ))}
    </div>
  );
};

export default BubbleVariants;
