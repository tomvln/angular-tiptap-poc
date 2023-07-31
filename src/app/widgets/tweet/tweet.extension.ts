import { Injector } from '@angular/core';
import { Node, mergeAttributes } from '@tiptap/core';
import { AngularNodeViewRenderer } from 'ngx-tiptap';
import { TweetWidgetComponent } from './tweet-widget.component';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tweet: {
      setTweet: (attributes: { tweetId: string }) => ReturnType;
    };
  }
}

const TweetExtension = (injector: Injector): Node => {
  return Node.create({
    name: 'tweet-widget',
    group: 'block',
    content: 'inline*',
    draggable: true,
    selectable: true,
    atom: true,
    parseHTML() {
      return [{ tag: 'app-tweet-widget' }];
    },
    renderHTML({ HTMLAttributes }) {
      return [
        'app-tweet-widget',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      ];
    },
    addNodeView() {
      return AngularNodeViewRenderer(TweetWidgetComponent, { injector });
    },
    addCommands() {
      return {
        setTweet:
          (attributes) =>
          ({ commands }) => {
            return commands.setNode(this.name, attributes);
          },
      };
    },
    addAttributes() {
      return {
        textAlign: {
          default: 'center',
          renderHTML: (attributes) => {
            return {
              textAlign: attributes.textAlign,
            };
          },
        },
        tweetId: {
          default: null,
          renderHTML: (attributes) => {
            return {
              tweetId: attributes.tweetId,
            };
          },
        },
      };
    },
  });
};

export default TweetExtension;
