import { PasswordPolicy } from './password-policy.vo';

describe('PasswordPolicy', () => {
  it('accepts a complex password', () => {
    expect(() => PasswordPolicy.validate('Password1')).not.toThrow();
  });

  it('rejects short or weak passwords', () => {
    expect(() => PasswordPolicy.validate('short')).toThrow(/Password must/);
    expect(() => PasswordPolicy.validate('alllowercase1')).toThrow(
      /Password must/,
    );
    expect(() => PasswordPolicy.validate('ALLUPPERCASE1')).toThrow(
      /Password must/,
    );
    expect(() => PasswordPolicy.validate('NoDigitsHere')).toThrow(
      /Password must/,
    );
  });
});
