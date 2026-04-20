import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div className={cn(
      "prose prose-sm prose-invert max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground prose-strong:text-foreground prose-strong:font-bold prose-ul:list-disc prose-ol:list-decimal prose-a:text-accent hover:prose-a:underline",
      className
    )}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
