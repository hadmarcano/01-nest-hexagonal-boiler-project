import { PaginateResult } from 'src/core/domain/interfaces/paginate.interface';
import { CourseRepository } from '../domain/repository/course.repository';
import { Course } from '../domain/roots/course';
import { Repository } from 'typeorm';
import { CourseEntity } from './course.entity';
import { Inject } from '@nestjs/common';
import { CourseDto } from './dtos/course.dto';

export class CourseInfraestructure implements CourseRepository {
  constructor(
    @Inject('COURSE_REPOSITORY')
    private readonly repository: Repository<CourseEntity>,
  ) {}

  async save(course: Course): Promise<Course> {
    try {
      const courseEntity = CourseDto.fromDomainToData(course) as CourseEntity;

      await this.repository.save(courseEntity);
      return course;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<Course | null> {
    try {
      const courseEntity = await this.repository.findOne({
        where: { id, isDeleted: false },
      });

      if (!courseEntity) {
        return null;
      }

      const course = CourseDto.fromDataToDomain(courseEntity) as Course;
      return course;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findBySlug(slug: string): Promise<Course | null> {
    try {
      const courseEntity = await this.repository.findOne({
        where: { slug, isDeleted: false },
      });

      if (!courseEntity) {
        return null;
      }

      const course = CourseDto.fromDataToDomain(courseEntity) as Course;
      return course;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Course[]> {
    try {
      const courses = await this.repository.find({
        where: { isDeleted: false },
      });

      const coursesList = courses.map(
        (courseEntity) => CourseDto.fromDataToDomain(courseEntity) as Course,
      );

      return coursesList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByPage(
    page: number,
    pageSize: number,
  ): Promise<PaginateResult<Course>> {
    try {
      const [records, total] = await this.repository.findAndCount({
        where: { isDeleted: false },
        take: pageSize,
        skip: pageSize * page,
      });

      const coursesList = records.map(
        (courseEntity) => CourseDto.fromDataToDomain(courseEntity) as Course,
      );

      return {
        data: coursesList,
        total,
        page,
        pageSize,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async softDelete(id: string): Promise<Course> {
    try {
      const courseEntity = await this.repository.findOne({
        where: { id, isDeleted: false },
      });

      if (!courseEntity) {
        return null;
      }

      const course = CourseDto.fromDataToDomain(courseEntity) as Course;

      Object.assign(course.properties, { isDeleted: true });

      await this.repository.save(course.properties);

      return course;
    } catch (error) {
      console.log('[LOG] Infraestructure softDelete', error);
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<Course> {
    try {
      const courseEntity = await this.repository.findOne({
        where: { id, isDeleted: false },
      });

      if (!courseEntity) {
        return null;
      }

      const course = CourseDto.fromDataToDomain(courseEntity) as Course;

      await this.repository.delete(course.properties.id);

      return course;
    } catch (error) {
      throw new Error(error);
    }
  }
}
