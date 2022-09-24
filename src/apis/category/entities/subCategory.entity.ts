import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
@ObjectType()
export class SubCategory {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToOne(() => Category)
  @Field(() => Category)
  category: Category;
}
