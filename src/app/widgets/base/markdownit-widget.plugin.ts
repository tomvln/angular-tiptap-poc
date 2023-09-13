export const markdownitWidget = (
  md,
  options: { name: string; withHash?: boolean }
) => {
  const markdownitWidgetParser = (state, silent: boolean) => {
    const openingTag = `{{${options.withHash ? '#' : ''}${options.name}`;
    const closingParamsTag = `}}`;
    const closingContentTag = `{{/${options.name}}}`;

    const startPos = state.pos;
    const maxPos = state.posMax;
    const widgetStartPos = state.src.indexOf(openingTag, startPos);

    // If no opening tag found in the remaining input, stop
    if (widgetStartPos < 0 || widgetStartPos + openingTag.length >= maxPos)
      return false;

    const endParamsPos = state.src.indexOf(
      closingParamsTag,
      widgetStartPos + openingTag.length
    );

    // If no closing params tag found after the opening tag, stop
    if (endParamsPos < 0) return false;

    const endClosingParamsTagPos = endParamsPos + closingParamsTag.length;

    const endContentPos = options.withHash
      ? state.src.indexOf(closingContentTag, widgetStartPos + openingTag.length)
      : endClosingParamsTagPos;

    const endClosingContentTagPos = endContentPos + closingContentTag.length;

    const params = state.src
      .slice(widgetStartPos + openingTag.length, endParamsPos)
      .trim();
    const content = options.withHash
      ? state.src.slice(endClosingParamsTagPos, endContentPos)
      : '';

    // silent mode is for probing, and we should not output anything
    if (!silent) {
      // create token
      const token = state.push(options.name, '', 0);
      token.meta.params = params;
      token.meta.content = content;
    }

    state.pos = options.withHash
      ? endClosingContentTagPos
      : endClosingParamsTagPos;

    return true;
  };

  md.inline.ruler.after('text', options.name, markdownitWidgetParser);

  md.renderer.rules[options.name] = function (tokens, idx) {
    const token = tokens[idx];
    return `<app-${options.name}-widget ${token.meta.params}>${token.meta.content}</app-${options.name}-widget>`;
  };
};
