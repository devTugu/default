export const discovery = jest.fn().mockResolvedValue({});

export const buildAuthorizationUrl = jest
  .fn()
  .mockReturnValue(new URL('http://localhost/oauth/authorize'));

export const authorizationCodeGrant = jest.fn();
