export class CreateSmtpConfigDto {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  ssl: boolean;
  tls: boolean;
  empresas: number[];
}
