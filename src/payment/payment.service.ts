import {
  PaystackResultDto,
  VerifyData,
  IntitiateData,
} from './dtos/verify-account.dto';
//import { HttpService } from '@nestjs/axios';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { first, map, Observable, firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { verify } from 'crypto';

@Injectable()
export class PaymentService {
  //headersRequest: any;
  private readonly headersRequest = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.PAYSTACK_SECRETKEY}`,
  };

  constructor(private httpService: HttpService) {
    this.headersRequest;
  }
  //VerifyAccountNumber()
  async VerifyAccountNumber(
    accountNo: string,
    bankCode: string,
  ): Promise<Observable<PaystackResultDto>> {
    const url = `https://api.paystack.co/bank/resolve?account_number=${accountNo}&bank_code=${bankCode}`;

    const verifyResult = this.httpService
      .get(url, { headers: this.headersRequest })
      .pipe(
        map((response: AxiosResponse) => response.data as PaystackResultDto),
      );

    return verifyResult;
    //console.log(JSON.stringify(verifyResult))
  }

  async VerifyAccountNumber_(
    accountNo: string,
    bankCode: string,
  ): Promise<PaystackResultDto> {
    const url = `https://api.paystack.co/bank/resolve?account_number=${accountNo}&bank_code=${bankCode}`;

    const verifyResult = await firstValueFrom(
      this.httpService
        .get(url, { headers: this.headersRequest })
        .pipe(
          map((response: AxiosResponse) => response.data as PaystackResultDto),
        ),
    );

    return verifyResult;
    //console.log(JSON.stringify(verifyResult))
  }

  async CreateTransferReceipient(
    name: string,
    account_number: string,
    bank_code: string,
  ): Promise<Observable<PaystackResultDto>> {
    const url = `https://api.paystack.co/transferrecipient`;

    const data: any = {
      type: 'nuban',
      name,
      account_number,
      bank_code,
      currency: 'NGN',
    };

    const createReceipientResult = this.httpService
      .post(url, data, { headers: this.headersRequest })
      .pipe(
        map((response: AxiosResponse) => response.data as PaystackResultDto),
      );

    return createReceipientResult;
  }
  //InitiateTransfer()
  async InitiateTransfer(
    amount: string,
    receipient: string,
    reason: string,
  ): Promise<Observable<PaystackResultDto>> {
    const url = `https://api.paystack.co/transferrecipient`;

    const data: any = { source: 'balance', amount, receipient, reason };

    const transferResult = this.httpService
      .post(url, data, { headers: this.headersRequest })
      .pipe(
        map((response: AxiosResponse) => response.data as PaystackResultDto),
      );

    return transferResult;
  }

  async ExecuteTransfer(
    amount: string,
    accountNo: string,
    bankCode: string,
    reason = '',
  ) {
    (await this.VerifyAccountNumber(accountNo, bankCode)).subscribe(
      (vResult) => {
        const res = vResult.data as PaystackResultDto;
        if (res.status) {
          //verify result successful
          console.log('verify result successful');
          console.log(JSON.stringify(res.data));

          const resData = res.data as VerifyData;
          this.CreateTransferReceipient(
            resData.account_name,
            resData.account_number,
            resData.bank_id.toString(),
          )
            .then((transferReceipientResult) => {
              transferReceipientResult.subscribe((resp) => {
                if (resp.status) {
                  console.log('create transfer receipient successful');
                  console.log(JSON.stringify(resp.data));

                  const receipientData = resp.data as IntitiateData;
                  this.InitiateTransfer(
                    amount,
                    receipientData.recipient_code,
                    reason,
                  ).then((initiateResult) => {
                    initiateResult.subscribe((a) => {
                      if (a.status) {
                        console.log('initiate transfer successful');
                        console.log(JSON.stringify(a.data));
                      }
                    });
                  });
                }
              });
            })
            .catch((err) => {
              console.log('an error occured: ', err);
            });
        }
      },
    );
  }
  //FinalizeTransferHook()
}
