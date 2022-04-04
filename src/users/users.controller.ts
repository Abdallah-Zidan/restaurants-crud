import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersSearchQuery } from './dto/search';
import { UserDto } from './dto/user.dto';
import { userToDto } from './transformers/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() body: UserDto) {
    return userToDto(await this.usersService.create(body));
  }

  @Get()
  getAll(@Query() query: UsersSearchQuery) {
    return this.usersService.all(query);
  }

  @Get('cuisine/:cuisine')
  async getByCuisine(@Param('cuisine') cuisine: string) {
    return await this.usersService.byCuisine(cuisine);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    const user = await this.usersService.find(id);
    if (user) return userToDto(user);
    throw new NotFoundException();
  }
}
