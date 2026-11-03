const entities: Record<string, string> = { lt: '<', gt: '>', amp: '&', quot: '"', apos: "'" };

// Escapes a value so it can be used as XML text content, a value wrapped in CDATA is kept as-is
export function escapeXml(value: string): string {
  if (value.startsWith('<![CDATA[') && value.endsWith(']]>')) return value;
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Decodes XML text content back to the original value, in a single pass so "&amp;lt;" becomes "&lt;" and not "<"
export function unescapeXml(value: string): string {
  return value.replace(/&(#x[\da-fA-F]+|#\d+|lt|gt|amp|quot|apos);/g, (_, entity: string) => {
    if (entity.startsWith('#x')) return String.fromCodePoint(parseInt(entity.slice(2), 16));
    if (entity.startsWith('#')) return String.fromCodePoint(parseInt(entity.slice(1), 10));
    return entities[entity];
  });
}
