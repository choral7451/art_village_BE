import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  name: String;

  @Column({ default: false })
  @Field(() => Boolean, { nullable: true })
  membership?: boolean;

  @Column()
  @Field(() => String, { nullable: true })
  readonly createdAt?: String;
}
