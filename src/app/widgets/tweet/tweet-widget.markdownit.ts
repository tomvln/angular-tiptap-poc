export function tweetWidgetMarkdownit(md, options) {
  function parseParams(str) {
    const params = {};
    str.replace(/(\w+)="([^"]*)"/g, function (match, key, value) {
      params[key] = value;
    });
    return params;
  }

  function tweet(state, startLine, endLine, silent) {
    const pos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];

    // Check if the line starts with "{{tweet"
    if (pos + 7 > max || state.src.slice(pos, pos + 7) !== '{{tweet')
      return false;

    // Find the end of the block
    let nextLine = startLine;
    while (nextLine < endLine) {
      if (state.sCount[nextLine] < state.blkIndent) break;
      nextLine++;
    }

    const content = state.src.slice(pos, state.eMarks[nextLine - 1]);
    console.log('content', content)

    const params = parseParams(content.slice(7, -2).trim());
    console.log('params', params)

    // silent mode is for probing, and we should not output anything
    if (!silent) {
      // create token
      const token = state.push('tweet', '', 0);
      token.attrs = {
        tweetId: params['id'],
        align: params['align']
      }

      console.log('token', token)
    }

    state.line = nextLine;

    return true;
  }

  md.block.ruler.before('fence', 'tweet', tweet);

  md.renderer.rules.tweet = function(tokens, idx) {
    const token = tokens[idx];
    console.log('token', tokens)
    // Here you can render the token to HTML, using the attributes from token.info
    return {type: 'tweet-widget'};
  };
}
