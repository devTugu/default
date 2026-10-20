// @ts-nocheck
import { CodeBlock } from "@default/ui/primitives/code-block";

const code = `import { Button } from "@default/ui/primitives/button"

export function MyComponent() {
  return <Button>Click me</Button>
}`;

export default function CodeBlockDefault() {
  return (
    <div className="w-full max-w-lg">
      <CodeBlock code={code} filename="index.tsx" language="tsx" />
    </div>
  );
}
