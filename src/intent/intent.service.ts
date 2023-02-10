import { SessionsClient } from '@google-cloud/dialogflow-cx';
import { Injectable, Optional } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { dialogflowConfig } from 'src/config/dialog-flow.config';

@Injectable()
export class IntentService {
    private location;
    private client;
    private path;

    constructor(@Optional() location:string = process.env.APP_LOCATION) {
        this.location = location;
        this.client = new SessionsClient({
            ...dialogflowConfig,
            apiEndpoint: `${location !== 'global' ? location+'-' : ''}dialogflow.googleapis.com`,
        })
        this.path=`projects/${dialogflowConfig.projectId}/locations/${this.location}`;
    }

    /**
     * getResponse
     */
    public getResponse(agentId:string, text:string) {
      const sessionId = uuid();
      // console.log(agentId);

      // console.log(" " + sessionPath);
      // // projects/chatbot-uway/locations/us-central1/agents/77909061-dddc-4fb9-9505-3f3c0f63049d/environments/dbb3ad78-807a-4de4-ab14-f944ede0799a

      const sessionPath = this.client.projectLocationAgentSessionPath(
        dialogflowConfig.projectId,
        location,
        agentId,
        sessionId
      );
        
        const request = {
          session: sessionPath,
          queryInput: {
            text: {
              text,
            },
            languageCode: "en",
          },
        };

      // projects/chatbot-uway/locations/us-central1/agents/77909061-dddc-4fb9-9505-3f3c0f63049d
      const [response] = this.client.detectIntent(request);
      console.log(response.queryResult.responseMessages[0].text.text);
    }
}
