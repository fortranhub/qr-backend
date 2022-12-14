import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) { }

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const [Entity, property = 'id', exceptField = null] = args.constraints;

    if (!value || !Entity) return false;

    const repository = this.dataSource.getRepository(Entity)

    const record = await repository.findOne({
      where: {
        [property]: value
      }
    });

    if (!record) return true

    if (!exceptField) return false;

    const exceptFieldValue = (args.object as any)[exceptField];

    if (!exceptFieldValue) return false;

    return record[exceptField] === exceptFieldValue;
  }


  defaultMessage(args?: ValidationArguments): string {
    return `${args.property} value already exists`
  }
}

export function Unique(
  entity: any,
  uniqueField: string,
  exceptField: string = null,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, uniqueField, exceptField],
      validator: UniqueConstraint,
    });
  };
}