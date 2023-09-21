import { Injector } from '@angular/core';
import Text from '@tiptap/extension-text';

const name = 'content';

const ContentWidgetExtension = Text.extend({
  name: 'content',
  renderText() {
    return '';
  },
});

export default ContentWidgetExtension;
