import { Action } from 'redux';

export interface CommonAction extends Action<string> {
  type: string;
  payload: any;
}
