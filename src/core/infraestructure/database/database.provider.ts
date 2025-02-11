import { CourseEntity } from 'src/modules/course/infraestructure/course.entity';
import { RoleEntity } from 'src/modules/role/infraestructure/entities/role.entity';
import { ScheduleEntity } from 'src/modules/schedule/infraestructure/schedule.entity';
import { UserEntity } from 'src/modules/user/infraestructure/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE_POSTGRES',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'user',
        password: 'password',
        database: 'advancedb',
        entities: [
          // __dirname + '/../../../modules/**/infraestructura/*.entity{.ts,.js}',
          UserEntity,
          RoleEntity,
          CourseEntity,
          ScheduleEntity,
        ],
        synchronize: true, // Dev
        logging: true, // Dev
      });

      console.log('Database initialized');

      return dataSource.initialize();
    },
  },
];
