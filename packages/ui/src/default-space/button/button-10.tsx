// @ts-nocheck
import { Button } from "@default/ui/primitives/button";
import { CheckCheck } from "lucide-react";

const ButtonSaveDemo = () => {
  return (
    <div className="group">
      <Button className="group-hover:-translate-y-1 transition-transform duration-200 bg-green-500 text-white hover:bg-green-500/80 cursor-pointer">
        <CheckCheck className="size-4" />
        Save Changes
      </Button>
    </div>
  );
};

export default ButtonSaveDemo;
