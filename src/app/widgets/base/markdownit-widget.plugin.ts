export const markdownitWidget = (md, options) => {
  const markdownitWidgetParser = (state, silent) => {
    const openingTag = `{{${options.withHash ? '#' : ''}${options.name}`;
    const closingParamsTag = `}}`;
    const closingContentTag = `{{/${options.name}}}`;

    const startPos = state.pos;
    const maxPos = state.posMax;
    const start = state.src.indexOf(openingTag, startPos);

    // If no opening tag found in the remaining input, stop
    if (start < 0 || start + openingTag.length >= maxPos) return false;

    const endParams = state.src.indexOf(
      closingParamsTag,
      start + openingTag.length
    );
    const endContent = options.withhash
      ? state.src.indexOf(closingParamsTag, start + openingTag.length)
      : endParams;

    // If no closing tag found after the opening tag, stop
    if (endParams < 0) return false;

    const params = state.src.slice(start + openingTag.length, endParams).trim();
    const content = options.withHash
      ? state.src.slice(endParams + closingParamsTag.length, endContent)
      : '';

    // silent mode is for probing, and we should not output anything
    if (!silent) {
      // create token
      const token = state.push(options.name, '', 0);
      token.info = params;
      token.content = content;
      token.markup = state.src.slice(
        start,
        endParams + closingParamsTag.length
      );
    }

    state.pos = options.withHash
      ? endContent + closingContentTag.length
      : endContent + closingParamsTag.length;

    return true;
  };

  md.inline.ruler.after('text', options.name, markdownitWidgetParser);

  md.renderer.rules[options.name] = function (tokens, idx) {
    const token = tokens[idx];
    return `<app-${options.name}-widget ${token.info}></app-${options.name}-widget>`;
  };
};
