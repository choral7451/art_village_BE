import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column({ default: false })
  @Field(() => Boolean, { nullable: true })
  refund: boolean;

  @Column()
  @Field(() => Number)
  price: number;

  @Column()
  @Field(() => String)
  type: string;

  @Column()
  @Field(() => String, { nullable: true })
  readonly createdAt?: String;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  readonly updatedAt?: String;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
