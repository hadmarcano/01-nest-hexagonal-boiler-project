import { ScheduleEntity } from '../schedule.entity';

export const scheduleProviders = [
  {
    provide: 'SCHEDULE_REPOSITORY',
    useFactory: (dataSource: any) => dataSource.getRepository(ScheduleEntity),
    inject: ['DATA_SOURCE_POSTGRES'],
  },
  {
    provide: 'SCHEDULE_MANAGER',
    useFactory: (dataSource) => dataSource.manager,
    inject: ['DATA_SOURCE_POSTGRES'],
  },
];
