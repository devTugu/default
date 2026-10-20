// @ts-nocheck
import { Button } from "@default/ui/primitives/button";
import { X } from "lucide-react";

const ButtonCancelDemo = () => {
  return (
    <div className="group">
      <Button className="group-hover:-translate-y-1 transition-transform duration-200 bg-red-500 text-white hover:bg-red-500/80 cursor-pointer">
        <X className="size-4" />
        Cancel
      </Button>
    </div>
  );
};

export default ButtonCancelDemo;
