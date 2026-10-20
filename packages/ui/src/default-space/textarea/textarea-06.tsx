// @ts-nocheck
"use client";

import { useId, useState } from "react";

import { Label } from "@default/ui/primitives/label";
import { Textarea } from "@default/ui/primitives/textarea";

export const title = "Textarea with Character Count";

const TextareaWithCharacterCount = () => {
  const id = useId();
  const [value, setValue] = useState("");
  const maxLength = 150;

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Label htmlFor={id}>Message</Label>
      <Textarea
        className="bg-background"
        id={id}
        maxLength={maxLength}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Share your message here !"
        value={value}
      />
      <p className={`text-right text-sm text-muted-foreground ${value.length === maxLength ? 'text-teal-500' : ''}`}>
        {value.length}/{maxLength}
      </p>
    </div>
  );
};

export default TextareaWithCharacterCount;
