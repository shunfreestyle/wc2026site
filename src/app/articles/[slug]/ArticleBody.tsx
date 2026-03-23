"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";
import { useLanguage } from "@/contexts/LanguageContext";

const components: Components = {
  h2: ({ children }) => <h2 className="article-h2">{children}</h2>,
  h3: ({ children }) => <h3 className="article-h3">{children}</h3>,
  table: ({ children }) => (
    <table className="schedule-table">{children}</table>
  ),
};

export default function ArticleBody({ content }: { content: string }) {
  const { locale } = useLanguage();
  return (
    <div className="article-body" lang={locale === "en" ? "en" : "ja"}>
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
