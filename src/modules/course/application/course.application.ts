import { Injectable, Inject } from '@nestjs/common';
import { Course } from '../domain/roots/course';
import { CourseRepository } from '../domain/repository/course.repository';
import { CourseInfraestructure } from '../infraestructure/course.infraestructure';

@Injectable()
export class CourseApplication {
  constructor(
    @Inject(CourseInfraestructure)
    private readonly repository: CourseRepository,
  ) {}

  async save(course: Course) {
    return this.repository.save(course);
  }

  async update(id: string, course: Course) {
    return this.repository.update(id, course);
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }

  async findBySlug(slug: string) {
    return this.repository.findBySlug(slug);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findByPage(page: number, pageSize: number) {
    return this.repository.findByPage(page, pageSize);
  }

  async softDelete(id: string) {
    const courseDisabled = this.repository.softDelete(id);
    return courseDisabled;
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
