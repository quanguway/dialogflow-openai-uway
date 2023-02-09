import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { agent } from 'supertest';
import { EntityService } from './entity.service';

@Controller('entity')
export class EntityController {

    constructor(private readonly entityService: EntityService) {}
    /**
     * createEntity
     */
    @Post('/')
    public createEntity(@Body('agent_id')agentId , @Body('entity_type') entityType) {
        // projects/chatbot-uway/locations/us-central1/agents/77909061-dddc-4fb9-9505-3f3c0f63049d
        return this.entityService.createEntity('77909061-dddc-4fb9-9505-3f3c0f63049d', entityType);
    }

    /**
     * getEntity
     */
    @Get(':agent_id&:entity_id')
    public getEntity(@Param('agent_id') agentId, @Param('entity_id') entityId) {
        console.log("haha");
        
        return this.entityService.getEntity(agentId, entityId);
    }
}
