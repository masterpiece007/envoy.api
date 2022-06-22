/* eslint-disable prettier/prettier */
export class GenericResponse {
  Status: _Status;
  Description?: string;
  Data?: any;
}

export enum _Status {
  Success = 'SUCCESS',
  Failed = 'FAILED',
}
