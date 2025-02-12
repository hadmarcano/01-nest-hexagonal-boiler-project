import { Prices } from '../entities/prices.entity';

export enum TYPE_COURSE {
  NORMAL = 'NORMAL',
  ADVANCED = 'ADVANCED',
}

export enum FREQUENCY {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export enum STATUS_SCHEDULE {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
}

export interface ScheduleEssentials {
  readonly id: string;
  readonly title: string;
  readonly type: TYPE_COURSE;
  readonly slogan: string;
  readonly summary: string;
  readonly prices: Prices;
  readonly startDate: Date;
  readonly startHour: Date;
  readonly endHour: Date;
  readonly duration: number;
  readonly frequency: FREQUENCY;
  readonly courseId: string;
}

export interface ScheduleOptionals {
  readonly status: STATUS_SCHEDULE;
  readonly whatLearn: string[];
  readonly requirements: string[];
  readonly content: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
  readonly deletedAt: Date | null;
}

export type ScheduleProps = ScheduleEssentials & Partial<ScheduleOptionals>;
export type ScheduleUpdateProps = Partial<
  Omit<ScheduleEssentials, 'id'> &
    Omit<ScheduleOptionals, 'createdAt' | 'updatedAt' | 'deletedAt'>
>;

// TODO: Events definitions
// When i need inheritance from another implemented class...
// ...i need to use an super() call.
export class Schedule {
  private readonly id: string;
  private title: string;
  private type: TYPE_COURSE;
  private summary: string;
  private slogan: string;
  private prices: Prices;
  private startDate: Date;
  private startHour: Date;
  private endHour: Date;
  private duration: number;
  private frequency: FREQUENCY;
  private courseId: string;
  private status: STATUS_SCHEDULE;
  private whatLearn: string[];
  private requirements: string[];
  private content: string[];
  private readonly createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  // Peding: Sessions...

  constructor(props: ScheduleProps) {
    // TODO: Events definitions

    Object.assign(this, props);

    this.createdAt = props.createdAt || new Date();
    this.status = props.status || STATUS_SCHEDULE.DRAFT;
  }

  get properties() {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
      summary: this.summary,
      slogan: this.slogan,
      prices: this.prices,
      startDate: this.startDate,
      startHour: this.startHour,
      endHour: this.endHour,
      duration: this.duration,
      frequency: this.frequency,
      courseId: this.courseId,
      status: this.status,
      whatLearn: this.whatLearn,
      requirements: this.requirements,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(props: ScheduleUpdateProps) {
    Object.assign(this, props);
    this.updatedAt = new Date();
  }
}
