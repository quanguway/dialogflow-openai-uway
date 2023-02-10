import { Injectable, Optional } from '@nestjs/common';
import { AgentModule } from 'src/agent/agent.module';
import { EntityTypesClient} from '@google-cloud/dialogflow-cx';
import { dialogflowConfig } from 'src/config/dialog-flow.config';
import { type } from 'os';
import { google } from '@google-cloud/dialogflow-cx/build/protos/protos';

@Injectable()
export class EntityService {
    private client
    private path
    constructor(@Optional() private readonly location: string = process.env.APP_LOCATION) {
        this.client = new EntityTypesClient({
            ...dialogflowConfig,
            apiEndpoint: `${location !== 'global' ? location+'-' : '' }dialogflow.googleapis.com`,
        })
        this.path = `projects/${dialogflowConfig.projectId}/locations/${this.location}`
    }

    /**
     * createEntity
     * /entity  {method POST}
     * 
     */
    public async createEntity(agentId: string, entityType: google.cloud.dialogflow.cx.v3.IEntityType ) {
        try {
            const reponse = await this.client.createEntityType({
                parent: `${this.path}/agents/${agentId}`,
                entityType,
            })
            return reponse;    
        } catch (error) {
            console.log(error);
        }
        
    }

    public async getEntity(agentId: string, entityId: string) {
        
        const reponse = await this.client.getEntity({
            name: `${this.path}/agents/${agentId}/entity/${entityId}`
        })
        return reponse;
    }

    /**
     * getEntityList
     */
    public getEntityList() {
        async function callListEntityTypes() {
            // Construct request
            const request = {
              parent: this.path,
            };
        
            // Run request
            const iterable = await this.client.listEntityTypesAsync(request);
            for await (const response of iterable) {
                console.log(response);
            }
        }
        callListEntityTypes();
    }
}