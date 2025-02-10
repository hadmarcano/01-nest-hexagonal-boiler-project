import { CourseEntity } from '../course.entity';

// Design Pattern: Provider
export const courseProviders = [
  {
    // For pre-fabricated queries
    provide: 'COURSE_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(CourseEntity),
    inject: ['DATA_SOURCE_POSTGRES'],
  },
  {
    // For custom SQL queries
    provide: 'COURSE_MANAGER',
    useFactory: (dataSource) => dataSource.manager,
    inject: ['DATA_SOURCE_POSTGRES'],
  },
];
