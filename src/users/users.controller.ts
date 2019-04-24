import { NotesService } from './../notes/notes.service';
import { ParseIntPipe } from './../pipes/parse-int.pipe';
import { UsersService } from './users.service';
import { Get, Post, Param, Header, Controller, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private users: UsersService, private notes: NotesService) {
    }

    @Post('delete')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    add(@Body() idArray): Promise<object> {
    return this.users.deleteUsers(idArray);
    }

    @Post('exist/login')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    check(@Body() idArray): Promise<object> {
    return this.users.isExistLogin(idArray);
    }

    @Post('exist/phone')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    checkPhone(@Body() idArray): Promise<object> {
    return this.users.isExistPhone(idArray);
    }

    @Post('exist/key')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    checkKey(@Body() idArray) {
    return this.users.isExistKey(idArray);
    }

    @Post('exist/email')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    checkEmail(@Body() idArray): Promise<object> {
    return this.users.isExistEmail(idArray);
    }

    @Post('add')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    addUser(@Body() message){
    return this.users.addUser(message);
    }

    @Post('generate')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    generatePass(@Body() message){
    return this.users.generatePass(message);
    }

    @Get(':id')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findOne(@Param('id', new ParseIntPipe()) id) {
         return this.users.findOne(id);
      }

    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findAll(){
       return Promise.all([
            this.users.findAllActive(),
            this.notes.findAll(),
        ]).then(value => {
            const data = [];
            const usersQuantity = Object.keys(value[0]).length;
            const notesQuantity = Object.keys(value[1]).length;
            let lastNoteId = 0;

            for ( let i = 0; i < usersQuantity; i++) {
                const obj = {
                    id : value[0][i].id_user,
                    name : value[0][i].name,
                    surname : value[0][i].surname,
                    email : value[0][i].email,
                    phone: value[0][i].phone,
                    university : value[0][i].university,
                    department : value[0][i].department,
                    year : value[0][i].year,
                    index : value[0][i].index,
                    notes : [],
                };
                for (let j = lastNoteId; j < notesQuantity; j++) {
                    if (value[0][i].id_user === value[1][j].id_user){
                        obj.notes.push(value[1][j].note);
                    }
                    if (value[0][i].id_user < value[1][j].id_user){
                        lastNoteId = j;
                        break;
                    }
                }
                data.push(obj);
            }
            return data;
        });

    }
}
