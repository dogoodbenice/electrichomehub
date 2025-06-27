import { Card } from "@/components/ui/card";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  const highlightedCode = code
    // Comments (green)
    .replace(/\/\/ .+/g, '<span class="text-green-400 italic">$&</span>')
    // Keywords (blue)
    .replace(/\b(const|let|var|async|await|function|return|import|export|class|new|console)\b/g, '<span class="text-blue-400 font-medium">$&</span>')
    // Method names (yellow)
    .replace(/\.(\w+)(?=\()/g, '.<span class="text-yellow-400">$1</span>')
    // Strings (green)
    .replace(/"([^"]*)"/g, '"<span class="text-green-300">$1</span>"')
    .replace(/'([^']*)'/g, (match, p1) => `'<span class="text-green-300">${p1}</span>'`)
    // Object keys (cyan)
    .replace(/(\s+)"(\w+)":/g, '$1"<span class="text-cyan-400">$2</span>":')
    // Numbers (orange)
    .replace(/:\s*(\d+)/g, ': <span class="text-orange-400">$1</span>')
    // Class names (purple)
    .replace(/\b([A-Z][a-zA-Z]+)(?=\()/g, '<span class="text-purple-400">$1</span>')
    // Booleans and null (red)
    .replace(/\b(true|false|null)\b/g, '<span class="text-red-400">$1</span>');

  return (
    <div className="relative">
      {/* Terminal header */}
      <div className="bg-gray-800 rounded-t-lg px-4 py-2 flex items-center space-x-2 border-b border-gray-700">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 text-xs ml-4 font-mono">api-response.js</span>
      </div>
      
      {/* Code content */}
      <Card className="rounded-t-none rounded-b-lg bg-gray-900 border-t-0 border-gray-700">
        <div className="p-4 overflow-x-auto">
          <pre className="text-gray-300 text-sm font-mono leading-relaxed">
            <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          </pre>
        </div>
      </Card>
    </div>
  );
}
