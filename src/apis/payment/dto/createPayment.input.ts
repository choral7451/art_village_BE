import { Field, InputType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreatePaymentInput {
  @Field(() => String)
  impUid: string;

  @Field(() => Boolean, { nullable: true })
  refund?: boolean;

  @Field(() => Number, { nullable: true })
  price?: number;

  @Field(() => Number)
  user: number;
}
