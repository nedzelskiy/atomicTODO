import { IncomingMessage } from 'http';

export type ResponseData = {
  success: true;
  data: any;
  error?: any
} | {
  success: false;
  data?: any;
  error: any;
};

export interface NormalizedIncomingMessage extends IncomingMessage {
  url: string;
}
