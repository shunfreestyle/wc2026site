"use client";

import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import "./article.css";

const components: Components = {
  h2: ({ children }) => <h2 className="article-h2">{children}</h2>,
  h3: ({ children }) => <h3 className="article-h3">{children}</h3>,
  p: ({ children }) => <p>{children}</p>,
  strong: ({ children }) => <strong>{children}</strong>,
  table: ({ children }) => (
    <table className="schedule-table">{children}</table>
  ),
  ul: ({ children }) => <ul>{children}</ul>,
  ol: ({ children }) => <ol>{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  hr: () => <hr style={{ border: "none", borderTop: "0.5px solid #e0e0e0", margin: "2rem 0" }} />,
};

export default function ArticleBody({ content }: { content: string }) {
  return (
    <div className="article-body">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
