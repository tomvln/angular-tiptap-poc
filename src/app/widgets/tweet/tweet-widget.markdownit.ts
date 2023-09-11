import * as md from 'markdown-it';

function widgetPlugin(md, options) {
  function parseParams(str) {
    const params = {};
    str.replace(/(\w+)="([^"]*)"/g, function (match, key, value) {
      params[key] = value;
    });
    return params;
  }

  function widget(state, startLine, endLine, silent) {
    const pos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];

    // Check if the line starts with "{{widget"
    if (pos + 8 > max || state.src.slice(pos, pos + 8) !== '{{widget')
      return false;

    // Find the end of the block
    let nextLine = startLine;
    while (nextLine < endLine) {
      if (state.sCount[nextLine] < state.blkIndent) break;
      nextLine++;
    }

    const content = state.src.slice(pos, state.eMarks[nextLine - 1]);

    const params = parseParams(content.slice(8, -2).trim());

    // silent mode is for probing, and we should not output anything
    if (!silent) {
      // create token
      const token = state.push('widget', '', 0);
      token.info = params;
      token.map = [startLine, nextLine];
      token.markup = content;
    }

    state.line = nextLine;

    return true;
  }

  md.block.ruler.before('fence', 'widget', widget, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });

  md.renderer.rules.widget = function (tokens, idx) {
    const token = tokens[idx];
    // Here you can render the token to HTML, using the attributes from token.info
    return `<div class="widget" data-attr1="${token.info.attr1}" data-attr2="${token.info.attr2}"></div>`;
  };
}

md.use(widgetPlugin);
