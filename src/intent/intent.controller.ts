import { Body, Controller, Get } from '@nestjs/common';
import { IntentService } from './intent.service';

@Controller('intent')
export class IntentController {

    constructor(private readonly intentService: IntentService) {}

    /**
     * getResponse
     */
    @Get('/getResponse')
    public getResponse(@Body('agent_id') agentId, @Body('text') text) {
        return this.intentService.getResponse(agentId, text);
    }
}
