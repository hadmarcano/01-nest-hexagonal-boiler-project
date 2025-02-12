import { PaginateResult } from 'src/core/domain/interfaces/paginate.interface';
import { Schedule } from '../domain/root/schedule';
import { ScheduleRepository } from '../domain/repositories/schedule.repository';
import { IsNull, Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { ScheduleEntity } from './schedule.entity';
import { ScheduleDto } from './dtos/schedule.dto';

export class ScheduleInfraestructure implements ScheduleRepository {
  constructor(
    @Inject('SCHEDULE_REPOSITORY')
    private readonly repository: Repository<ScheduleEntity>,
  ) {}

  async save(schedule: Schedule): Promise<Schedule> {
    const userEntity = ScheduleDto.fromDomainToData(schedule);

    await this.repository.save(userEntity);

    return schedule;
  }

  async findAll(): Promise<Schedule[]> {
    const schedules = await this.repository.find({
      where: { deletedAt: IsNull() },
    });

    if (!schedules) {
      return null;
    }

    const scheduleList = schedules.map(
      (scheduleEntity) =>
        ScheduleDto.fromDataToDomain(scheduleEntity) as Schedule,
    );

    return scheduleList;
  }

  async findById(id: string): Promise<Schedule | null> {
    const scheduleEntity = await this.repository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!scheduleEntity) {
      return null;
    }

    const schedule = ScheduleDto.fromDataToDomain(scheduleEntity) as Schedule;

    return schedule;
  }

  async update(schedule: Schedule): Promise<Schedule> {
    const scheduleEntity = ScheduleDto.fromDomainToData(schedule);

    // update schedule
    await this.repository.save(scheduleEntity);

    return schedule;
  }

  async delete(id: string): Promise<void> {
    const scheduleEntity = await this.repository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!scheduleEntity) {
      return;
    }

    scheduleEntity.deletedAt = new Date();

    await this.repository.save(scheduleEntity);
  }

  async findByPage(
    page: number,
    pageSize: number,
  ): Promise<PaginateResult<Schedule>> {
    const [records, total] = await this.repository.findAndCount({
      where: { deletedAt: IsNull() },
      take: pageSize,
      skip: pageSize * page,
    });

    const schedulesList = records.map(
      (scheduleEntity) =>
        ScheduleDto.fromDataToDomain(scheduleEntity) as Schedule,
    );

    return {
      data: schedulesList,
      total,
      page,
      pageSize,
    };
  }
}
