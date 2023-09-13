import { Node } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    base: {
      setAlign: (align: string) => ReturnType;
    };
  }
}

const BaseWidgetExtension = Node.create({
  group: 'block',
  content: 'block*',
  draggable: true,
  selectable: true,
  atom: true,
});

export default BaseWidgetExtension
