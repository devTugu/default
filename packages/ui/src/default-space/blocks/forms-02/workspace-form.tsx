// @ts-nocheck
"use client";
import { Field, FieldLabel } from "@default/ui/primitives/field";
import { Input } from "@default/ui/primitives/input";
import { Button } from "@default/ui/primitives/button";
import { Textarea } from "@default/ui/primitives/textarea";
import { Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue } from "@default/ui/primitives/select";
import { InputGroup,InputGroupAddon,InputGroupButton,InputGroupInput } from "@default/ui/primitives/input-group";
import { Copy, Check } from "lucide-react";
import * as React from "react";

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
}: {
  timeout?: number;
  onCopy?: () => void;
} = {}) {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard.writeText) {
      return;
    }

    if (!value) return;

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      if (onCopy) {
        onCopy();
      }

      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    }, console.error);
  };

  return { isCopied, copyToClipboard };
}

const WorkspaceForm = () => {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <div className="space-y-4 px-6">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
        <Field>
          <FieldLabel
            htmlFor="firstname"
            className="text-base text-foreground font-medium"
          >
            Current Plane
          </FieldLabel>
          <div className="flex justify-between items-center outline outline-border rounded-lg px-2.5 py-1 shadow-xs">
            <p className="text-base font-medium">Starter</p>
            <Button
              size={"sm"}
              className="rounded-lg cursor-pointer hover:bg-primary/80 shadow-xs"
            >
              Upgrade Plane
            </Button>
          </div>
        </Field>
        <Field>
          <FieldLabel
            htmlFor="name"
            className="text-base text-foreground font-medium"
          >
            Workspace Name
          </FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Sunil's Team"
            className="dark:bg-background h-9 text-sm shadow-xs text-foreground"
          />
        </Field>
      </div>
      <Field>
        <FieldLabel
          htmlFor="description"
          className="text-base text-foreground font-medium"
        >
          Workspace Description
        </FieldLabel>
        <Textarea
          id="description"
          placeholder="Workspace Desccription"
          className="dark:bg-background h-9 text-sm shadow-xs text-foreground"
        />
      </Field>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
        <Field>
          <FieldLabel
            htmlFor="Visibility"
            className="text-base text-foreground font-medium"
          >
            Workspace Visibility
          </FieldLabel>
          <Select defaultValue="Public">
            <SelectTrigger id="visibility" className="w-full">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Public">Public - Anyone can view</SelectItem>
                <SelectItem value="Private">
                  Private - Only team members
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel
            htmlFor="invite"
            className="text-base text-foreground font-medium"
          >
            Workspace Invite Link
          </FieldLabel>
          <InputGroup id="invite">
            <InputGroupInput value="xyz.workspace.link" readOnly />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Copy"
                title="Copy"
                size="icon-xs"
                onClick={() => {
                  copyToClipboard("xyz.workspace.link");
                }}
              >
                {isCopied ? <Check /> : <Copy />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </div>
    </div>
  );
};

export default WorkspaceForm;
