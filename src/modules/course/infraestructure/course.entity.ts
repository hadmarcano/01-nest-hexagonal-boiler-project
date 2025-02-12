import { ScheduleEntity } from 'src/modules/schedule/infraestructure/schedule.entity';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'course' })
export class CourseEntity {
  @PrimaryColumn({ type: 'varchar', length: 36, nullable: false })
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  slug: string;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'boolean', nullable: false })
  isDeleted: boolean;

  // Relationships with course
  @OneToMany(() => ScheduleEntity, (schedule) => schedule.course)
  schedules: ScheduleEntity[];

}
