import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { authentication, random } from '../../utils/helpers';
import { EmpresaUsuarioService } from '../empresa-usuario/empresa-usuario.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LogUsuarioInDto } from './dto/log-usuario-in.dto';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly empresaUsuarioService: EmpresaUsuarioService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const [existingUser] = await this.findAll(createUsuarioDto.nome);
    if (existingUser) throw new ConflictException();

    const salt = random();
    const hashedPassword = authentication(salt, createUsuarioDto.senha);
    const newUsuario = await this.databaseService.usuario.create({
      data: {
        nome: createUsuarioDto.nome,
        senha: hashedPassword,
        salt,
      },
    });

    if (createUsuarioDto.empresas) {
      for (let empresa of createUsuarioDto.empresas) {
        await this.empresaUsuarioService.create({
          Empresa: { connect: { id: empresa } },
          Usuario: { connect: { id: newUsuario.id } },
        });
      }
    }

    return newUsuario;
  }

  async login(logUsuarioInDto: LogUsuarioInDto) {
    const [user] = await this.findAll(logUsuarioInDto.nome);
    if (!user) throw new NotFoundException();

    const expectedHash = authentication(user.salt, logUsuarioInDto.senha);
    if (expectedHash !== user.senha) throw new UnauthorizedException();

    const salt = random();
    const updatedFields = {
      sessionToken: authentication(salt, user.nome),
    };

    return await this.update(user.id, { usuarioData: updatedFields });
  }

  async findAll(nome?: string, sessionToken?: string) {
    const where = nome ? { nome } : sessionToken ? { sessionToken } : {};
    return this.databaseService.usuario.findMany({
      where,
      include: {
        EmpresaUsuario: {
          include: {
            Empresa: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.usuario.findUnique({
      where: {
        id,
      },
      include: {
        EmpresaUsuario: {
          include: {
            Empresa: true,
          },
        },
      },
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    if (updateUsuarioDto.empresas) {
      for (let empresa of updateUsuarioDto.empresas) {
        await this.empresaUsuarioService.create({
          Empresa: { connect: { id: empresa } },
          Usuario: { connect: { id } },
        });
      }
    }

    if (updateUsuarioDto.usuarioData) {
      return this.databaseService.usuario.update({
        where: {
          id,
        },
        data: updateUsuarioDto.usuarioData,
      });
    }
  }

  async remove(id: number) {
    return this.databaseService.usuario.delete({
      where: {
        id,
      },
    });
  }
}
