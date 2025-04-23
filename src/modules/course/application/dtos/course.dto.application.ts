import { plainToInstance } from 'class-transformer';
import { Course } from '../../domain/roots/course';
import { ApiProperty } from '@nestjs/swagger';

export class CourseResponse {
  @ApiProperty({
    description: 'Course id',
    type: String,
    example: 'a8864bb5-eec1-466a-8ee6-00e8c802c297',
  })
  id: string;
  @ApiProperty({
    description: 'Course title',
    type: String,
    example: 'NestJS',
  })
  title: string;
  @ApiProperty({
    description: 'Course slug',
    type: String,
    example: 'nestjs',
  })
  slug: string;
  @ApiProperty({
    description: 'Course created at',
    type: Date,
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt: Date;
}

export class CourseDto {
  static fromDomainToData(course: Course): CourseResponse {
    return plainToInstance(CourseResponse, course.properties);
  }
}
