import { Controller, Post, Header, Param, Body } from '@nestjs/common';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
    constructor (private members: MembersService){

    };

    @Post('remove/:id')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', '*')
    delete(@Param('id') id, @Body() body): Promise<Array<object>> {
        return this.members.removeFromGroup(id, body);
    }

    @Post('add/:id')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', '*')
    add(@Param('id') id, @Body() body): Promise<Array<object>> {
        return this.members.addToGroup(id, body);
    }
}
