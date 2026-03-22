"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";

const components: Components = {
  h2: ({ children }) => <h2 className="article-h2">{children}</h2>,
  h3: ({ children }) => <h3 className="article-h3">{children}</h3>,
  table: ({ children }) => (
    <table className="schedule-table">{children}</table>
  ),
};

export default function ArticleBody({ content }: { content: string }) {
  return (
    <div className="article-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
