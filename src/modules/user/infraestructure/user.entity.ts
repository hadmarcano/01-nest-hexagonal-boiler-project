import { Column, Entity, PrimaryColumn } from 'typeorm';
// import { Role } from '../domain/entities/role';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn({ type: 'varchar', length: '36', nullable: false })
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  fullname: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  image: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  refresToken: string;

  @Column({ type: 'datetime', nullable: false })
  createdAt: string;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: string;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: string;

  // roles: Role[];
  roles: any[];
}
