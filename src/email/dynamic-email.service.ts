// dynamic-email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateSmtpConfigDto } from './dto/create-smtp-config.dto';
import { DatabaseService } from '../database/database.service';
import { EmpresasService } from '../support-tables/empresas/empresas.service';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class DynamicEmailService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly empresasService: EmpresasService,
  ) {}

  // Método para enviar e-mail com configurações SMTP dinâmicas

  createConfig(createSMTPConfigDto: CreateSmtpConfigDto) {
    const { empresas, ...smtpConfig } = createSMTPConfigDto;
    this.databaseService.sMTP
      .create({ data: smtpConfig })
      .then((smtpConfig) => {
        empresas.forEach((empresa) => {
          this.empresasService.update(empresa, {
            SMTP: { connect: { id: smtpConfig.id } },
          });
        });
      });
  }

  async sendEmail(sendEmailDto: SendEmailDto) {
    const smtpConfig = await this.getSMTPConfig(sendEmailDto.idEmpresa);
    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.ssl, // Usar SSL/TLS se for a porta 465
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass,
      },
    });

    // Opções do e-mail
    const mailOptions = {
      from: smtpConfig.from,
      to: sendEmailDto.to,
      subject: sendEmailDto.subject,
      text: sendEmailDto.text,
    };

    // Enviar o e-mail
    try {
      await transporter.sendMail(mailOptions);
      console.log('E-mail enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
    }
  }

  async getSMTPConfig(idEmpresa: number) {
    const { idSMTP } = await this.empresasService.findOne(idEmpresa);
    return this.databaseService.sMTP.findUnique({
      where: { id: idSMTP },
    });
  }
}
