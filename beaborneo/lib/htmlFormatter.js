/**
 * Simple HTML Formatter
 * Formats HTML with proper indentation for "View Page Source"
 */

export function formatHTML(html) {
  // Remove extra whitespace first
  html = html.replace(/>\s+</g, '><');
  
  const indentSize = 2;
  let formatted = '';
  let indent = 0;
  
  // Self-closing tags
  const selfClosing = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
  
  // Inline tags that shouldn't cause line breaks
  const inline = ['a', 'abbr', 'b', 'bdi', 'bdo', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var'];
  
  const tokens = html.match(/<[^>]+>|[^<]+/g) || [];
  
  tokens.forEach((token, index) => {
    if (token.startsWith('<')) {
      // It's a tag
      const isClosing = token.startsWith('</');
      const isSelfClosing = token.endsWith('/>') || selfClosing.some(tag => token.match(new RegExp(`<${tag}[\\s>]`, 'i')));
      const tagName = token.match(/<\/?([a-z0-9]+)/i)?.[1]?.toLowerCase();
      const isInline = inline.includes(tagName);
      
      // Check if previous token was inline content
      const prevToken = tokens[index - 1];
      const prevWasText = prevToken && !prevToken.startsWith('<');
      
      if (isClosing) {
        // Decrease indent but never go below 0
        indent = Math.max(0, indent - 1);
        if (!isInline && !prevWasText) {
          formatted += '\n' + ' '.repeat(Math.max(0, indent * indentSize));
        }
        formatted += token;
      } else {
        if (!isInline && !prevWasText && formatted.length > 0) {
          formatted += '\n' + ' '.repeat(Math.max(0, indent * indentSize));
        }
        formatted += token;
        if (!isSelfClosing && !isInline) {
          indent++;
        }
      }
    } else {
      // It's text content
      const trimmed = token.trim();
      if (trimmed) {
        formatted += trimmed;
      }
    }
  });
  
  return formatted;
}
