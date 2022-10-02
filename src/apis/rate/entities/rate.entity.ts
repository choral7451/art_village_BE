import { Field, ObjectType } from '@nestjs/graphql';
import { Lecture } from 'src/apis/lecture/entities/lecture.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Rate {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => Number)
  star: number;

  @Column()
  @Field(() => String)
  text: string;

  @Column()
  @Field(() => String, { nullable: true })
  readonly createdAt?: String;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Lecture)
  @Field(() => Lecture)
  lecture: Lecture;
}
