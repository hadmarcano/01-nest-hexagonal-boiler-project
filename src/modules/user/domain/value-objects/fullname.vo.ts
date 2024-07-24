export class FullnameVO {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  // especificación de creación mediante reglas...
  static create(value: string): FullnameVO {
    if (value.length === 0) {
      throw new Error('Invalid fullname');
    }

    return new FullnameVO(value);
  }
}
