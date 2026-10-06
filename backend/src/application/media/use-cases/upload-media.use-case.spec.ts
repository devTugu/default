import { UploadMediaUseCase } from './upload-media.use-case';

describe('UploadMediaUseCase', () => {
  it('uploads when storage enabled', async () => {
    const storage = {
      isEnabled: () => true,
      upload: jest.fn().mockResolvedValue({ url: 'https://cdn/x.png' }),
    };
    const result = await new UploadMediaUseCase(storage).execute({
      buffer: Buffer.from('x'),
      mimeType: 'image/png',
      filename: 'x.png',
    });
    expect(result.url).toContain('https://');
  });

  it('throws when storage disabled', async () => {
    const storage = { isEnabled: () => false, upload: jest.fn() };
    await expect(
      new UploadMediaUseCase(storage as never).execute({
        buffer: Buffer.from('x'),
        mimeType: 'image/png',
        filename: 'x.png',
      }),
    ).rejects.toMatchObject({ code: 'BAD_REQUEST' });
  });
});
