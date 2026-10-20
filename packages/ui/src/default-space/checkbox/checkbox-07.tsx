// @ts-nocheck
import { useId } from "react";
import { HeartIcon, Send, StarIcon } from "lucide-react";
import { Checkbox } from "@default/ui/primitives/checkbox";
import { Label } from "@default/ui/primitives/label";
import { cn } from "@default/ui/lib/cn";

const CheckboxCustomIconsDemo = () => {
  const heartId = useId();
  const starId = useId();
  const sendId = useId();

  return (
    <div className="flex items-center gap-6">
      {/* Heart */}
      <div className="flex items-center gap-1.5">
        <Checkbox id={heartId} defaultChecked className="peer sr-only" />
        <Label
          htmlFor={heartId}
          className={cn(
            "group flex items-center gap-1.5 cursor-pointer select-none",
            "peer-focus-visible:ring-ring/50 peer-focus-visible:ring-3 rounded-sm outline-none transition-all",
          )}
        >
          <div className="relative flex items-center justify-center">
            <HeartIcon className="size-5 stroke-1 group-peer-data-checked:hidden" />
            <HeartIcon className="size-5 fill-destructive stroke-destructive stroke-1 hidden group-peer-data-checked:block" />
          </div>
          <span className="text-sm font-medium text-muted-foreground group-peer-data-checked:text-destructive transition-colors">
            15k
          </span>
        </Label>
      </div>

      {/* Star */}
      <div className="flex items-center gap-1.5">
        <Checkbox id={starId} defaultChecked className="peer sr-only" />
        <Label
          htmlFor={starId}
          className={cn(
            "group flex items-center gap-1.5 cursor-pointer select-none",
            "peer-focus-visible:ring-ring/50 peer-focus-visible:ring-3 rounded-sm outline-none transition-all",
          )}
        >
          <div className="relative flex items-center justify-center">
            <StarIcon className="size-5 stroke-1 group-peer-data-checked:hidden" />
            <StarIcon className="size-5 fill-amber-300 stroke-amber-300 stroke-1 hidden group-peer-data-checked:block" />
          </div>
          <span className="text-sm font-medium text-muted-foreground group-peer-data-checked:text-amber-500 transition-colors">
            20k
          </span>
        </Label>
      </div>

      {/* Send */}
      <div className="flex items-center gap-1.5">
        <Checkbox id={sendId} defaultChecked className="peer sr-only" />
        <Label
          htmlFor={sendId}
          className={cn(
            "group flex items-center gap-1.5 cursor-pointer select-none",
            "peer-focus-visible:ring-ring/50 peer-focus-visible:ring-3 rounded-sm outline-none transition-all",
          )}
        >
          <div className="relative flex items-center justify-center">
            <Send className="size-5 stroke-1 group-peer-data-checked:hidden" />
            <Send className="size-5 fill-sky-400 stroke-sky-400 stroke-1 hidden group-peer-data-checked:block" />
          </div>
          <span className="text-sm font-medium text-muted-foreground group-peer-data-checked:text-sky-500 transition-colors">
            24k
          </span>
        </Label>
      </div>
    </div>
  );
};

export default CheckboxCustomIconsDemo;
