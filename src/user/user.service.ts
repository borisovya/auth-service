import { Injectable } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { CreateUserDto } from './DTO/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Получить всех пользователей
  async findAll(): Promise<
    Pick<
      User,
      'id' | 'email' | 'fullName' | 'role' | 'isActive' | 'hasSubscription' | 'createdAt'
    >[]
  > {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isActive: true,
        hasSubscription: true,
        createdAt: true,
      },
    });
  }

  // ✅ Создать пользователя (c хэшированием пароля)
  // async create(dto: CreateUserDto) {
  //   const hashedPassword = dto.password
  //     ? await bcrypt.hash(dto.password, 10)
  //     : undefined;
  //
  //   return this.prisma.user.create({
  //     data: {
  //       email: dto.email,
  //       fullName: dto.fullName,
  //       password: hashedPassword ?? '', // Prisma требует строку
  //       isActive: dto.isActive ?? true,
  //       hasSubscription: dto.hasSubscription ?? false,
  //     },
  //   });
  // }
}
