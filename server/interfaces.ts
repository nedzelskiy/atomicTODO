import { IncomingMessage } from 'http';

export type ResponseData = {
  success: true;
  data: any;
} | {
  success: false;
  error: any;
};

export interface NormalizedIncomingMessage extends IncomingMessage {
  url: string;
}
