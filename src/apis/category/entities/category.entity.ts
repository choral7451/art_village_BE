import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from './subCategory.entity';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  @Field(() => [SubCategory])
  subCategory: SubCategory[];
}
