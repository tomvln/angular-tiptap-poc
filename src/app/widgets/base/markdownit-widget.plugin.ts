export const markdownitWidget = (md, options) => {
  const markdownitWidgetParser = (state, startLine, endLine, silent) => {
    const pos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];

    const openingTag = `{{${options.withHash ? '#' : ''}${options.name}`;

    // Check if the line starts with a widget opening tag
    if (
      pos + openingTag.length > max ||
      state.src.slice(pos, pos + openingTag.length) !== openingTag
    )
      return false;

    // Find the end of the block
    let nextLine = startLine;
    while (nextLine < endLine) {
      const endNextLine = state.eMarks[nextLine];
      const breakCondition =
        state.src.slice(endNextLine - 2, endNextLine) === '}}';
      nextLine++;
      if (breakCondition) break;
    }
    console.log('nextLine ok', nextLine);

    const content = state.src.slice(pos, state.eMarks[nextLine - 1]);

    const params = content.slice(openingTag.length, -2).trim();

    // silent mode is for probing, and we should not output anything
    if (!silent) {
      // create token
      const token = state.push(options.name, '', 0);
      token.info = params;
      token.map = [startLine, nextLine];
      token.markup = content;
    }

    state.line = nextLine;

    return true;
  };

  md.block.ruler.after('fence', options.name, markdownitWidgetParser);

  md.renderer.rules[options.name] = function (tokens, idx) {
    const token = tokens[idx];
    return `<app-${options.name}-widget ${token.info}></app-${options.name}-widget>`;
  };
};
