import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { agent } from 'supertest';
import { EntityService } from './entity.service';

@Controller('entity')
export class EntityController {

    constructor(private readonly entityService: EntityService) {}
    /**
     * createEntity
     */
    @Post('')
    public createEntity(@Body('agent_id') agentId , @Body('entity_type') entityType) {
        // projects/chatbot-uway/locations/global/agents/1d5fd8c5-6111-44b6-8393-b8d4a3860299
        console.log(entityType);
        console.log(agentId);
        
        return this.entityService.createEntity(agentId, entityType);
    }

    /**
     * getEntity
     */
    @Get('')
    public getEntity(@Body('agent_id') agentId, @Body('entity_id') entityId) {
        return this.entityService.getEntity(agentId, entityId);
    }
}
