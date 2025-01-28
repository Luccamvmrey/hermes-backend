// email.controller.ts
import {Controller, Post, Body} from '@nestjs/common';
import {DynamicEmailService} from './dynamic-email.service';
import {CreateSmtpConfigDto} from "./dto/create-smtp-config.dto";
import {SendEmailDto} from "./dto/send-email.dto";

@Controller('email')
export class EmailController {
    constructor(private readonly dynamicEmailService: DynamicEmailService) {
    }

    @Post('create-config')
    createConfig(@Body() createSMTPConfigDto: CreateSmtpConfigDto) {
        this.dynamicEmailService.createConfig(createSMTPConfigDto);
        return {message: 'Configuração de e-mail criada com sucesso!'};
    }

    @Post('send-email')
    sendEmail(@Body() sendEmailDto: SendEmailDto) {
        this.dynamicEmailService.sendEmail(sendEmailDto);
        return {message: 'E-mail enviado com sucesso!'};
    }


}