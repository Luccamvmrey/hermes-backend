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

  async createConfig(createSMTPConfigDto: CreateSmtpConfigDto) {
    const { empresas, ...smtpConfig } = createSMTPConfigDto;

    const possibleSMTPConfig = await Promise.all(
      empresas.map((empresa) => this.getSMTPConfig(empresa)),
    );

    const existingConfig = possibleSMTPConfig.find(Boolean);

    if (existingConfig) {
      const empresasComConfig = existingConfig.Empresa.map((emp) => emp.id);

      // Empresas que devem ser adicionadas
      const empresasParaAdicionar = empresas.filter(
        (id) => !empresasComConfig.includes(id),
      );

      // Empresas que devem ser removidas
      const empresasParaRemover = empresasComConfig.filter(
        (id) => !empresas.includes(id),
      );

      // Adiciona novas empresas à configuração SMTP existente
      await Promise.all(
        empresasParaAdicionar.map((empresa) =>
          this.empresasService.update(empresa, {
            SMTP: { connect: { id: existingConfig.id } },
          }),
        ),
      );

      // Remove empresas que não devem mais estar associadas
      await Promise.all(
        empresasParaRemover.map((empresa) =>
          this.databaseService.empresa.update({
            where: { id: empresa },
            data: {
              SMTP: { disconnect: true },
            },
          }),
        ),
      );

      return;
    }

    // Criar nova configuração se nenhuma existir
    const newSMTPConfig = await this.databaseService.sMTP.create({
      data: smtpConfig,
    });

    // Associa a nova configuração SMTP a todas as empresas informadas
    await Promise.all(
      empresas.map((empresa) =>
        this.empresasService.update(empresa, {
          SMTP: { connect: { id: newSMTPConfig.id } },
        }),
      ),
    );
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
    if (!idSMTP) return null;

    return this.databaseService.sMTP.findUnique({
      where: { id: idSMTP },
      include: { Empresa: true },
    });
  }
}
