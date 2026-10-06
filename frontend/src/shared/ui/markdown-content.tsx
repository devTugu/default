interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  const blocks = content.split(/\n\n+/);

  return (
    <div className={className}>
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={index} className="mt-8 mb-4 text-2xl font-semibold">
              {trimmed.slice(3)}
            </h2>
          );
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={index} className="mt-6 mb-3 text-xl font-semibold">
              {trimmed.slice(4)}
            </h3>
          );
        }

        if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n').filter((line) => line.startsWith('- '));
          return (
            <ul key={index} className="my-4 list-disc space-y-2 pl-6">
              {items.map((item, itemIndex) => (
                <li key={itemIndex}>{item.slice(2)}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="text-muted-foreground my-4 leading-relaxed">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}
