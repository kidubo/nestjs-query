import 'reflect-metadata';
import * as typeGraphql from 'type-graphql';
import { CreateManyInputType } from '../../src';

describe('CreateManyInput', (): void => {
  const inputTypeSpy = jest.spyOn(typeGraphql, 'InputType');
  const fieldSpy = jest.spyOn(typeGraphql, 'Field');

  it('should create an abstract input type with an array field', () => {
    class FakeType {}
    CreateManyInputType(FakeType);
    expect(inputTypeSpy).toBeCalledWith({ isAbstract: true });
    expect(fieldSpy.mock.calls[0]![0]!()).toEqual([FakeType]);
  });
});
