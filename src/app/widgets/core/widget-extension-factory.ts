import { Node } from '@tiptap/core';
import { AngularNodeViewRenderer } from 'ngx-tiptap';
import { markdownitWidgetPlugin } from './markdown-it/markdownit-widget-plugin';
import { WidgetActionAlign } from './widget-actions.enum';
import { unescapeHTML } from '../../utils/unescape-html.util';
import { clone } from '../../utils/clone.util';

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
    },
  ): Node => {
    const [widgetCommands, widgetAttributes] = WidgetExtensionFactory.getWidgetActions(options?.actions);

    return Node.create({
      name: `${options.name}-widget`,
      group: 'block',
      content: 'inline?',
      draggable: true,
      selectable: true,
      atom: true,
      parseHTML() {
        return [{ tag: `app-${options.name}-widget` }];
      },
      renderHTML({ HTMLAttributes }) {
        const attributes = clone(HTMLAttributes);
        const content = unescapeHTML(attributes.content);
        delete attributes.content;
        return [`app-${options.name}-widget`, attributes, content];
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
          ...(options.withContent && {
            content: {
              default: null,
            },
          }),
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
            serialize(state, node) {
              const attributes = clone(node.attrs);
              const content = unescapeHTML(attributes.content)
              delete attributes.content

              const attrsString = Object.keys(attributes).reduce(
                (p, c) => p + `${c}="${attributes[c]}" `,
                ''
              );

              state.write(
                `{{${options.withContent ? '#' : ''}${
                  options.name
                } ${attrsString}}}`
              );

              if (options.withContent) {
                state.write(content);
                state.flushClose(1);
                state.write(`{{/${options.name}}}`);
              }
              
              state.closeBlock(node);
            },
          },
        };
      },
    });
  };

  private static filterActions(actions, keys: string[]) {
    return Object.keys(actions)
      .filter((key: string) => keys.includes(key.toLowerCase().replace(/^set/, '')))
      .reduce((obj, key: string) => {
        return Object.assign(obj, {
          [key]: actions[key],
        });
      }, {});
  }

  private static getWidgetActions(actions: string[] = []) {
    return [
      WidgetExtensionFactory.filterActions(WidgetExtensionFactory.WIDGET_COMMANDS, actions),
      WidgetExtensionFactory.filterActions(WidgetExtensionFactory.WIDGET_ATTRIBUTES, actions),
    ];
  }
}
