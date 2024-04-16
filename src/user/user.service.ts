import { NotFoundException } from '@es/common';
import { AppLogger } from '@es/core';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, UuidType } from '@mikro-orm/core';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User.name) private userRepository: EntityRepository<User>,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(UserService.name);
  }
  
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    this.logger.info(`Created user`, { user });
    return user;
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    this.logger.info(`Found users`, { users });
    return users;
  }

  async findOne(id: UuidType) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException({
        details: {
          id: id.toString(),
        }
      });
    }
    return user;
  }

  async update(id: UuidType, updateUserDto: UpdateUserDto) {
    const exitingUser = await this.userRepository.findOne({ id });
    if (!exitingUser) {
      throw new NotFoundException({
        details: {
          id: id.toString(),
        }
      });
    }
    const user = await this.userRepository.nativeUpdate(id, updateUserDto);
    this.logger.info(`Updated user`, { user });
    return user;
  }

  async remove(id: UuidType) {
    const exitingUser = await this.userRepository.findOne({ id });
    if (!exitingUser) {
      throw new NotFoundException({
        details: {
          id: id.toString(),
        }
      });
    }
    const user = await this.userRepository.nativeDelete(id);
    this.logger.info(`Removed user`, { user });
  }
}
