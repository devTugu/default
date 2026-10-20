// @ts-nocheck
import { Button } from "@default/ui/primitives/button";
import { ButtonGroup } from "@default/ui/primitives/button-group";
import { Edit2, Copy, Trash2 } from "lucide-react";

export default function BasicButtonGroupDemo() {
  return (
    <>
      <ButtonGroup>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <Edit2 className="size-4" />
        </Button>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <Copy className="size-4" />
        </Button>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </ButtonGroup>
    </>
  );
}
