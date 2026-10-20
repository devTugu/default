// @ts-nocheck
import { Bubble, BubbleContent, BubbleReactions } from "@default/ui/primitives/bubble";
import { Button } from "@default/ui/primitives/button";

const SENT_BUBBLE_CLASS =
  "*:data-[slot=bubble-content]:bg-blue-500! *:data-[slot=bubble-content]:text-white!";

const BubbleReactionsDemo = () => {
  return (
    <div className="flex w-full max-w-90 flex-col gap-8">
      <Bubble variant="secondary" align="start">
        <BubbleContent>
          I never write tests, ship first, ask questions later.
        </BubbleContent>
        <BubbleReactions
          align="start"
          role="img"
          aria-label="Reactions: laughing, fire"
        >
          <span>😂</span>
          <span>🔥</span>
        </BubbleReactions>
      </Bubble>

      <Bubble variant="secondary" align="start">
        <BubbleContent>
          Living dangerously. Let me know when it breaks.
        </BubbleContent>
        <BubbleReactions
          role="img"
          aria-label="Reactions: eyes, popcorn, and 3 more"
        >
          <span>👀</span>
          <span>🍿</span>
          <span>+3</span>
        </BubbleReactions>
      </Bubble>

      <Bubble align="end" className={SENT_BUBBLE_CLASS}>
        <BubbleContent>
          Relax, it&apos;s been running clean for a week now.
        </BubbleContent>
        <BubbleReactions
          side="top"
          align="start"
          role="img"
          aria-label="Reaction: party popper"
        >
          <span>🎉</span>
        </BubbleReactions>
      </Bubble>

      <Bubble variant="destructive" align="start">
        <BubbleContent>This will wipe the cache, are you sure?</BubbleContent>
        <BubbleReactions align="start">
          <Button size="xs" variant="secondary" className="cursor-pointer">
            Go ahead
          </Button>
        </BubbleReactions>
      </Bubble>
    </div>
  );
};

export default BubbleReactionsDemo;
