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

export const BaseWidgetExtension = Node.create({
  group: 'block',
  content: 'block*',
  draggable: true,
  selectable: true,
  atom: true,
});

const baseCommands = {
  setAlign:
    (align) =>
    ({ commands, tr }) => {
      tr.curSelection.node.attrs.align = align;
      return commands.focus();
    },
};

const baseAttributes = {
  align: {
    default: 'center',
  },
};

const filterObject = (object, keys: string[]) =>
  Object.keys(object)
    .filter((key: string) =>
      keys.includes(key.toLowerCase().replace(/^set/, ''))
    )
    .reduce((obj: Record<string, any>, key: string) => {
      return Object.assign(obj, {
        [key]: object[key],
      });
    }, {});

export const getBaseCommandsAndAttributes = (actionNames?: string[]) => {
  let filteredCommands = baseCommands;
  let filteredAttributes = baseAttributes;

  if (actionNames) {
    filteredCommands = filterObject(baseCommands, actionNames);
    filteredAttributes = filterObject(baseAttributes, actionNames);
  }

  return [filteredCommands, filteredAttributes];
};
