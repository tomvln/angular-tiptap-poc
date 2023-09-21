import Text from '@tiptap/extension-text';

const name = 'content';

const HtmlWidgetExtension = Text.extend({
  name: 'html',
  group: 'inline',
  renderText() {
    return '';
  },
});

export default HtmlWidgetExtension;
