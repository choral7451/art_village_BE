import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/apis/category/entities/category.entity';
import { SubCategory } from 'src/apis/category/entities/subCategory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Lecture {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  lecturer: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  image: String;

  @Column()
  @Field(() => String)
  preview: String;

  @Column('text')
  @Field(() => String)
  description: String;

  @Column()
  @Field(() => String, { nullable: true })
  readonly createdAt?: String;

  @ManyToOne(() => Category)
  @Field(() => Category)
  category: Category;

  @ManyToOne(() => SubCategory)
  @Field(() => SubCategory)
  subCategory: SubCategory;
}
