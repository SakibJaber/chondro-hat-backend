import { CategoryEntity } from 'src/domain/categories/entity/category.entity';
import { Roles } from 'src/utility/roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({})
  password: string;

  @Column({
    type: 'enum',
    enum: Roles,
    array: true,
    default: [Roles.USER],
  })
  roles: Roles[];

  @OneToMany(() => CategoryEntity, (cate) => cate.addedBy)
  categories: CategoryEntity[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
