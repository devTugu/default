import { Email } from './email.vo';

describe('Email value object', () => {
  it('normalizes email to lowercase', () => {
    expect(Email.create('User@Example.COM').value).toBe('user@example.com');
  });

  it('throws on invalid email', () => {
    expect(() => Email.create('not-an-email')).toThrow('INVALID_EMAIL');
  });
});
