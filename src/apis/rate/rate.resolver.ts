import { Resolver } from '@nestjs/graphql';
import { RateService } from './rate.service';

@Resolver()
export class RateResovler {
  constructor(
    private readonly rateService: RateService, //
  ) {}

  createRate() {}
}
