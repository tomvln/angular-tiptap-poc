import { Injector } from '@angular/core';
import { Node } from '@tiptap/core';
import { AngularNodeViewRenderer } from 'ngx-tiptap';
import BaseWidgetExtension from '../base/base-widget.extension';
import { TweetWidgetComponent } from './tweet-widget.component';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tweet: {
      setTweet: (attributes: { id: string }) => ReturnType;
    };
  }
}

function markdownitTweetParser(state, startLine, endLine, silent) {
  const pos = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];

  // Check if the line starts with "{{tweet"
  if (pos + 7 > max || state.src.slice(pos, pos + 7) !== '{{tweet')
    return false;

  // Find the end of the block
  let nextLine = startLine;
  while (nextLine < endLine) {
    console.log('nextLine', nextLinsdfe);
    const endNextLine = state.eMarks[nextLine];
    if (state.src.slice(state.eMarks[nextLine], -2) === '}}') break;
    if (state.src.slice(state.eMarks[nextLine], -2) === '}}') break;
    nextLine++;
  }

  const content = state.src.slice(pos, state.eMarks[nextLine - 1]);

  const params = content.slice(7, -2).trim();

  // silent mode is for probing, and we should not output anything
  if (!silent) {
    // create token
    const token = state.push('tweet', '', 0);
    token.info = params;
    token.map = [startLine, nextLine];
    token.markup = content;
  }

  state.line = nextLine;

  return true;
}

const markdownitTweet = (md) => {
  md.block.ruler.after('fence', 'tweet', markdownitTweetParser);

  md.renderer.rules.tweet = function (tokens, idx) {
    const token = tokens[idx];
    return `<app-tweet-widget ${token.info}></app-tweet-widget>`;
  };
};

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
        id: {
          default: null,
        },
      };
    },
    addStorage() {
      return {
        markdown: {
          parse: {
            setup(markdownit) {
              markdownit.use(markdownitTweet);
            },
          },
        },
      };
    },
  });
};

export default TweetWidgetExtension;
