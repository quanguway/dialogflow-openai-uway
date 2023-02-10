import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DialogFlowModule } from './dialog-flow/dialog-flow.module';
import { EntityModule } from './entity/entity.module';
import { IntentModule } from './intent/intent.module';
import { AgentModule } from './agent/agent.module';
import { FlowModule } from './flow/flow.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DialogFlowModule,AgentModule, EntityModule, IntentModule, FlowModule],
  controllers: [AppController],
  providers: [AppService, AgentModule],
})
export class AppModule {}
