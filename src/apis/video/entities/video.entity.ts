import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Lecture } from 'src/apis/lecture/entities/lecture.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Video {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => Int)
  index: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  title?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  url?: string;

  @ManyToOne(() => Lecture)
  @Field(() => Lecture)
  lecture: Lecture;
}
