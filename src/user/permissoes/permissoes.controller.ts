import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PermissoesService } from './permissoes.service';
import { AddPermissaoDto } from './dto/add-permissao.dto';

@Controller('permissoes')
export class PermissoesController {
  constructor(private readonly permissoesService: PermissoesService) {}

  @Post(':userId')
  addPermissao(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() addPermissaoDto: AddPermissaoDto,
  ) {
    return this.permissoesService.addPermissao(userId, addPermissaoDto);
  }
}
