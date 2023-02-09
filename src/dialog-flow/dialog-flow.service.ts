import { Injectable } from '@nestjs/common';
import IGetAgentRequest, { SessionsClient, AgentsClient} from '@google-cloud/dialogflow-cx';
import { dialogflowConfig } from '../config/dialog-flow.config';
import { v4 as uuid } from 'uuid'
import { clearConfigCache } from 'prettier';

const project_id = 'chatbot-uway';
const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDdH5dApB2yK4fU\n5WLBCgwBjtFXGAdVGjC9+V/Ak9ysB3sJ0gazcpkrygScEdIlrbhYekYh2vvTghNq\neQsMzorEeaIPfqjgwig7uEoNdRx7SOph6XX91gtGv2ROXbnTidz2CdM1gnkTm7l4\nbMObGZpnplTGRJpTtw2eE848yvQTCukfTDnbVQqaaSTLaJ2pnGTKjEwwjdJIf4tS\nAjPmNOPiQ5CPMlBFmiCgWcBXM8q5zAOC8W5YytOHINio5LXxV0pAPkwfqzp2KLds\nBMHHT1ur3bSwSwQPw15BhhXfblBV/lMo2U3JDXcDNg5HITv9DSoXcin5okCMbsnS\ndaexyIfxAgMBAAECggEAA5DA52V1hNrxXdGBlpqVvCyyF0yN0j8i3SGXHiDzKLAF\nZDKt5R1fu0ufvauxfdUbdenDWbu7vCvO9t8B+oni1stAFz8z66LJBMJMB2HJ1mEy\n8G72INM0yVdRGTMvsBRhmchpktRwvq5DIQBNS6p4OG0ZKpKXJNnA99t8spEL/2Rx\nwzSMLB9TotNpVvps4cmfiauOcdsXBLYCNHn0WTdBnDPBrascJQXR3PrXAQrugoPh\nE2K300FXCiFM5qB7SwxFNQ8dDx36SusgXjbVMhdowWCIgavh5lDsxvgoHArhXPdZ\nk+L70B9qmM/0GeDB4cMqrTM+7EVhLEvPsof4nPLNtQKBgQD6W1lLkD++IYUQxzEG\n9cxH3G397MTrIlzs0Udxn1UZo6S5sdz3PCTgFEdundiQ1W74zgnno2n2uZjrE1fW\n+HEHzvJdOCHo+aQJd684YTBTV+t/2odLnJNXSrFv4Xvdyct/+LdwiPSyEBhwDnej\nqqmQWJyR7ZZB/a+53RUgnSk85wKBgQDiG43qXjKKgFMi/YoSAfByss60cgXmslBt\nB5yAz3DYu8cp2v6RjB+V81g0ts3TIcD3cI6yRcmbcPzRMXhxpq/FV69kHduBXX0d\nxy1qrtyHrVlzqLECWsMifnIH9eP1jGWyN1hANd3OutfzNpjjmiZRBzkdfFT3pJ4m\nPmzEW8bhZwKBgFCsKuP8gW3E41n6tcOmZMMrNo5CQ1n5YrQ0466rRwLSBnyH4coR\nKVjDcBkm5+gTvoSR8AMiVzzXpXzqaL2upM19U//R3Ktz9fXPCTlDqAzTIeG7CynE\nNH5GZVLF9+IJ6nc8L/AlUaQnJ5jEMK0eizEmPJ2RT3/IPV3I7cvqmKU1AoGBAI4n\nSrLlpBrlkN83zb2CkJxcBI73/PPMeboChgeJ4+WvMQkEkPYKxbTtuC/0GjU6TGqE\nzoIQVC8w+xG+a33wkSOd/DwSdXXAxC+bkNc4tpdqigmoLhlP3Mzr+F8+3aH8Mde4\n6ff8pcYaPDjBw5+cw6g/xU3fZEAJtBBRQOq21LPTAoGACLDKJnrw/T/sKGuME8tf\nQac+Oezj8+DX35MOG/f1r8AQdZKmCb5j+nhsPuSpY19+5+wc3bjp1EyXcn2ihesb\n37Jayk33ObntwI0hf7de3TmEI475Zc7MpNCMwbgE4RwsgEkOYtjECnMkYgYGsoyE\nASPx4WaWmr3FDkLz+1943Zw=\n-----END PRIVATE KEY-----\n"
const client_email = "uway-dialog@chatbot-uway.iam.gserviceaccount.com"
const location = 'us-central1';
const audioFileName = '/path/to/audio.raw';
const encoding = 'AUDIO_ENCODING_LINEAR_16';
const sampleRateHertz = 16000;
const languageCode = 'en-EU'

