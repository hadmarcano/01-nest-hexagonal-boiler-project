import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Delete,
  Param,
  HttpException,
} from '@nestjs/common';
import { Course, CourseProps } from 'src/modules/course/domain/roots/course';
import { CourseApplication } from 'src/modules/course/application/course.application';
import { CourseCreateDTO } from '../dtos/course.create.dto';
import { CourseService } from 'src/modules/course/application/services/course.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('courses')
export class CourseController {
  constructor(
    private readonly courseApplication: CourseApplication,
    private readonly courseService: CourseService,
  ) {}

  @Post()
  async create(@Body() body: CourseCreateDTO) {
    console.log('[LOG] create body', body);

    const slug = await this.courseService.generateSlug(body.title);

    const props: CourseProps = {
      id: uuidv4(),
      title: body.title,
      slug,
      createdAt: new Date(),
      updatedAt: null,
      isDeleted: false,
    };
    const course = new Course(props);

    await this.courseApplication.save(course);

    return course;
  }

  @Get()
  async list() {
    const courses = await this.courseApplication.findAll();
    return courses;
  }

  @Get()
  async findById(@Query('id') id: string) {
    const course = await this.courseApplication.findById(id);
    return course;
  }

  @Get()
  async findBySlug(@Query('slug') slug: string) {
    const course = await this.courseApplication.findBySlug(slug);
    return course;
  }

  @Get()
  async findByPage(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    const courses = await this.courseApplication.findByPage(page, pageSize);
    return courses;
  }

  @Delete('disable/:id')
  async softDelete(@Param('id') id: string) {
    try {
      const course = await this.courseApplication.softDelete(id);

      return course;
    } catch (error) {
      console.log('[LOG] controller softDelete', error);
      throw new Error(error);
    }
  }

  @Delete('remove/:id')
  async delete(@Param('id') id: string) {
    const course = await this.courseApplication.delete(id);
    return course;
  }
}
