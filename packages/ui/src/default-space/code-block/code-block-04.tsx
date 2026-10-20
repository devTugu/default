// @ts-nocheck
import { CodeBlock } from "@default/ui/primitives/code-block";

const code = `import { Button } from "@default/ui/primitives/button"

export default function ButtonDemo() {
  return <Button variant="outline">default</Button>
}`;

export default function CodeBlockHighlighted() {
  return (
    <div className="w-full max-w-lg">
      <CodeBlock
        code={code}
        filename="button.tsx"
        language="tsx"
        showLineNumbers
        highlightLines={[4]}
      />
    </div>
  );
}
