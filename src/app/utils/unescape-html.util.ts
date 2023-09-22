export function unescapeHTML(html: string): string {
  const escape = document.createElement('textarea');
  escape.innerHTML = html;
  return escape.textContent;
}
