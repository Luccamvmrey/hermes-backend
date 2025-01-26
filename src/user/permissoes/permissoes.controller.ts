import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PermissoesService } from './permissoes.service';
import { UpdatePermissoesDto } from './dto/update-permissoes.dto';

@Controller('permissoes')
export class PermissoesController {
  constructor(private readonly permissoesService: PermissoesService) {}

  @Post(':userId')
  updatePermissoes(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updatePermissoesDto: UpdatePermissoesDto,
  ) {
    return this.permissoesService.updatePermissoes(userId, updatePermissoesDto);
  }
}
