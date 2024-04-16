import { ParseUUIdPipe, ValidationPipe } from '@es/common';
import { BaseController } from '@es/common/base-controllers/base.controller';
import { ResponseLogInterceptor } from '@es/common/interceptors/logger/response-log.interceptor';
import { AppLogger } from '@es/core';
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatusCodes as HttpStatus } from 'http-status-codes';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './serializers/user.serializer';
import { UuidType } from '@mikro-orm/core';


@Controller('user')
@ApiTags('User')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService, private readonly appLogger: AppLogger) {
    super();
    this.appLogger.setContext(UserController.name);
  }

  @ApiOperation({
    summary: 'Create User',
    operationId: 'createUser',
    description: 'Create a User.',
  })
  @ApiResponse({
    description: 'Created User.',
    type: UserResponse,
    status: HttpStatus.CREATED,
  })
  @UseInterceptors(ResponseLogInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(
      new ValidationPipe({
        useExposedFields: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
  ) createUserDto: CreateUserDto) {
    const response = await this.userService.create(createUserDto);
    return response;
  }
  @ApiOperation({
    summary: 'Find All Users',
    operationId: 'findAllUsers',
    description: 'Retrieve all users.',
  })
  @ApiResponse({
    description: 'Found users.',
    type: [UserResponse],
    status: HttpStatus.OK,
  })
  @UseInterceptors(ResponseLogInterceptor)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Find User by ID',
    operationId: 'findUserById',
    description: 'Retrieve a user by ID.',
  })
  @ApiResponse({
    description: 'Found user.',
    type: UserResponse,
    status: HttpStatus.OK,
  })
  @UseInterceptors(ResponseLogInterceptor)
  @Get(':id')
  async findOne(@Param('id', new ParseUUIdPipe()) id: UuidType) {
    return this.userService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update User',
    operationId: 'updateUser',
    description: 'Update a user.',
  })
  @ApiResponse({
    description: 'Updated user.',
    type: UserResponse,
    status: HttpStatus.OK,
  })
  @UseInterceptors(ResponseLogInterceptor)
  @Patch(':id')
  update(@Param('id', new ParseUUIdPipe()) id: UuidType, @Body(
    new ValidationPipe({
      useExposedFields: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  ) updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Delete User',
    operationId: 'deleteUser',
    description: 'Delete a user.',
  })
  @ApiResponse({
    description: 'Deleted user.',
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ResponseLogInterceptor)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIdPipe()) id: UuidType) {
    await this.userService.remove(id);
  }
}

