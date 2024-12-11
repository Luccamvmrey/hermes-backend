import { PartialType } from '@nestjs/swagger';
import { CreateContaContabilDto } from './create-conta-contabil.dto';

export class UpdateContaContabilDto extends PartialType(CreateContaContabilDto) {}
