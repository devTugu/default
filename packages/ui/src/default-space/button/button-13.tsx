// @ts-nocheck
import { Button } from "@default/ui/primitives/button";

const ButtonSizeDemo = () => {
  return (
    <div className="group">
      <Button
        size={"xs"}
        className="text-xs group-hover:-translate-y-1 transition-transform duration-200 cursor-pointer"
      >
        Button Size: xs
      </Button>
    </div>
  );
};

export default ButtonSizeDemo;
