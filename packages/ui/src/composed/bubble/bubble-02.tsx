// @ts-nocheck
import { Bubble, BubbleContent } from "@default/ui/primitives/bubble";

const MESSAGES = [
  { align: "start", text: "Are we still on for the design review at 2?" },
  { align: "end", text: "Yes, I'll be there." },
  { align: "start", text: "Great, I'll share the deck beforehand." },
  { align: "end", text: "Sounds good, thanks!" },
] as const;

const BubbleAlignment = () => {
  return (
    <div className="flex w-full max-w-90 flex-col gap-4">
      {MESSAGES.map(({ align, text }, index) => (
        <Bubble
          key={index}
          align={align}
          variant={align === "end" ? "default" : "secondary"}
          className={
            align === "end"
              ? "*:data-[slot=bubble-content]:bg-blue-500! *:data-[slot=bubble-content]:text-white!"
              : undefined
          }
        >
          <BubbleContent>{text}</BubbleContent>
        </Bubble>
      ))}
    </div>
  );
};

export default BubbleAlignment;
