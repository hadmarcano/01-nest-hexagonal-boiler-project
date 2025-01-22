import { Controller, Inject, Get } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  // (private readonly appService: AppService) => ¿ Cómo se llama y que beneficio tiene?
  // Dependency Injection (DI): Design Pattern
  // Beneficio: Habilita un sólo punto de acceso para  obtener el servicio(instancia) en todo tu proyecto
  // ¿Porque se aconseja pasarla como ReadOnly? : Para que no se pueda modificar la instancia que se esta recibiendo.
  // constructor(private readonly studentService: StudentService) {

  // Injectando en forma de ToKEN
  constructor(
    @Inject('STUDENT') private readonly studentService: StudentService,
    @Inject('CONFIG') private readonly config: { url: string },
    @Inject('CONFIG2') private readonly config2: { port: number },
    @Inject('CONFIG3')
    private readonly config3: { url: string; urlConfig: string },
  ) {
    console.log('Student controller created');
  }

  @Get('/')
  async getAll() {
    return [
      this.config.url,
      this.studentService.getAll(),
      this.config2.port,
      this.config3.urlConfig,
      this.config3.url,
    ];
  }
}
