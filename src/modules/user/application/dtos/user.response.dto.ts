import { Expose, plainToInstance } from 'class-transformer';
import { User } from '../../domain/roots/user';

export class AddressResponse {
  street: string;

  number: number;

  city: string;

  country: string;
}

export class RoleResponse {
  id: string;

  name: string;
}

export class UserResponse {
  @Expose()
  id: string;

  @Expose()
  fullname: string;

  @Expose()
  email: string;

  @Expose()
  image: string;

  password: string;

  roles: RoleResponse[];

  @Expose()
  address: AddressResponse;
}

export class UserResponseDTO {
  static fromDomainToResponse(
    data: User | User[],
  ): UserResponse | UserResponse[] {
    if (Array.isArray(data)) {
      return data.map((item) => {
        const properties = item.properties();
        properties.address = Object.assign({}, item.properties().address);

        return plainToInstance(UserResponse, properties, {
          excludeExtraneousValues: true,
        });
      });
    }

    // Verify add roles to response !!!

    const properties = data.properties();
    properties.address = Object.assign({}, data.properties().address);

    return plainToInstance(UserResponse, properties, {
      excludeExtraneousValues: false,
    });
  }
}
