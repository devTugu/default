import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class LocalizedTextDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  en: string;

  @ApiProperty({
    description: 'Optional; empty string falls back to en on public site',
  })
  @IsString()
  @MaxLength(500)
  mn: string;
}

export class LocalizedTextShortDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  en: string;

  @ApiProperty({
    description: 'Optional; empty string falls back to en on public site',
  })
  @IsString()
  @MaxLength(200)
  mn: string;
}

export class LocalizedContentDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  en: string;

  @ApiProperty({
    description: 'Optional; empty string falls back to en on public site',
  })
  @IsString()
  mn: string;
}

export class LocalizedStringListDto {
  @ApiProperty({ type: [String] })
  @IsString({ each: true })
  en: string[];

  @ApiProperty({ type: [String] })
  @IsString({ each: true })
  mn: string[];
}
