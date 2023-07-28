import 'zone.js/dist/zone';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Editor } from '@tiptap/core';
import prettifyHTML from 'prettify-html';
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
import Tweet from './widgets/tweet/tweet.extension';
import * as content from './editor-content.json';

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
      Bold,
      Italic,
      Link.configure({
        protocols: ['http', 'https'],
        openOnClick: false,
      }),
      // Extensions
      CharacterCount,
      // Widgets
      Tweet(this.injector),
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
}
