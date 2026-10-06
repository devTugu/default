import { JwtPayload } from '@shared/types/pagination';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}
