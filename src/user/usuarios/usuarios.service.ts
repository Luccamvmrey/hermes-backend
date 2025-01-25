import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { authentication, random } from '../../../utils/helpers';
import { EmpresaUsuarioService } from '../../support-tables/empresa-usuario/empresa-usuario.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LogUsuarioInDto } from './dto/log-usuario-in.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly empresaUsuarioService: EmpresaUsuarioService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const [existingUser] = await this.findAll(createUsuarioDto.nome);
    if (existingUser) throw new ConflictException();

    const {
      userRole,
      permitirAutorizacaoPropria,
      acessoAreasExternas,
      senha,
      empresas,
      ...rest
    } = createUsuarioDto;

    // Definindo as permissões baseadas no cargo
    const canSelfAuthorize =
      userRole === 'ADMIN' ||
      userRole === 'SUPORTE' ||
      (userRole === 'AUTORIZANTE' && permitirAutorizacaoPropria);
    const canAccessExternalAreas =
      userRole === 'ADMIN' || userRole === 'SUPORTE' || acessoAreasExternas;

    const salt = random();
    const hashedPassword = authentication(salt, senha);

    // Criando o novo usuário
    const newUsuario = await this.databaseService.usuario.create({
      data: {
        ...rest,
        senha: hashedPassword,
        userRole,
        salt,
        permitirAutorizacaoPropria: canSelfAuthorize,
        acessoAreasExternas: canAccessExternalAreas,
      },
    });

    // Conectando o usuário às empresas
    if (empresas?.length) {
      await Promise.all(
        empresas.map((empresa) =>
          this.empresaUsuarioService.create({
            Empresa: { connect: { id: empresa } },
            Usuario: { connect: { id: newUsuario.id } },
          }),
        ),
      );
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
        Gerencia: true,
        PermissoesUsuario: true,
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
    const usuario = await this.findOne(id);

    if (updateUsuarioDto.empresas) {
      const newEmpresas = updateUsuarioDto.empresas?.filter((emp) => {
        return !usuario.EmpresaUsuario.some((eu) => eu.Empresa.id === emp);
      });

      for (const empresa of newEmpresas) {
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

  async updatePassword(changePasswordDto: ChangePasswordDto) {
    const salt = random();
    const hashedPassword = authentication(salt, changePasswordDto.newPassword);
    return this.databaseService.usuario.update({
      where: {
        id: changePasswordDto.id,
      },
      data: {
        senha: hashedPassword,
        salt,
      },
    });
  }

  async remove(id: number) {
    return this.databaseService.usuario.delete({
      where: {
        id,
      },
    });
  }
}
