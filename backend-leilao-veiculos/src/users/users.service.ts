import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  create(createUserDto: CreateUserDto) {
    return 'NOVO USUARIO';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(email: string) {
    return this.prisma.user.findUnique(
      {
        where: {
          email: email, 
        }
      }
    )
  }

}
