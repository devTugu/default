import { UpdateSiteSettingsInputSchema } from '@default/types/site-settings';
import { createZodDto } from 'nestjs-zod';

export class UpdateSiteSettingsDto extends createZodDto(
  UpdateSiteSettingsInputSchema.strict(),
) {}
