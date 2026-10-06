/** Same complexity rules as presentation PasswordComplexity decorator. */
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export class PasswordPolicy {
  static validate(password: string): void {
    if (!PASSWORD_PATTERN.test(password)) {
      throw new Error(
        'Password must be at least 8 characters and include uppercase, lowercase, and a number.',
      );
    }
  }
}
