// @ts-nocheck
import { Bubble, BubbleContent } from "@default/ui/primitives/bubble";

const BubbleLinksAndButtons = () => {
  return (
    <div className="flex w-full max-w-90 flex-col gap-3">
      <Bubble variant="secondary" align="start">
        <BubbleContent>Need help getting back into your account?</BubbleContent>
      </Bubble>

      <Bubble align="start">
        <BubbleContent asChild>
          <button type="button" className="cursor-pointer">
            Reset my password
          </button>
        </BubbleContent>
      </Bubble>

      <Bubble variant="outline" align="start">
        <BubbleContent asChild>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Read our security FAQ
          </a>
        </BubbleContent>
      </Bubble>
    </div>
  );
};

export default BubbleLinksAndButtons;
