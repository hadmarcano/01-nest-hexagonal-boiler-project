import { Inject } from '@nestjs/common';
import { ScheduleRepository } from '../domain/repositories/schedule.repository';
import { ScheduleInfraestructure } from '../infraestructure/schedule.infraestructure';
import { PaginateResult } from 'src/core/domain/interfaces/paginate.interface';
import { Schedule } from '../domain/root/schedule';

export class ScheduleApplication {
  constructor(
    @Inject(ScheduleInfraestructure)
    private readonly scheduleRepository: ScheduleRepository,
  ) {}

  async save(schedule: Schedule): Promise<Schedule> {
    return this.scheduleRepository.save(schedule);
  }

  async findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.findAll();
  }

  async findById(id: string): Promise<Schedule | null> {
    return this.scheduleRepository.findById(id);
  }

  async update(schedule: Schedule): Promise<Schedule> {
    return this.scheduleRepository.update(schedule);
  }

  async delete(id: string): Promise<void> {
    return this.scheduleRepository.delete(id);
  }

  async findByPage(
    page: number,
    pageSize: number,
  ): Promise<PaginateResult<Schedule>> {
    return this.scheduleRepository.findByPage(page, pageSize);
  }
}
