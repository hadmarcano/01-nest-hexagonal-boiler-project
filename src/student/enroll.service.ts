import { Injectable } from '@nestjs/common';

@Injectable()
export class EnrollService {
  getAll(): string {
    return 'Enroll service';
  }
}
