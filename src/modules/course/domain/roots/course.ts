import { validate } from 'uuid';

export interface CourseEssentials {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
}

export interface CourseOptionals {
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
  readonly isDeleted: boolean;
}

export type CourseProps = CourseEssentials & Partial<CourseOptionals>;

export type CourseFieldsUpdate = Omit<CourseProps, 'id' | 'slug'>;

export class Course {
  private readonly id: string;
  private title: string;
  private slug: string;
  private createdAt: Date;
  private updatedAt: Date | null;
  private isDeleted: boolean;

  constructor(props: CourseProps) {
    if (!validate(props.id)) {
      throw new Error('Invalid id');
    }

    if (props.title.length < 3) {
      throw new Error('Invalid title, title must be at least 3 characters');
    }

    if (props.slug.length < 3) {
      throw new Error('Invalid slug, slug must be at least 3 characters');
    }

    this.id = props.id;
    this.title = props.title;
    this.slug = props.slug;

    this.createdAt = props.createdAt ?? new Date();

    if (props.updatedAt) {
      this.updatedAt = props.updatedAt;
    }

    this.isDeleted = props.isDeleted ?? false;
  }

  public get properties(): CourseProps {
    return {
      id: this.id,
      title: this.title,
      slug: this.slug,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isDeleted: this.isDeleted,
    };
  }

  update(fields: CourseFieldsUpdate) {
    Object.assign(this, fields);

    this.updatedAt = new Date();
  }

  delete() {
    this.isDeleted = true;
    this.updatedAt = new Date();
  }
}
