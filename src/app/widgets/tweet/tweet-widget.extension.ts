import { Injector } from '@angular/core';
import { Node } from '@tiptap/core';
import { AngularNodeViewRenderer } from 'ngx-tiptap';
import BaseWidgetExtension from '../base/base-widget.extension';
import { TweetWidgetComponent } from './tweet-widget.component';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tweet: {
      setTweet: (attributes: { tweetId: string }) => ReturnType;
    };
  }
}

const TweetWidgetExtension = (injector: Injector): Node => {
  return BaseWidgetExtension.extend({
    name: 'tweet-widget',
    parseHTML() {
      return [{ tag: 'app-tweet-widget' }];
    },
    renderHTML({ HTMLAttributes }) {
      return ['app-tweet-widget', HTMLAttributes];
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
        align: {
          default: 'center',
        },
        tweetId: {
          default: null,
        },
      };
    },
  });
};

export default TweetWidgetExtension;
