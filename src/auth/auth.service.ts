import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) { }


  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      console.log(`user ${userData.username} created successfully`);
      return {
        ...user.toObject(),
        token: this.getJwtToken({ id: user._id.toString() })
      };

    } catch (error) {
      this.handleDbErrors(error);
    }
  }


  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const rawUser = await this.userModel.findOne({ email }).select('email password id');

    const user = {
      ...rawUser.toObject(),
      _id: rawUser._id.toString(),
    };

    console.log({ user });

    if (!user || !bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Invalid credentials');

    return {
      ...user,
      token: this.getJwtToken({ id: user._id })
    };
  }


  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }


  private handleDbErrors(error: any): never {
    if (error.code === '11000')
      throw new BadRequestException(error.detail);

    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
