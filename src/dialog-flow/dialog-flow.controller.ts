import { Controller, Get, Post, Query  } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { clearConfigCache } from 'prettier';
import { DialogFlowService } from './dialog-flow.service';

@Controller('dialog-flow')
export class DialogFlowController {
    @Get('/create-agent')
    async createAgent(@Body('parent') parent) {
        // console.log(parent);
        return await new DialogFlowService().createAgent(parent, {displayName: 'creAgent'})
    }
}
