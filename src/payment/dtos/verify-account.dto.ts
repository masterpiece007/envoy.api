/* eslint-disable prettier/prettier */
export class PaystackResultDto {
  status: boolean;
  message: string;
  data: any;
}

export class VerifyData {
  account_number?: string;
  account_name?: string;
  bank_id?: number;
}

export class IntitiateData {
  active: boolean;
  createdAt?: string;
  currency?: string;
  domain?: string;
  id?: number;
  integration?: number;
  name?: string;
  recipient_code?: string;
  type?: string;
  updatedAt?: string;
  is_deleted: boolean;
  details: dt;
}

export class dt {
  authorization_code?: number;
  account_number?: string;
  account_name?: string;
  bank_code?: string;
  bank_name?: string;
}
