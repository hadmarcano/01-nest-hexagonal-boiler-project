import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Prices } from '../domain/entities/prices.entity';
import { CourseEntity } from 'src/modules/course/infraestructure/course.entity';

@Entity({ name: 'schedule' })
export class ScheduleEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Column({ type: 'varchar', length: 1000 })
  summary: string;

  @Column({ type: 'varchar', length: 1000 })
  slogan: string;

  @Column({ type: 'json' })
  prices: Prices;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  startHour: Date;

  @Column({ type: 'timestamp' })
  endHour: Date;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'varchar', length: 50 })
  frequency: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'json', nullable: true })
  whatLearn: string[];

  @Column({ type: 'json', nullable: true })
  requirements: string[];

  @Column({ type: 'json', nullable: true })
  content: string[];

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  // Relations
  // Many to One
  @ManyToOne(() => CourseEntity, (course) => course.schedules)
  course: CourseEntity;
}
