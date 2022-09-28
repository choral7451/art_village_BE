import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/apis/category/entities/category.entity';
import { SubCategory } from 'src/apis/category/entities/subCategory.entity';
import { Lecturer } from 'src/apis/lecturer/entities/lecturer.entity';
import { Video } from 'src/apis/video/entities/video.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Lecture {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  image: String;

  @Column()
  @Field(() => String)
  introduce: String;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  tag: String;

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

  @ManyToOne(() => Lecturer)
  @Field(() => Lecturer)
  lecturer: Lecturer;

  @OneToMany(() => Video, (video) => video.lecture)
  @Field(() => [Video])
  video: Video[];
}
