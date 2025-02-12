import { PaginateResult } from 'src/core/domain/interfaces/paginate.interface';
import { Schedule } from '../root/schedule';

export interface ScheduleRepository {
  findAll(): Promise<Schedule[]>;
  findById(id: string): Promise<Schedule | null>;
  save(schedule: Schedule): Promise<Schedule>;
  update(schedule: Schedule): Promise<Schedule>;
  delete(id: string): Promise<void>;
  findByPage(page: number, pageSize: number): Promise<PaginateResult<Schedule>>;
}
