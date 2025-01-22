import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // (private readonly appService: AppService) => ¿ Cómo se llama y que beneficio tiene?
  // Dependency Injection (DI): Design Pattern
  // Beneficio: Habilita un sólo punto de acceso para  obtener el servicio(instancia) en todo tu proyecto
  // ¿Porque se aconseja pasarla como ReadOnly? : Para que no se pueda modificar la instancia que se esta recibiendo.
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const controller = UsersController;
    console.log(
      'Controlador - Tiempo de ejecución - path ',
      Reflect.getMetadata('path', controller),
    );
    console.log(
      'Controlador - Tiempo de ejecución - paths',
      Reflect.getMetadata('paths', controller),
    );
    return this.appService.getHello();
  }
}

// Reflect metadata de accesibilidad | transferecia | recuperación de datos (data de la data) | sobre > destinatario > tabaja con lo recibido.
// 1. decorador de tipo factoria/función - Tiempo de compilación
function Controlador(path: string) {
  return function (constructor: any) {
    // console.log('Controlador - Tiempo de compilación -', path);
    Reflect.defineMetadata('path', path, constructor); // esta metadata => solo es accesible cuando existe una instacia de la clase.
  };
}

// 2. decorador de método
function MetodoGet(path: string) {
  return function (
    target: any,
    propertykey: string,
    // descriptor: PropertyDescriptor,
  ): any {
    if (!Reflect.hasMetadata('paths', target.constructor)) {
      Reflect.defineMetadata('paths', [], target.constructor);
    }

    const paths = Reflect.getMetadata('paths', target.constructor);
    paths.push({
      path,
      verb: 'get',
      methodName: propertykey,
    });

    Reflect.defineMetadata('paths', paths, target.constructor);
  };
}

@Controlador('/users')
export class UsersController {
  constructor() {
    // console.log('UsersController');
  }

  @MetodoGet('/list')
  List() {
    console.log('List');
  }
}
