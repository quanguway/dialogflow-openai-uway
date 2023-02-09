import { Injectable, Optional } from '@nestjs/common';
import { AgentModule } from 'src/agent/agent.module';
import { EntityTypesClient} from '@google-cloud/dialogflow-cx';
import { dialogflowConfig } from 'src/config/dialog-flow.config';
import { type } from 'os';

type EntityType = {
    displayName: string;
}

@Injectable()
export class EntityService {
    private client
    private path
    constructor(@Optional() private readonly location: string) {
        this.client = new EntityTypesClient({
            ...dialogflowConfig,
            apiEndpoint: `${location !== 'global' ? location+'-' : '' }dialogflow.googleapis.com`,
        })
        this.path = `projects/${dialogflowConfig.projectId}/locations/${this.location}`
    }

    /**
     * createEntity
     */
    public createEntity(agentId, entityType: EntityType ) {
        console.log("start");
        
        const reponse = this.client.createEntityType({
            // parent: `${this.path}/agent/${agentId}`,
            // entityType: entityType
        })
        return reponse;
    }

    public getEntity(agentId: string, entityId: string) {
        const reponse = this.client.getEntity({
            name: `${this.path}/agents/${agentId}/entity/${entityId}`
        })
        return reponse;
    }
}
