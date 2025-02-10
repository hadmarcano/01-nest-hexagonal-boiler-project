import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/infraestructure/database/database.module';
import { courseProviders } from '../providers/course.provider';
import { CourseApplication } from '../../application/course.application';
import { CourseInfraestructure } from '../course.infraestructure';
import { CourseController } from './http/course.controller';
import { CourseService } from '../../application/services/course.service';

const courseApplications = [CourseApplication];

const courseInfraestructures = [CourseInfraestructure];

const otherProviders = [...courseProviders, CourseService];

@Module({
  imports: [DatabaseModule],
  controllers: [CourseController],
  providers: [
    ...courseApplications,
    ...courseInfraestructures,
    ...otherProviders,
  ],
})
export class CourseModule {}
