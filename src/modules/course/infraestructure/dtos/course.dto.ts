import { Course } from 'src/modules/course/domain/roots/course';
import { CourseEntity } from '../course.entity';
import { PaginateResult } from 'src/core/domain/interfaces/paginate.interface';

export class CourseDto {
  // static method to convert a Course(domain) to a CourseEntity(data)
  static fromDomainToData(
    domain: Course | Course[],
  ): CourseEntity | CourseEntity[] {
    if (Array.isArray(domain)) {
      return domain.map((item) =>
        this.fromDomainToData(item),
      ) as CourseEntity[];
    }

    const { id, title, slug, createdAt, updatedAt, isDeleted } =
      domain.properties;

    const courseEntity = new CourseEntity();
    courseEntity.id = id;
    courseEntity.title = title;
    courseEntity.slug = slug;
    courseEntity.createdAt = createdAt;
    courseEntity.updatedAt = updatedAt;
    courseEntity.isDeleted = isDeleted;
    return courseEntity;
  }

  // static method to convert a CourseEntity(data) to a Course(domain)
  static fromDataToDomain(
    entity: CourseEntity | CourseEntity[],
  ): Course | Course[] {
    if (Array.isArray(entity)) {
      return entity.map((item) => this.fromDataToDomain(item)) as Course[];
    }

    const { id, title, slug, createdAt, updatedAt, isDeleted } = entity;

    const course = new Course({
      id,
      title,
      slug,
      createdAt,
      updatedAt,
      isDeleted,
    });
    return course;
  }

  // Static method for paginate management
  static fromDataToDomainPaginate(
    entity: CourseEntity[],
    total: number,
    page?: number,
    pageSize?: number,
  ): PaginateResult<Course> {
    return {
      total,
      data: entity.map((item) => this.fromDataToDomain(item)) as Course[],
      page,
      pageSize,
    };
  }
}
