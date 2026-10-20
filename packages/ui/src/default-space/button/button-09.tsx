// @ts-nocheck
import { Button } from "@default/ui/primitives/button";
import { Redo2, Undo2 } from "lucide-react";

const ButtonOutlineWithIconDemo = () => {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {/*  */}
      <div className="group">
        <Button
          variant="outline"
          className="rounded-lg group-hover:-translate-y-1 transition-transform duration-200 cursor-pointer"
        >
          <Undo2 size={16} />
          Undo
        </Button>
      </div>
      {/*  */}
      <div className="group">
        <Button
          variant="outline"
          className="rounded-lg group-hover:-translate-y-1 transition-transform duration-200 cursor-pointer"
        >
          Redo
          <Redo2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ButtonOutlineWithIconDemo;
