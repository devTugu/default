// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@default/ui/primitives/checkbox";
import { Label } from "@default/ui/primitives/label";

const items = ["Nike", "Adidas", "Puma"];

type CheckedState = boolean | "indeterminate";

const CheckboxTreeDemo = () => {
  const [checked, setChecked] = useState<CheckedState>("indeterminate");
  const [selected, setSelected] = useState<string[]>(["Nike", "Adidas"]);

  useEffect(() => {
    if (selected.length === items.length) {
      setChecked(true);
    } else if (selected.length > 0) {
      setChecked("indeterminate");
    } else {
      setChecked(false);
    }
  }, [selected]);

  const handleCheckedChange = (checked: CheckedState) => {
    setChecked(checked);

    if (checked === true) {
      setSelected([...items]);
    } else if (checked === false) {
      setSelected([]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox
          id="Brands"
          checked={checked === true}
          onCheckedChange={handleCheckedChange}
          className="cursor-pointer"
        />
        <Label htmlFor="Brands" className="cursor-pointer">
          Brands radix
        </Label>
      </div>
      <div className="flex flex-col gap-2 pl-6">
        {items.map((label) => (
          <div key={label} className="flex items-center gap-2">
            <Checkbox
              id={label}
              checked={selected.includes(label)}
              onCheckedChange={(checked) =>
                setSelected(
                  checked
                    ? [...selected, label]
                    : selected.filter((item) => item !== label),
                )
              }
              className="cursor-pointer"
            />
            <Label
              htmlFor={label}
              className="text-muted-foreground cursor-pointer"
            >
              {label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxTreeDemo;
