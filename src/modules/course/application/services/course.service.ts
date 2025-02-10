import { Inject, Injectable } from '@nestjs/common';
import { CourseRepository } from '../../domain/repository/course.repository';
import { CourseInfraestructure } from '../../infraestructure/course.infraestructure';
import slugify from 'slugify';

@Injectable()
export class CourseService {
  constructor(
    @Inject(CourseInfraestructure)
    private readonly repository: CourseRepository,
  ) {}

  async generateSlug(title: string): Promise<string> {
    let slugGenerated = '';

    let count = 0;
    do {
      const prevTitle = count === 0 ? title : `${title}-${count}`;

      slugGenerated = slugify(prevTitle, {
        lower: true,
        trim: true,
      });

      const slugCourseExists = await this.repository.findBySlug(slugGenerated);
      if (slugCourseExists) {
        slugGenerated = '';
        count++;
      }
    } while (slugGenerated === '');

    return slugGenerated;
  }
}
