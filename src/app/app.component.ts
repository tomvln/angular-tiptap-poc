// import * as content from './editor-content/editor-content.json';
import { content } from './editor-content/editor-content.md';
import TweetWidget from './widgets/tweet/tweet-widget.extension';
import FreeformWidget from './widgets/freeform/freeform-widget.extension';
import { Component, Injector, OnDestroy } from '@angular/core';
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
import prettifyHTML from 'prettify-html';
import Dropcursor from '@tiptap/extension-dropcursor';
import Focus from '@tiptap/extension-focus';
import Placeholder from '@tiptap/extension-placeholder';
import { TrailingNode } from './widgets/core/trailing-node/trailing-node.extension';
import { Markdown } from 'tiptap-markdown';
import {
  WidgetAction,
  WidgetActionAlign,
} from './widgets/core/widget-actions.enum';
import { unescapeHTML } from './utils/unescape-html.util';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnDestroy {
  public content = content;

  public editor = new Editor({
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
      Dropcursor.configure({
        class: 'drop-cursor',
      }),
      Focus.configure({
        mode: 'deepest',
      }),
      Placeholder.configure({
        placeholder: 'Please enter the story text here…',
      }),
      TrailingNode,
      Markdown,
      // Widgets
      TweetWidget(this.injector),
      FreeformWidget(this.injector),
    ],
    onSelectionUpdate: ({ editor }) => {
      const { state, storage } = editor;
      const { selection } = state;
      const nodeName = state.doc.nodeAt(selection.from)?.type?.name;
      this.selectedWidgetActions = storage[nodeName]?.actions || [];
    },
  });

  public selectedWidgetActions: string[] = [];

  public widgetActionEnum = WidgetAction;
  public widgetActionAlignEnum = WidgetActionAlign;

  public isFreeformDialogOpen = false

  constructor(private injector: Injector) {}

  public ngOnDestroy(): void {
    this.editor.destroy();
  }

  public setLink(): void {
    const url = window.prompt('url :');

    if (url) {
      this.editor.chain().focus().setLink({ href: url }).run();
    } else {
      this.editor.chain().focus().unsetLink().run();
    }
  }

  public setTweet(): void {
    const id = window.prompt('tweet id :');

    if (id) {
      this.editor.chain().focus().setTweet({ id }).run();
    }
  }

  public openFreeformDialog(): void {
    this.isFreeformDialogOpen = true
  }

  public setFreeform(html: string): void {
    if (html) {
      html.replace(/\\n/gm, ' ')
      this.editor.chain().focus().setFreeform({ content: html }).run();
    }

    this.isFreeformDialogOpen = false
  }

  public stringify(value: any): string {
    return JSON.stringify(value, null, 2);
  }

  public formatHtml(html: string): string {
    return prettifyHTML(unescapeHTML(html));
  }

  public isWidgetSelected(props): boolean {
    return (
      !props.state.selection.empty &&
      props.state.selection
        .content()
        .content.content[0].type.name.includes('widget')
    );
  }

  public isTextSelected(props): boolean {
    return (
      !props.state.selection.empty &&
      props.state.selection.visible &&
      !props.state.selection
        .content()
        .content.content[0].type.name.includes('widget')
    );
  }

  public selectedWidgetHasAction(action: WidgetAction): boolean {
    return this.selectedWidgetActions.includes(action);
  }
}
