import { Node } from '@tiptap/core';
import { AngularNodeViewRenderer } from 'ngx-tiptap';
import { markdownitWidgetPlugin } from './markdownit-widget.plugin';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    base: {
      setAlign: (align: string) => ReturnType;
    };
  }
}

const BASE_COMMANDS = {
  setAlign:
    (align) =>
    ({ commands, tr }) => {
      tr.curSelection.node.attrs.align = align;
      return commands.focus();
    },
};

const BASE_ATTRIBUTES = {
  align: {
    default: 'center',
  },
};

const filterActions = (actions, keys: string[]) =>
  Object.keys(actions)
    .filter((key: string) =>
      keys.includes(key.toLowerCase().replace(/^set/, ''))
    )
    .reduce((obj, key: string) => {
      return Object.assign(obj, {
        [key]: actions[key],
      });
    }, {});

const getBaseActions = (actionNames: string[] = []) => [
  filterActions(BASE_COMMANDS, actionNames),
  filterActions(BASE_ATTRIBUTES, actionNames),
];

export const createWidgetExtension = (
  injector,
  options: {
    name: string;
    component: any;
    commands: any;
    attributes: any;
    baseActions?: string[];
  }
) => {
  const [baseCommands, baseAttributes] = getBaseActions(options?.baseActions);

  return Node.create({
    name: `${options.name}-widget`,
    group: 'block',
    content: 'block*',
    draggable: true,
    selectable: true,
    atom: true,
    parseHTML() {
      return [{ tag: `app-${options.name}-widget` }];
    },
    renderHTML({ HTMLAttributes }) {
      return [`app-${options.name}-widget`, HTMLAttributes, 0];
    },
    addNodeView() {
      return AngularNodeViewRenderer(options.component, { injector });
    },
    addCommands() {
      return {
        ...baseCommands,
        ...options.commands,
      };
    },
    addAttributes() {
      return {
        ...baseAttributes,
        ...options.attributes,
      };
    },
    addStorage() {
      return {
        actions: options?.baseActions,
        markdown: {
          parse: {
            setup(markdownit) {
              markdownit.use(markdownitWidgetPlugin, {
                name: options.name,
                withHash: false,
              });
            },
          },
        },
      };
    },
  });
};
