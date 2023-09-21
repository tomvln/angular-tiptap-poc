var escape = document.createElement('textarea');

function escapeHTML(html) {
  escape.textContent = html;
  return escape.innerHTML;
}

function unescapeHTML(html) {
  escape.innerHTML = html;
  return escape.textContent;
}

export const markdownitWidgetPlugin = (
  md,
  options: { name: string; withContent?: boolean }
) => {
  const markdownitWidgetParser = (state, silent: boolean) => {
    const openingTag = `{{${options.withContent ? '#' : ''}${options.name}`;
    const closingParamsTag = `}}`;
    const closingContentTag = `{{/${options.name}}}`;

    const startPos = state.pos;
    const maxPos = state.posMax;
    const widgetStartPos = state.src.indexOf(openingTag, startPos);

    // If no opening tag found in the remaining input, stop
    if (widgetStartPos < 0 || widgetStartPos + openingTag.length >= maxPos) {
      return false;
    }

    const endParamsPos = state.src.indexOf(
      closingParamsTag,
      widgetStartPos + openingTag.length
    );

    // If no closing params tag found after the opening tag, stop
    if (endParamsPos < 0) {
      return false;
    }

    const endClosingParamsTagPos = endParamsPos + closingParamsTag.length;

    const endContentPos = options.withContent
      ? state.src.indexOf(closingContentTag, widgetStartPos + openingTag.length)
      : endClosingParamsTagPos;

    const endClosingContentTagPos = endContentPos + closingContentTag.length;

    const paramsString = state.src
      .slice(widgetStartPos + openingTag.length, endParamsPos)
      .trim();
    console.log('paramsString', paramsString);

    const content = options.withContent
      ? state.src.slice(endClosingParamsTagPos, endContentPos)
      : '';

    // silent mode is for probing, and we should not output anything
    if (!silent) {
      // create token
      const type = `${options.name}-widget`;
      const tag = `app-${options.name}-widget`;
      const token = new state.Token(type, tag, 0);
      paramsString.match(/(\w+)="([^"]*)"/g)?.map((attr) => {
        let [key, value] = attr.split('=');
        token.attrSet(key, value.replace(/"/g, ''));
      });
      token.content = content;
      state.tokens.push(token);
      const contentToken = state.push('text', '', 0);
      contentToken.content = content;
      console.log('token', token);
    }

    state.pos = options.withContent
      ? endClosingContentTagPos
      : endClosingParamsTagPos;

    return true;
  };

  md.inline.ruler.before(
    'emphasis',
    `${options.name}-widget`,
    markdownitWidgetParser
  );
};
