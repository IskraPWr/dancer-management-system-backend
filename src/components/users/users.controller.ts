import { GeneratePass, NewAccountData } from './../../validators/validators';
import { Guard } from './../../guards/roles.guard';
import { NotesService } from './../notes/notes.service';
import { UsersService } from './users.service';
import {
  Get,
  Post,
  Param,
  Header,
  Delete,
  Controller,
  Body,
  UseGuards,
  SetMetadata,
  Request,
  Put,
} from '@nestjs/common';

import { ICheckLoginError, ICheckPhoneError, ICheckKeyError, ICheckEmailError, IUser } from './../../typings/typings';
import { Users } from './users.entity';

//@UseGuards(Guard)
@Controller('users')
export class UsersController {
  constructor(private users: UsersService, private notes: NotesService) {}

  @Post('delete')
  @SetMetadata('roles', ['admin'])
  deleteUsers(@Body() idArray): Promise<object> {
    return this.users.deleteUsers(idArray);
  }

  @Delete('delete/:id')
  deleteUserById(@Param('id') id): Promise<object> {
    return this.users.deleteUserById(id);
  }

  @Post('generate')
  generatePass(@Body() message: GeneratePass) {
    return this.users.generatePass(message);
  }

  @Get(':id')
  @SetMetadata('roles', ['user'])
  findOne(@Param('id') id) {
    return this.users.findOne(id);
  }

  @Get()
  @SetMetadata('roles', ['admin'])
  findAll() {
    return Promise.all([this.users.findAllActive(), this.notes.findAll()]).then(
      value => {
        const data = [];
        const usersQuantity = Object.keys(value[0]).length;
        const notesQuantity = Object.keys(value[1]).length;
        let lastNoteId = 0;

        for (let i = 0; i < usersQuantity; i++) {
          const obj = {
            id: value[0][i].id_user,
            name: value[0][i].name,
            surname: value[0][i].surname,
            email: value[0][i].email,
            phone: value[0][i].phone,
            university: value[0][i].university,
            department: value[0][i].department,
            year: value[0][i].year,
            index: value[0][i].index,
            notes: [],
          };
          for (let j = lastNoteId; j < notesQuantity; j++) {
            if (value[0][i].id_user === value[1][j].id_user) {
              obj.notes.push({name: value[1][j].note});
            }
            if (value[0][i].id_user < value[1][j].id_user) {
              lastNoteId = j;
              break;
            }
          }
          data.push(obj);
        }
        return data;
      },
    );
  }

  /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////

  //post 

  @Post('add')
  addUser(@Body() message: NewAccountData): Promise<any> {
    return this.users.addUser(message);
  }

  @Post('exist/login')
  check(@Body() idArray): Promise<ICheckLoginError | null> {
    return this.users.isExistLogin(idArray);
  }

  @Post('exist/phone')
  checkPhone(@Body() idArray): Promise<ICheckPhoneError | null> {
    return this.users.isExistPhone(idArray);
  }

  @Post('exist/key')
  checkKey(@Body() idArray): Promise<ICheckKeyError | null> {
    return this.users.isExistKey(idArray);
  }

  @Post('exist/email')
  checkEmail(@Body() idArray): Promise<ICheckEmailError | null> {
    return this.users.isExistEmail(idArray);
  }

  //////////

  @Put('user')
  putUserData(@Body() user: Users): Promise<any> {
    return this.users.putUserData(user);
  }

  @Put('password')
  putUserPassword(@Body() password): Promise<any> {
    return this.users.putUserPassword(password);
  }

  @Put('login')
  putUserLogin(@Body() login): Promise<any> {
    return this.users.putUserLogin(login);
  }

  @Put('key')
  putUserKey(@Body() key): Promise<any> {
    return this.users.putUserKey(key);
  }
}
