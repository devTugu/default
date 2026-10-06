import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Admin123!' })
  @IsString()
  @MinLength(8)
  password: string;
}

export class RefreshDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}

export class MfaLoginDto {
  @ApiProperty()
  @IsString()
  mfaToken: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  code: string;
}

export class MfaVerifyEnrollDto {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  code: string;
}

export class MfaDisableDto {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  code: string;
}

export class MfaEnrollmentTokenDto {
  @ApiProperty()
  @IsString()
  enrollmentToken: string;
}

export class MfaEnrollmentConfirmDto {
  @ApiProperty()
  @IsString()
  enrollmentToken: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  code: string;
}

export class OAuthCallbackDto {
  @ApiProperty({ description: 'Full callback URL from IdP redirect' })
  @IsString()
  callbackUrl: string;
}
