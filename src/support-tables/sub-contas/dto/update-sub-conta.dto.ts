import { PartialType } from '@nestjs/swagger';
import { CreateSubContaDto } from './create-sub-conta.dto';

export class UpdateSubContaDto extends PartialType(CreateSubContaDto) {}
