import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsModule } from './cats/cats.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DoctorsModule } from './doctors/doctors.module'
import { PatientsModule } from './patients/patients.module'
import { PrescriptionsModule } from './prescriptions/prescriptions.module'
import { ChatModule } from './chat/chat.module'
import { AppointmentsModule } from './appointments/appointments.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { MessagesModule } from './messages/messages.module'
import { ScheduleModule } from '@nestjs/schedule'
import { TasksModule } from './tasks/tasks.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { MailModule } from './mail/mail.module'

@Module({
  imports: [
    CatsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    DoctorsModule,
    PatientsModule,
    PrescriptionsModule,
    ChatModule,
    AppointmentsModule,
    AuthModule,
    UsersModule,
    MessagesModule,
    ScheduleModule.forRoot(),
    TasksModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
