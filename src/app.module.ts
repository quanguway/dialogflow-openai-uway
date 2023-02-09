import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DialogFlowModule } from './dialog-flow/dialog-flow.module';
import { EntityModule } from './entity/entity.module';
import { IntentModule } from './intent/intent.module';
import { AgentModule } from './agent/agent.module';

@Module({
  imports: [DialogFlowModule,AgentModule, EntityModule, IntentModule],
  controllers: [AppController],
  providers: [AppService, AgentModule],
})
export class AppModule {}
