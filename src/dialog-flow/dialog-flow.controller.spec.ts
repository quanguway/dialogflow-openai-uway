import { Test, TestingModule } from '@nestjs/testing';
import { DialogFlowController } from './dialog-flow.controller';

describe('DialogFlowController', () => {
  let controller: DialogFlowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DialogFlowController],
    }).compile();

    controller = module.get<DialogFlowController>(DialogFlowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
