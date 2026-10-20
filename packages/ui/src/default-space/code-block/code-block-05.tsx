// @ts-nocheck
import { MultiFileCodeBlock } from "@default/ui/primitives/code-block";
import type { FileEntry } from "@default/ui/primitives/code-block";

const files: FileEntry[] = [
  {
    filename: "avatar.tsx",
    language: "tsx",
    code: `import { Avatar, AvatarFallback, AvatarImage } from "@default/ui/primitives/avatar"

export default function AvatarComponent() {
  return (
    <Avatar>
      <AvatarImage src="https://images.shadcnspace.com/assets/profiles/ben.webp" />
      <AvatarFallback className="text-xs">B</AvatarFallback>
    </Avatar>
  )
}`,
  },
  {
    filename: "button.tsx",
    language: "tsx",
    code: `import { Button } from "@default/ui/primitives/button"

export default function ButtonComponent() {
  return (
    <Button variant="outline" size="sm">
      default
    </Button>
  )
}`,
  },
];

export default function CodeBlockMultiFile() {
  return (
    <div className="w-full max-w-lg">
      <MultiFileCodeBlock
        files={files}
        showLineNumbers
        scrollable
        maxHeight={260}
      />
    </div>
  );
}
