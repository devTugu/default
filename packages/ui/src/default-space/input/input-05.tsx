// @ts-nocheck
import { useId } from "react";
import { Label } from "@default/ui/primitives/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@default/ui/primitives/select";
import { InputGroup, InputGroupInput } from "@default/ui/primitives/input-group";

const InputStartSelectDemo = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id}>Phone Number</Label>
      <InputGroup>
        <Select defaultValue="+91">
          <SelectTrigger
            data-slot="input-group-control"
            className="rounded-md rounded-r-none border-y-0 border-l-0 border-r bg-transparent pr-2 shadow-none focus-visible:ring-0 focus-visible:z-1"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="+91" className="pr-2 [&_svg]:hidden">
              +91
            </SelectItem>
            <SelectItem value="+1" className="pr-2 [&_svg]:hidden">
              +1
            </SelectItem>
            <SelectItem value="+44" className="pr-2 [&_svg]:hidden">
              +44
            </SelectItem>
            <SelectItem value="+971" className="pr-2 [&_svg]:hidden">
              +971
            </SelectItem>
            <SelectItem value="+33" className="pr-2 [&_svg]:hidden">
              +33
            </SelectItem>
            <SelectItem value="+49" className="pr-2 [&_svg]:hidden">
              +49
            </SelectItem>
          </SelectContent>
        </Select>
        <InputGroupInput
          id={id}
          className="h-full pl-3"
          placeholder="1234567890"
          type="tel"
        />
      </InputGroup>
    </div>
  );
};

export default InputStartSelectDemo;
