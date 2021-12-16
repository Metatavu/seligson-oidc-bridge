import { Module } from '@nestjs/common';
import { OidcController } from './oidc.controller';
import { OidcService } from './oidc.service';

@Module({
  imports: [],
  controllers: [OidcController],
  providers: [OidcService],
})
export class OidcModule { }