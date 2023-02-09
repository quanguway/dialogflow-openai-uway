import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AgentService } from './agent.service';

@Controller('agent')
export class AgentController {

    constructor(private readonly agentService: AgentService) { }

    /** 
     * createAgent
     */
    @Post('/')
    public createAgent(
        @Body('displayName') displayName,
        @Body('defaultLanguageCode') defaultLanguageCode,
        @Body('timeZone') timeZone) {
        console.log("vào vào");
        
        const params = {
            displayName: displayName,
            defaultLanguageCode: defaultLanguageCode,
            timeZone: timeZone,
        }
        return this.agentService.createAgent(params);
    }

    /**
     * getAgent
     */
    @Get(':id')
    public getAgent(@Param('id') id) {
        return this.agentService.getAgent(id);
    }
}
