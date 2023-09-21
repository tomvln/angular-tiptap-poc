import { Editor, generateHTML, Node } from '@tiptap/core';
import { AngularNodeViewRenderer } from 'ngx-tiptap';
import { markdownitWidgetPlugin } from './markdownit-widget-plugin';
import { WidgetActionAlign } from './widget-actions.enum';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    widget: {
      setAlign: (align: WidgetActionAlign) => ReturnType;
    };
  }
}

export class WidgetExtensionFactory {
  private static WIDGET_COMMANDS = {
    setAlign:
      (align: WidgetActionAlign) =>
      ({ commands, tr }) => {
        tr.curSelection.node.attrs.align = align;
        return commands.focus();
      },
  };

  private static WIDGET_ATTRIBUTES = {
    align: {
      default: WidgetActionAlign.CENTER,
    },
  };

  public static create = (
    injector,
    options: {
      name: string;
      withContent?: boolean;
      component: any;
      commands?: any;
      attributes?: any;
      actions?: string[];
    }
  ): Node => {
    const [widgetCommands, widgetAttributes] =
      WidgetExtensionFactory.getWidgetActions(options?.actions);

    return Node.create({
      name: `${options.name}-widget`,
      group: 'block',
      content: 'block?',
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
          ...widgetCommands,
          ...options.commands,
        };
      },
      addAttributes() {
        return {
          ...widgetAttributes,
          ...options.attributes,
        };
      },
      addStorage() {
        return {
          actions: options?.actions,
          markdown: {
            parse: {
              setup(markdownit) {
                markdownit.use(markdownitWidgetPlugin, {
                  name: options.name,
                  withContent: options.withContent,
                });
              },
            },
            serialize(state, node: Node, editor: Editor) {
              /*
              const attrsString = Object.keys(node.attrs).reduce(
                (p, c) => p + ` ${c}="${node.attrs[c]}"`,
                ''
              );
              state.write(
                `{{${options.withContent ? '#' : ''}${
                  options.name
                } ${attrsString} }}`
              );

              if (options.withContent) {
                console.log('node', node);
                state.write(node.content);
                state.flushClose(1);
                state.write(`{{/${options.name}}}`);
              }
              state.closeBlock(node);
              */
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

  private static getWidgetActions(actions: string[] = []) {
    return [
      WidgetExtensionFactory.filterActions(
        WidgetExtensionFactory.WIDGET_COMMANDS,
        actions
      ),
      WidgetExtensionFactory.filterActions(
        WidgetExtensionFactory.WIDGET_ATTRIBUTES,
        actions
      ),
    ];
  }
}
