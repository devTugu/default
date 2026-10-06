import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

@ValidatorConstraint({ name: 'passwordComplexity', async: false })
export class PasswordComplexityConstraint implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    return typeof value === 'string' && PASSWORD_PATTERN.test(value);
  }

  defaultMessage(): string {
    return 'Password must be at least 8 characters and include uppercase, lowercase, and a number.';
  }
}

export function PasswordComplexity(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: object, propertyName: string | symbol) => {
    registerDecorator({
      target: object.constructor,
      propertyName: String(propertyName),
      options: validationOptions,
      constraints: [],
      validator: PasswordComplexityConstraint,
    });
  };
}
