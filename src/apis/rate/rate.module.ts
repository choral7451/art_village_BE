import { Module } from '@nestjs/common';
import { RateResovler } from './rate.resolver';
import { RateService } from './rate.service';

@Module({
  providers: [RateResovler, RateService],
})
export class RateModule {}
