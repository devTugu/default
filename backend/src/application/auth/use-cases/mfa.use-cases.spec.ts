import {
  ConfirmMfaEnrollUseCase,
  DisableMfaUseCase,
  EnrollMfaUseCase,
} from './mfa.use-cases';

describe('Mfa use cases', () => {
  const users = {
    findById: jest.fn(),
    update: jest.fn(),
    getMfaSecretEncrypted: jest.fn(),
  };
  const mfa = {
    generateSecret: jest.fn().mockReturnValue({
      secret: 'secret',
      otpauthUrl: 'otpauth://totp/test',
    }),
    encryptSecret: jest.fn().mockReturnValue('encrypted'),
    decryptSecret: jest.fn().mockReturnValue('secret'),
    verifyToken: jest.fn().mockReturnValue(true),
  };

  beforeEach(() => jest.clearAllMocks());

  describe('EnrollMfaUseCase', () => {
    it('stores encrypted secret and returns otpauth URL', async () => {
      users.findById.mockResolvedValue({ id: 1, email: 'a@b.com' });
      const useCase = new EnrollMfaUseCase(users as never, mfa);

      const result = await useCase.execute(1);
      expect(result.otpauthUrl).toBe('otpauth://totp/test');
      expect(users.update).toHaveBeenCalledWith(1, {
        mfaSecretEncrypted: 'encrypted',
        mfaEnabled: false,
      });
    });
  });

  describe('ConfirmMfaEnrollUseCase', () => {
    it('enables MFA on valid code', async () => {
      users.getMfaSecretEncrypted.mockResolvedValue('encrypted');
      const useCase = new ConfirmMfaEnrollUseCase(users as never, mfa);

      await useCase.execute(1, '123456');
      expect(users.update).toHaveBeenCalledWith(1, { mfaEnabled: true });
    });
  });

  describe('DisableMfaUseCase', () => {
    it('requires valid TOTP code to disable', async () => {
      users.getMfaSecretEncrypted.mockResolvedValue('encrypted');
      const useCase = new DisableMfaUseCase(users as never, mfa);

      await useCase.execute(1, '123456');
      expect(users.update).toHaveBeenCalledWith(1, {
        mfaEnabled: false,
        mfaSecretEncrypted: null,
      });
    });

    it('rejects disable without valid code', async () => {
      users.getMfaSecretEncrypted.mockResolvedValue('encrypted');
      mfa.verifyToken.mockReturnValue(false);
      const useCase = new DisableMfaUseCase(users as never, mfa);

      await expect(useCase.execute(1, '000000')).rejects.toMatchObject({
        code: 'UNAUTHORIZED',
      });
    });
  });
});
