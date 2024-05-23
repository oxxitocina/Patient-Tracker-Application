import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username)
    const passwordIsMatch = await argon2.verify(user.password, pass)
    if (user && passwordIsMatch) {
      return user
    }
    throw new UnauthorizedException('User or password are incorrect!')
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.user_id,
    }
    const userData = await this.usersService.findOne(user.username)
    return {
      user: userData,
      token: this.jwtService.sign(payload),
    }
  }
}
