// @ts-nocheck
import { Button } from "@default/ui/primitives/button";
import { ButtonGroup } from "@default/ui/primitives/button-group";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  MenuIcon,
} from "lucide-react";

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon-sm" aria-label="Align left">
        <AlignLeftIcon aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="Align center">
        <AlignCenterIcon aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="Align right">
        <AlignRightIcon aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="Align justify">
        <MenuIcon aria-hidden="true" />
      </Button>
    </ButtonGroup>
  );
}