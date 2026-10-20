// @ts-nocheck
"use client";

import { Label } from "@default/ui/primitives/label";
import { Switch } from "@default/ui/primitives/switch";

const SwitchWithDescriptionDemo = () => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex flex-col gap-1">
      <Label htmlFor="notifications">Newsletter</Label>
      <p className="text-sm text-muted-foreground">
        Receive newsletter on your registered email
      </p>
    </div>
    <Switch id="notifications" />
  </div>
);

export default SwitchWithDescriptionDemo;
