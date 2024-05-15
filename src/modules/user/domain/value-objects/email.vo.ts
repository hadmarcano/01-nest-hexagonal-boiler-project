export class EmailVO {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  // especificación de creación mediante reglas...
  static create(value: string): EmailVO {
    if (!value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      throw new Error('Invalid email');
    }

    return new EmailVO(value);
  }
}
