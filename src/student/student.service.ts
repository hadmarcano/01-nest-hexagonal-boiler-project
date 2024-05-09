import { Injectable } from '@nestjs/common';
import { EnrollService } from './enroll.service';

@Injectable()
export class StudentService {
  constructor(private readonly enrollService: EnrollService) {}

  getAll() {
    return this.enrollService.getAll();
  }
}
