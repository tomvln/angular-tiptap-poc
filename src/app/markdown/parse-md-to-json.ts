/*
import { unified } from 'unified';
import remarkParse from 'remark-parse';

type AstNode = {
  type: string;
  children?: AstNode[];
  value?: string;
};

type TiptapMark = {
  type: string;
};

type TiptapNode = {
  type: string;
  content?: TiptapNode[];
  marks?: TiptapMark[];
  text?: string;
};

export const parseMdToJson = (markdown: string) => {
  const ast = unified().use(remarkParse).parse(markdown);

  console.log('ast', ast);

  const json = convertAstNodeToTiptapNode({
    type: 'paragraph',
    children: [
      {
        type: 'strong',
        children: [
          {
            type: 'emphasis',
            children: [
              {
                type: 'text',
                value: 'foo',
              },
            ],
          },
          {
            type: 'text',
            value: 'bar',
          },
        ],
      },
      {
        type: 'text',
        value: 'baz',
      },
    ],
  });

  console.log('json', json);

  return json;
};

function convertAstNodeToTiptapNode(node: AstNode): TiptapNode {
  const content = [] as TiptapNode[];

  if (node.children) {
    for (const child of node.children) {
      if (child.type === 'text') {
        content.push({ type: 'text', text: child.value });
      } else {
        const marks: { type: string }[] = [];

        if (child.type === 'strong') {
          marks.push({ type: 'bold' });
        } else if (child.type === 'emphasis') {
          marks.push({ type: 'italic' });
        }

        content.push({
          type: 'text',
          marks,
          text: child.value,
        });
      }
    }
  } else {
    content.push({ type: 'text', text: node.value });
  }

  return { type: node.type, content };
}
*/

/*
const convertAstNodeToTiptap = (node, marks?: { type: string }[]) => {
  let convertedNode = {
    type: node.type === 'root' ? 'doc' : node.type,
  } as any;

  let markToAdd

  switch (node.type) {
    case 'root':
      convertedNode.type = 'doc';
      break;

    case 'strong':
      markToAdd = 'bold'
      break;

    case 'emphasis':
      markToAdd = 'italic'
      break;

    case 'text':
      convertedNode.type = 'text';
      convertedNode.text = node.value;
      break;

    default:
      convertedNode.type = node.type;
      break;
  }

  if (node.children) {
    convertedNode.content = [];

    for (const child of node.children) {
      convertedNode.content.push(convertAstNodeToTiptap(child));
    }
  }

  return convertedNode;
};

const addMark = (node, mark) => ({
  ...node,
  marks: [...(node.marks || []), mark],
});
*/
