// email.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DynamicEmailService } from './dynamic-email.service';
import { CreateSmtpConfigDto } from './dto/create-smtp-config.dto';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly dynamicEmailService: DynamicEmailService) {}

  @Post('create-config')
  createConfig(@Body() createSMTPConfigDto: CreateSmtpConfigDto) {
    return this.dynamicEmailService.createConfig(createSMTPConfigDto);
  }

  @Post('send-email')
  sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.dynamicEmailService.sendEmail(sendEmailDto);
  }

  @Get(':idEmpresa')
  getSMTPConfig(@Param('idEmpresa', ParseIntPipe) idEmpresa: number) {
    return this.dynamicEmailService.getSMTPConfig(idEmpresa);
  }
}
