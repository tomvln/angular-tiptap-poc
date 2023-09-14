import { Node } from '@tiptap/core';
import { AngularNodeViewRenderer } from 'ngx-tiptap';
import { markdownitWidgetPlugin } from './markdownit-widget-plugin';
import { WidgetActionAlign } from './widget-actions.enum';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    base: {
      setAlign: (align: string) => ReturnType;
    };
  }
}

export class WidgetExtensionFactory {
  private static BASE_COMMANDS = {
    setAlign:
      (align) =>
      ({ commands, tr }) => {
        tr.curSelection.node.attrs.align = align;
        return commands.focus();
      },
  };

  private static BASE_ATTRIBUTES = {
    align: {
      default: WidgetActionAlign.CENTER,
    },
  };

  public static create = (
    injector,
    options: {
      name: string;
      component: any;
      commands: any;
      attributes: any;
      baseActions?: string[];
    }
  ): Node => {
    const [baseCommands, baseAttributes] =
      WidgetExtensionFactory.getBaseActions(options?.baseActions);

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

  private static filterActions(actions, keys: string[]) {
    return Object.keys(actions)
      .filter((key: string) =>
        keys.includes(key.toLowerCase().replace(/^set/, ''))
      )
      .reduce((obj, key: string) => {
        return Object.assign(obj, {
          [key]: actions[key],
        });
      }, {});
  }

  private static getBaseActions(actionNames: string[] = []) {
    return [
      WidgetExtensionFactory.filterActions(
        WidgetExtensionFactory.BASE_COMMANDS,
        actionNames
      ),
      WidgetExtensionFactory.filterActions(
        WidgetExtensionFactory.BASE_ATTRIBUTES,
        actionNames
      ),
    ];
  }
}
