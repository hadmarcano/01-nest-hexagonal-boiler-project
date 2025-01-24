import { v4 as uuidv4 } from 'uuid';
import { EmailVO } from '../value-objects/email.vo';
import { FullnameVO } from '../value-objects/fullname.vo';
import { IdVO } from '../value-objects/id.vo';
import { RefrestokenVO } from '../value-objects/refresh-token.vo';
import { RolesVo } from '../value-objects/roles.vo';
import { User } from './user';
import { UserProperties } from './interfaces/user.interface';

// Fabrica con las reglas de negocio de User.
export class UserFactory {
  // Métodos de la clase...
  static create(props: UserProperties) {
    IdVO.create(props.id);
    RefrestokenVO.create(props.refreshToken);
    FullnameVO.create(props.fullname);
    RolesVo.create(props.roles);
    EmailVO.create(props.email);

    props.refreshToken = uuidv4();

    return new User(props);
  }
}
