import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';

describe('UsersController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<UsersController>(UsersController);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
