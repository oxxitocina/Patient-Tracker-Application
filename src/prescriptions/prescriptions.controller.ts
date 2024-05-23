import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common'
import { PrescriptionsService } from './prescriptions.service'
import { CreatePrescriptionDto } from './dto/create-prescription.dto'
import { UpdatePrescriptionDto } from './dto/update-prescription.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() params: any) {
    return this.prescriptionsService.findAll(params)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    return this.prescriptionsService.update(+id, updatePrescriptionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionsService.remove(+id)
  }
}
