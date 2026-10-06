import { bufferMatchesMimeType, sanitizeFilename } from './file-signature.util';

describe('file-signature.util', () => {
  it('validates jpeg magic bytes', () => {
    const buffer = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00]);
    expect(bufferMatchesMimeType(buffer, 'image/jpeg')).toBe(true);
    expect(bufferMatchesMimeType(buffer, 'image/png')).toBe(false);
  });

  it('sanitizes unsafe filenames', () => {
    expect(sanitizeFilename('../../evil name?.png')).toBe('evil_name_.png');
  });
});
