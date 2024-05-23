import { Module } from '@nestjs/common'
import { Patient } from './entities/patient.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PatientsService } from './patients.service'
import { PatientsController } from './patients.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
