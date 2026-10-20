// @ts-nocheck
import { useId } from "react";

import { Label } from "@default/ui/primitives/label";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@default/ui/primitives/input-group";

const InputEndButtonDemo = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id}>Input with end button</Label>
      <InputGroup className="shadow-xs overflow-hidden">
        <InputGroupInput
          id={id}
          type="email"
          placeholder="Email address"
          className="pl-3"
        />
        <InputGroupButton
          variant="default"
          className="bg-primary h-9 px-3 hover:bg-primary/90 rounded-e-md cursor-pointer"
        >
          Subscribe
        </InputGroupButton>
      </InputGroup>
    </div>
  );
};

export default InputEndButtonDemo;