@Injectable()
export class DialogFlowService {
    client: any;
    constructor() {
      this.client = new AgentsClient({
        projectId: project_id,    
        apiEndpoint: `${location}-dialogflow.googleapis.com`,
        credentials: {
          type: "service_account",
          private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDdH5dApB2yK4fU\n5WLBCgwBjtFXGAdVGjC9+V/Ak9ysB3sJ0gazcpkrygScEdIlrbhYekYh2vvTghNq\neQsMzorEeaIPfqjgwig7uEoNdRx7SOph6XX91gtGv2ROXbnTidz2CdM1gnkTm7l4\nbMObGZpnplTGRJpTtw2eE848yvQTCukfTDnbVQqaaSTLaJ2pnGTKjEwwjdJIf4tS\nAjPmNOPiQ5CPMlBFmiCgWcBXM8q5zAOC8W5YytOHINio5LXxV0pAPkwfqzp2KLds\nBMHHT1ur3bSwSwQPw15BhhXfblBV/lMo2U3JDXcDNg5HITv9DSoXcin5okCMbsnS\ndaexyIfxAgMBAAECggEAA5DA52V1hNrxXdGBlpqVvCyyF0yN0j8i3SGXHiDzKLAF\nZDKt5R1fu0ufvauxfdUbdenDWbu7vCvO9t8B+oni1stAFz8z66LJBMJMB2HJ1mEy\n8G72INM0yVdRGTMvsBRhmchpktRwvq5DIQBNS6p4OG0ZKpKXJNnA99t8spEL/2Rx\nwzSMLB9TotNpVvps4cmfiauOcdsXBLYCNHn0WTdBnDPBrascJQXR3PrXAQrugoPh\nE2K300FXCiFM5qB7SwxFNQ8dDx36SusgXjbVMhdowWCIgavh5lDsxvgoHArhXPdZ\nk+L70B9qmM/0GeDB4cMqrTM+7EVhLEvPsof4nPLNtQKBgQD6W1lLkD++IYUQxzEG\n9cxH3G397MTrIlzs0Udxn1UZo6S5sdz3PCTgFEdundiQ1W74zgnno2n2uZjrE1fW\n+HEHzvJdOCHo+aQJd684YTBTV+t/2odLnJNXSrFv4Xvdyct/+LdwiPSyEBhwDnej\nqqmQWJyR7ZZB/a+53RUgnSk85wKBgQDiG43qXjKKgFMi/YoSAfByss60cgXmslBt\nB5yAz3DYu8cp2v6RjB+V81g0ts3TIcD3cI6yRcmbcPzRMXhxpq/FV69kHduBXX0d\nxy1qrtyHrVlzqLECWsMifnIH9eP1jGWyN1hANd3OutfzNpjjmiZRBzkdfFT3pJ4m\nPmzEW8bhZwKBgFCsKuP8gW3E41n6tcOmZMMrNo5CQ1n5YrQ0466rRwLSBnyH4coR\nKVjDcBkm5+gTvoSR8AMiVzzXpXzqaL2upM19U//R3Ktz9fXPCTlDqAzTIeG7CynE\nNH5GZVLF9+IJ6nc8L/AlUaQnJ5jEMK0eizEmPJ2RT3/IPV3I7cvqmKU1AoGBAI4n\nSrLlpBrlkN83zb2CkJxcBI73/PPMeboChgeJ4+WvMQkEkPYKxbTtuC/0GjU6TGqE\nzoIQVC8w+xG+a33wkSOd/DwSdXXAxC+bkNc4tpdqigmoLhlP3Mzr+F8+3aH8Mde4\n6ff8pcYaPDjBw5+cw6g/xU3fZEAJtBBRQOq21LPTAoGACLDKJnrw/T/sKGuME8tf\nQac+Oezj8+DX35MOG/f1r8AQdZKmCb5j+nhsPuSpY19+5+wc3bjp1EyXcn2ihesb\n37Jayk33ObntwI0hf7de3TmEI475Zc7MpNCMwbgE4RwsgEkOYtjECnMkYgYGsoyE\nASPx4WaWmr3FDkLz+1943Zw=\n-----END PRIVATE KEY-----\n",
          client_email: "uway-dialog@chatbot-uway.iam.gserviceaccount.com"
        } 
      })
    }

    

    public createAgent = async (parent: string, agent) => {
      const sessionId = uuid();

      console.log(sessionId);
      
      
      console.log("hú hú");
      
      // const agentId = client.matchAgentFromAgentName('uway-chatbox');
      // console.log(agentId);
      
      const request:{} = {
        parent: `projects/chatbot-uway/locations/us-central1`,
        agent,
      };

      new AgentsClient().getAgent()
      const response = this.client.createAgent(request)

      // console.log(" " + sessionPath);
      // // projects/chatbot-uway/locations/us-central1/agents/77909061-dddc-4fb9-9505-3f3c0f63049d/environments/dbb3ad78-807a-4de4-ab14-f944ede0799a

      //   const request = {
      //     session: sessionPath,
      //     queryInput: {
      //       text: {
      //         text: "introduce",
      //       },
      //       languageCode: "en",
      //     },
      //   };

      //   // projects/chatbot-uway/locations/us-central1/agents/77909061-dddc-4fb9-9505-3f3c0f63049d
      // const [response] = await this.client.detectIntent(request);
      // console.log(response.queryResult.responseMessages[0].text.text);
      return response
    };
}
