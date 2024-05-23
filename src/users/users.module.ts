import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { jwtConstants } from 'src/auth/constants'
import { JwtModule } from '@nestjs/jwt'
import { PatientsModule } from 'src/patients/patients.module'
import { DoctorsModule } from 'src/doctors/doctors.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PatientsModule,
    DoctorsModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
