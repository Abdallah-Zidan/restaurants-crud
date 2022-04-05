import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
/**
 ** a custom validator to check that the provided attribute value is a valid
 ** mongodb object id
 */
@ValidatorConstraint({ name: 'IsValidObjectId', async: false })
export class IsValidObjectId implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    return !!value.match(/^[0-9a-fA-F]{24}$/);
  }
  defaultMessage?(args?: ValidationArguments): string {
    return `id ${args.value} is not a valid object id `;
  }
}
