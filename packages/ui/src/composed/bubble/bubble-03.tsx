// @ts-nocheck
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@default/ui/primitives/bubble";

const SENT_BURST = [
  "You tell me, it was working an hour ago.",
  "Nothing changed on my end.",
  "Check the last deploy, that's probably it.",
];

const SENT_BUBBLE_CLASS =
  "*:data-[slot=bubble-content]:bg-blue-500! *:data-[slot=bubble-content]:text-white!";

const BubbleGroupDemo = () => {
  return (
    <div className="flex w-full max-w-90 flex-col gap-6">
      <Bubble variant="secondary" align="start">
        <BubbleContent>The staging build is broken again.</BubbleContent>
      </Bubble>

      <BubbleGroup>
        {SENT_BURST.map((text, index) => (
          <Bubble key={index} align="end" className={SENT_BUBBLE_CLASS}>
            <BubbleContent>{text}</BubbleContent>
            {index === SENT_BURST.length - 1 && (
              <BubbleReactions
                align="start"
                role="img"
                aria-label="Reaction: eyes"
              >
                <span>👀</span>
              </BubbleReactions>
            )}
          </Bubble>
        ))}
      </BubbleGroup>

      <Bubble variant="secondary" align="start">
        <BubbleContent>
          On it, comparing this deploy against yesterday's now.
        </BubbleContent>
      </Bubble>
    </div>
  );
};

export default BubbleGroupDemo;
