import * as content from './editor-content.json';
import BaseWidget from './widgets/base/base-widget.extension';
import TweetWidget from './widgets/tweet/tweet-widget.extension';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Editor } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import CharacterCount from '@tiptap/extension-character-count';
import History from '@tiptap/extension-history';
import TextAlign from '@tiptap/extension-text-align';
import prettifyHTML from 'prettify-html';
import Dropcursor from '@tiptap/extension-dropcursor';
import Focus from '@tiptap/extension-focus';
import Placeholder from '@tiptap/extension-placeholder';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnDestroy {
  name = 'Angular';

  content = content; // can be HTML or JSON, see https://www.tiptap.dev/api/editor#content

  editor = new Editor({
    extensions: [
      // Nodes
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [2, 3],
      }),
      BulletList,
      OrderedList,
      ListItem,
      // Marks
      Bold.configure({}),
      Italic,
      Link.configure({
        protocols: ['http', 'https'],
        openOnClick: false,
      }),
      // Extensions
      CharacterCount,
      History,
      TextAlign.configure({
        types: ['tweet-widget'],
        alignments: ['left', 'center', 'right'],
      }),
      Dropcursor.configure({
        class: 'drop-cursor',
      }),
      Focus.configure({
        mode: 'deepest',
      }),
      Placeholder.configure({
        placeholder: 'Please enter the story text here…',
      }),
      // Widgets
      BaseWidget,
      TweetWidget(this.injector),
    ],
  });

  constructor(private injector: Injector) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  setLink() {
    const url = window.prompt('url :');

    if (url) {
      this.editor.chain().focus().setLink({ href: url }).run();
    } else {
      this.editor.chain().focus().unsetLink().run();
    }
  }

  setTweet() {
    const tweetId = window.prompt('tweet id :');

    if (tweetId) {
      this.editor.chain().focus().setTweet({ tweetId }).run();
    }
  }

  stringify(value: any) {
    return JSON.stringify(value, null, 2);
  }

  formatHtml(html: string) {
    return prettifyHTML(html);
  }

  isWidgetSelected(props) {
    return (
      !props.state.selection.empty &&
      props.state.selection
        .content()
        .content.content[0].type.name.includes('widget')
    );
  }

  isTextSelected(props) {
    return (
      !props.state.selection.empty &&
      props.state.selection.visible &&
      !props.state.selection
        .content()
        .content.content[0].type.name.includes('widget')
    );
  }
}
