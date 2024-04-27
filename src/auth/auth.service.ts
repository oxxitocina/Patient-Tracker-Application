import { Injectable, UnauthorizedException } from '@nestjs/common'
import { DoctorsService } from 'src/doctors/doctors.service'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private doctorsService: DoctorsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.doctorsService.findOne(username)
    const passwordIsMatch = await argon2.verify(user.password, pass)
    if (user && passwordIsMatch) {
      return user
    }
    throw new UnauthorizedException('User or password are incorrect!')
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
