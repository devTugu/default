/* eslint-disable @typescript-eslint/naming-convention -- MIME types are literal header values */
const SIGNATURES: Record<string, number[][]> = {
  'image/jpeg': [[0xff, 0xd8, 0xff]],
  'image/png': [[0x89, 0x50, 0x4e, 0x47]],
  'image/gif': [[0x47, 0x49, 0x46, 0x38]],
  'image/webp': [[0x52, 0x49, 0x46, 0x46]],
};
/* eslint-enable @typescript-eslint/naming-convention */

function matchesSignature(buffer: Buffer, signature: number[]): boolean {
  if (buffer.length < signature.length) return false;
  return signature.every((byte, index) => buffer[index] === byte);
}

export function bufferMatchesMimeType(
  buffer: Buffer,
  mimeType: string,
): boolean {
  const signatures = SIGNATURES[mimeType];
  if (!signatures) return false;
  return signatures.some((signature) => matchesSignature(buffer, signature));
}

export function sanitizeFilename(filename: string): string {
  const base = filename.split(/[/\\]/).pop() ?? 'upload';
  const sanitized = base.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 200);
  return sanitized.length > 0 ? sanitized : 'upload';
}
