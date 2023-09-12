import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';

export const parseMdToJson = (markdown) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify);

  const ast = processor.parse(markdown);
  const result = processor.runSync(ast);
  return astToJson(result);
};

const astToJson = (node) => {
  return {
    type: node.type,
    children: node.children ? node.children.map(astToJson) : undefined,
    value: node.value,
  };
};