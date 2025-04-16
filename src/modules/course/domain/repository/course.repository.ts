import { PaginateResult } from 'src/core/domain/interfaces/paginate.interface';
import { Course } from '../roots/course';

export interface CourseRepository {
  save(course: Course): Promise<Course>;
  update(id: string, course: Course): Promise<Course>;
  findById(id: string): Promise<Course | null>;
  findBySlug(slug: string): Promise<Course | null>;
  findAll(): Promise<Course[]>;
  findByPage(page: number, pageSize: number): Promise<PaginateResult<Course>>;
  softDelete(id: string): Promise<Course>;
  delete(id: string): Promise<Course>;
}
