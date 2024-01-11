import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkCodeBlocks from 'remark-code-blocks';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import './code-blocks.css';

function customMarkdownTransformer(markdown: any) {
  return markdown
    .replace(/:x:/g, '--') // Replace :x: with a red 'X' mark
    .replace(/:heavy_check_mark:/g, '✔️'); // Replace :heavy_check_mark: with a green check mark
}

const MarkdownRenderer: React.FC<{ markdown: string }> = ({ markdown }) => {
  const transformedMarkdown = customMarkdownTransformer(markdown);

  const codeBlockOptions = {
    transformer: (node: any) => {
      if (node.type === 'code') {
        const html = Prism.highlight(node.value, Prism.languages.json, 'json');
        return {
          ...node,
          type: 'html',
          value: `<pre class="code-block"><code>${html}</code></pre>`,
        };
      }
      return node;
    },
  };
  return (
    <ReactMarkdown
      children={transformedMarkdown}
      remarkPlugins={[remarkGfm, [remarkCodeBlocks, codeBlockOptions]]}
    />
  );
};

export default MarkdownRenderer;
