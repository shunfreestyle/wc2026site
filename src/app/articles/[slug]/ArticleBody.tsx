"use client";

import ReactMarkdown from "react-markdown";

export default function ArticleBody({ content }: { content: string }) {
  return (
    <article className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-a:text-blue-600 prose-li:text-gray-700 prose-table:text-sm">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
