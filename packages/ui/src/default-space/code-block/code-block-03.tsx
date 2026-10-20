// @ts-nocheck
import { CodeBlock } from "@default/ui/primitives/code-block";

const code = `import { Button } from "@default/ui/primitives/button"

export default function ButtonDemo() {
  return <Button size="sm">@default/ui</Button>
}`;

export default function CodeBlockCustomBg() {
  return (
    <div className="w-full max-w-lg">
      <CodeBlock
        code={code}
        filename="button.tsx"
        language="tsx"
        showLineNumbers
        bodyClassName="bg-blue-500/20"
      />
    </div>
  );
}
