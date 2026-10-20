// @ts-nocheck
import { Button } from "@default/ui/primitives/button";

const ButtonSizeDemo = () => {
  return (
    <div className="group">
      <Button
        size={"lg"}
        className="group-hover:-translate-y-1 transition-transform duration-200 cursor-pointer"
      >
        Button Size: lg
      </Button>
    </div>
  );
};

export default ButtonSizeDemo;
