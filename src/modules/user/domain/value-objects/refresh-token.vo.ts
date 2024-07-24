import { validate } from 'uuid';

export class RefrestokenVO {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  // especificación de creación mediante reglas...
  static create(value: string): RefrestokenVO {
    if (value && (value.length === 0 || !validate(value))) {
      throw new Error('Invalid refresh token');
    }

    return new RefrestokenVO(value);
  }
}
