import { Card } from "@/components/ui/card";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  return (
    <Card className="code-block rounded-lg p-4 text-sm overflow-x-auto">
      <pre className="text-green-400">
        <code dangerouslySetInnerHTML={{ 
          __html: code
            .replace(/\/\/ .+/g, '<span class="text-blue-400">$&</span>')
            .replace(/\b(const|let|var|async|await|function|return|import|export|class|new)\b/g, '<span class="text-yellow-400">$&</span>')
            .replace(/\b[A-Z][a-zA-Z]+\b/g, '<span class="text-purple-400">$&</span>')
            .replace(/'[^']*'/g, '<span class="text-green-300">$&</span>')
            .replace(/"[^"]*"/g, '<span class="text-green-300">$&</span>')
            .replace(/\b\w+(?=:)/g, '<span class="text-blue-300">$&</span>')
        }} />
      </pre>
    </Card>
  );
}
