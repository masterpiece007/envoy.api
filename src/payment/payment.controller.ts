/* eslint-disable no-var */
import { map } from 'rxjs';
import { PaystackResultDto } from './dtos/verify-account.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { Controller, Get, Param } from '@nestjs/common';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get('verify/:accNo/:bankCode/')
  async VerifyAcc(
    @Param('accNo') accNo: string,
    @Param('bankCode') bankCode: string,
  ) {
    var res: any;
    var verifyResult = await this.paymentService
      .VerifyAccountNumber_(accNo, bankCode)
      .then((a) => {
        res = a.data;
      })
      .catch();
    //var verifyResult = await this.paymentService.VerifyAccountNumber(accNo, bankCode)
    //var transferResult = await this.paymentService.ExecuteTransfer('500',accNo, bankCode,'my reason')

    // var ress: any;
    // console.log('ress1: ' + JSON.stringify(ress))

    // verifyResult.subscribe((a: VerifyAccountDto) => {
    //     ress = a.data
    //     console.log('ress2: ' + JSON.stringify(a.data))
    //     return ress;
    // })
    // console.log('ress3: ' + JSON.stringify(ress))

    // var result = verifyResult.pipe(map(a => a.message))
    // console.log('result: ',result)
    console.log('res: ', res);
    return res;
    //return transferResult;

    //return ress;
  }
}
