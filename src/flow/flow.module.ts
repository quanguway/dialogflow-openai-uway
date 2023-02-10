import { Module } from '@nestjs/common';
import { FlowService } from './flow.service';
import { FlowController } from './flow.controller';

@Module({
  providers: [FlowService],
  controllers: [FlowController]
})
export class FlowModule {}
