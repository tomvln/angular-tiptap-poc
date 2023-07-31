import { Injector } from '@angular/core';
import { Node } from '@tiptap/core';
import { AngularNodeViewRenderer } from 'ngx-tiptap';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    base: {
      setAlign: (align: string) => ReturnType;
    };
  }
}

const BaseWidgetExtension = Node.create({
  group: 'block',
  content: 'inline*',
  draggable: true,
  selectable: true,
  atom: true,
  addCommands() {
    return {
      setAlign:
        (align) =>
        ({ commands, tr }) => {
          tr.curSelection.node.attrs.align = align
          return commands.focus()
        },
    };
  },
  addAttributes() {
    return {
      align: {
        default: 'center',
      },
    };
  },
});

export default BaseWidgetExtension;
