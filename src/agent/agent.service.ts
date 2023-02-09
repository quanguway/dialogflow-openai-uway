import { AgentsClient} from '@google-cloud/dialogflow-cx';
import { Injectable, Optional } from '@nestjs/common';
import { dialogflowConfig } from 'src/config/dialog-flow.config';

type Agent = {
    displayName: string,
    defaultLanguageCode: string,
    timeZone: string,
}

@Injectable()
export class AgentService {
    private client: any;
    private location: string;
    private path: string; 
    constructor(@Optional() location = 'global') {
        this.location = location;
        this.client = new AgentsClient({
            ...dialogflowConfig,
            apiEndpoint: `${location !== 'global' ? location+'-' : ''}dialogflow.googleapis.com`,
        })
        this.path=`projects/${dialogflowConfig.projectId}/locations/${this.location}`;
    }

    public createAgent(agent: Agent) {
        const response = this.client.createAgent({
            parent: this.path,
            agent
        })
        return response;
    }

    public getAgent(id: string) {
        const response = this.client.getAgent({
            name: `${this.path}/agents/${id}`,
        })
        return response;
    }

    /**
     * getAgents
     */
    public getAgents() {
        const response = this.client.getAgents();
        return response;
    }
}
