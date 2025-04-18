import { CourseEntity } from 'src/modules/course/infraestructure/course.entity';
import {
  FREQUENCY,
  Schedule,
  ScheduleProps,
  STATUS_SCHEDULE,
  TYPE_COURSE,
} from '../../domain/root/schedule';
import { ScheduleEntity } from '../schedule.entity';
import { plainToInstance } from 'class-transformer';
import { PaginateResult } from 'src/core/domain/interfaces/paginate.interface';

export class ScheduleDto {
  static fromDomainToData(schedule: Schedule): ScheduleEntity {
    const courseEntity = new CourseEntity();
    courseEntity.id = schedule.properties.courseId;

    const data = { ...schedule.properties, course: courseEntity };

    const scheduleEntity = plainToInstance(ScheduleEntity, data);

    return scheduleEntity;
  }

  static fromDataToDomain(
    scheduleEntity: ScheduleEntity | ScheduleEntity[],
  ): Schedule | Schedule[] {
    if (Array.isArray(scheduleEntity)) {
      return scheduleEntity.map(
        (schedule) => this.fromDataToDomain(schedule) as Schedule,
      );
    }

    const props: ScheduleProps = {
      id: scheduleEntity.id,
      title: scheduleEntity.title,
      type: TYPE_COURSE[scheduleEntity.type],
      summary: scheduleEntity.summary,
      slogan: scheduleEntity.slogan,
      prices: scheduleEntity.prices,
      startDate: scheduleEntity.startDate,
      startHour: scheduleEntity.startHour,
      endHour: scheduleEntity.endHour,
      duration: scheduleEntity.duration,
      frequency: FREQUENCY[scheduleEntity.frequency],
      status: STATUS_SCHEDULE[scheduleEntity.status],
      whatLearn: scheduleEntity.whatLearn,
      requirements: scheduleEntity.requirements,
      content: scheduleEntity.content,
      createdAt: scheduleEntity.createdAt,
      updatedAt: scheduleEntity.updatedAt,
      deletedAt: scheduleEntity.deletedAt,
      courseId: scheduleEntity.course.id,
    };

    const schedule = new Schedule(props);

    return schedule;
  }

  static fromDataToDomainPaginate(
    schedules: ScheduleEntity[],
    total: number,
  ): PaginateResult<Schedule> {
    return {
      total,
      data: this.fromDataToDomain(schedules) as Schedule[],
    };
  }
}
