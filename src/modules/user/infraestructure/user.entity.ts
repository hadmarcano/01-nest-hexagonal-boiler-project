import { RoleEntity } from '../../role/infraestructure/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Role } from '../domain/entities/role';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn({ type: 'varchar', length: 36, nullable: false })
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  fullname: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  image: string;

  @Column({ type: 'json', nullable: false })
  address: object;

  @Column({ type: 'varchar', length: 100, nullable: false })
  refreshToken: string;

  // In PostgreSQL
  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  // In MySQL
  // @Column({ type: 'datetime', nullable: false })
  // createdAt: Date;

  // @Column({ type: 'datetime', nullable: true })
  // updatedAt: Date;

  // @Column({ type: 'datetime', nullable: true })
  // deletedAt: Date;

  @ManyToMany(() => RoleEntity, (role) => role.users, { eager: true })
  @JoinTable() // Main table of relationship.
  roles: Role[];
}
