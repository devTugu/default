import {
  isComplexPassword,
  PASSWORD_COMPLEXITY_MESSAGE,
} from '@default/types/common';

/** Same complexity rules as `ComplexPasswordSchema` in `@default/types/common`. */
export class PasswordPolicy {
  static validate(password: string): void {
    if (!isComplexPassword(password)) {
      throw new Error(PASSWORD_COMPLEXITY_MESSAGE);
    }
  }
}
