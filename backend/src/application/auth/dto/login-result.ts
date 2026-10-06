import { TokenPair } from '@shared/types/pagination';

export type LoginResult =
  | TokenPair
  | { requiresMfa: true; mfaToken: string }
  | { requiresMfaEnrollment: true; enrollmentToken: string };

export function isMfaRequired(
  result: LoginResult,
): result is { requiresMfa: true; mfaToken: string } {
  return 'requiresMfa' in result && result.requiresMfa === true;
}

export function isMfaEnrollmentRequired(
  result: LoginResult,
): result is { requiresMfaEnrollment: true; enrollmentToken: string } {
  return (
    'requiresMfaEnrollment' in result && result.requiresMfaEnrollment === true
  );
}

export function isTokenPair(result: LoginResult): result is TokenPair {
  return 'accessToken' in result;
}
