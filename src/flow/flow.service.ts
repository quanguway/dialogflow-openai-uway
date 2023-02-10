import { FlowsClient } from '@google-cloud/dialogflow-cx';
import { google } from '@google-cloud/dialogflow-cx/build/protos/protos';
import { Injectable, Optional } from '@nestjs/common';
import { dialogflowConfig } from 'src/config/dialog-flow.config';

@Injectable()
export class FlowService {
    private location;
    private path;
    private client;
    constructor(@Optional() location:string = process.env.APP_LOCATION) {
        this.location = location;
        this.client = new FlowsClient({
            ...dialogflowConfig,
            apiEndpoint: `${location !== 'global' ? location+'-' : ''}dialogflow.googleapis.com`,
        })
        this.path=`projects/${dialogflowConfig.projectId}/locations/${this.location}`;
    }

    /**
     * createFlow
     */
    public createFlow(flow: google.cloud.dialogflow.cx.v3.IFlow) {
        async function callCreateFlow(flow) {
            const request = {
              parent: this.path,
              flow,
            };
        
            const response = await this.client.createFlow(request);
            console.log(response);
        }
        
        callCreateFlow(flow);
    }
}
