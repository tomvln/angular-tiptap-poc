import { Injector } from '@angular/core';
import { Node } from '@tiptap/core';
import { WidgetExtensionFactory } from '../base/widget-extension-factory';
import { TweetWidgetComponent } from './tweet-widget.component';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tweet: {
      setTweet: (attributes: { id: string }) => ReturnType;
    };
  }
}

const name = 'tweet';

const TweetWidgetExtension = (injector: Injector): Node =>
  WidgetExtensionFactory.create(injector, {
    name,
    component: TweetWidgetComponent,
    commands: {
      setTweet:
        (attributes) =>
        ({ commands }) => {
          return commands.setNode(name, attributes);
        },
    },
    attributes: {
      id: {
        default: null,
      },
    },
    baseActions: ['align'],
  });

export default TweetWidgetExtension;
