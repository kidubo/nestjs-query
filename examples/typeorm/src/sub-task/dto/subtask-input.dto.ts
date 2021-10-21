import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsBoolean, IsNotEmpty, ValidateNested } from 'class-validator';
import {
  BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@nestjs-query/query-graphql';
import { GqlContext } from '../../auth.guard';
import { getUserName } from '../../helpers';
import { SubTaskDTO } from './sub-task.dto';
import { Type } from 'class-transformer';
import { AssociateRelationInputType } from '../../relation-input.type';

@InputType('SubTaskTodoItemRelation')
class SubTaskTodoItemInputType extends AssociateRelationInputType {}

@InputType('SubTaskInput')
@BeforeCreateOne((input: CreateOneInputType<SubTaskDTO>, context: GqlContext) => {
  // eslint-disable-next-line no-param-reassign
  input.input.createdBy = getUserName(context);
  return input;
})
@BeforeCreateMany((input: CreateManyInputType<SubTaskDTO>, context: GqlContext) => {
  const createdBy = getUserName(context);
  // eslint-disable-next-line no-param-reassign
  input.input = input.input.map((c) => ({ ...c, createdBy }));
  return input;
})
export class CreateSubTaskDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @Field()
  @IsBoolean()
  completed!: boolean;

  @Field(() => SubTaskTodoItemInputType)
  @ValidateNested()
  @Type(() => SubTaskTodoItemInputType)
  todoItem!: SubTaskTodoItemInputType;
}
