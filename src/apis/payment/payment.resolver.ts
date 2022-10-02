import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePaymentInput } from './dto/createPayment.input';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Resolver()
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService, //
  ) {}

  @Mutation(() => Payment)
  createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput, //
  ) {}
}
