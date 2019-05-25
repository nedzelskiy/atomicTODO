import { IncomingMessage } from 'http';

export interface ResponseData {
  success: boolean;
  data: any;
}

export interface NormalizedIncomingMessage extends IncomingMessage {
  url: string;
}
