import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  LocalizedContentDto,
  LocalizedStringListDto,
  LocalizedTextDto,
} from '../shared/localized-text.dto';

class SocialLinkDto {
  @IsString()
  platform: string;

  @IsUrl()
  url: string;
}

class HeroSectionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  title?: LocalizedTextDto;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  subtitle?: LocalizedTextDto;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  description?: LocalizedTextDto;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  ctaLabel?: LocalizedTextDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ctaUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  secondaryCtaLabel?: LocalizedTextDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  secondaryCtaUrl?: string;
}

class HeaderSectionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  logoUrl?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  logoDarkUrl?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  adminLogoUrl?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  faviconUrl?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  siteName?: LocalizedTextDto;
}

class FooterSectionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  copyright?: LocalizedTextDto;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  tagline?: LocalizedTextDto;

  @ApiPropertyOptional({ type: [SocialLinkDto] })
  @IsOptional()
  @IsArray()
  socialLinks?: SocialLinkDto[];
}

class SeoSectionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  title?: LocalizedTextDto;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  description?: LocalizedTextDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ogImageUrl?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedStringListDto)
  keywords?: LocalizedStringListDto;
}

class ContactInfoSectionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  location?: LocalizedTextDto | null;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  address?: LocalizedTextDto | null;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  workHours?: LocalizedTextDto | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  showForm?: boolean;
}

class ThemeSectionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brandColor?: string | null;
}

class AboutValueDto {
  @IsString()
  icon: string;

  @ValidateNested()
  @Type(() => LocalizedTextDto)
  label: LocalizedTextDto;
}

class AboutStatDto {
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  label: LocalizedTextDto;

  @IsString()
  value: string;
}

class AboutSectionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  brief?: LocalizedTextDto;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  mission?: LocalizedTextDto;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  vision?: LocalizedTextDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string | null;

  @ApiPropertyOptional({ type: [AboutValueDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AboutValueDto)
  values?: AboutValueDto[];

  @ApiPropertyOptional({ type: [AboutStatDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AboutStatDto)
  stats?: AboutStatDto[];
}

export class UpdateSiteSettingsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => HeroSectionDto)
  hero?: HeroSectionDto;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => HeaderSectionDto)
  header?: HeaderSectionDto;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => FooterSectionDto)
  footer?: FooterSectionDto;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => SeoSectionDto)
  seo?: SeoSectionDto;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactInfoSectionDto)
  contactInfo?: ContactInfoSectionDto;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => ThemeSectionDto)
  theme?: ThemeSectionDto;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => AboutSectionDto)
  about?: AboutSectionDto;
}

export { LocalizedContentDto };
