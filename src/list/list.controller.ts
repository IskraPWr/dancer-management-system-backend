import { Get, Header, Controller } from '@nestjs/common';

@Controller('list')
export class ListController {
    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findAll(): Array<object> {
      return [
        {
            id: '',
            id_sys: '',
            name: ' Grzegorz Kikut',
            product_name: '',
            price: '',
            quantiti: '',
            value: '',
          },
          {
            id: '',
            id_sys: '232',
            name: '',
            product_name: '',
            price: '',
            quantiti: '',
            value: '',
          },
          {
            id: '',
            id_sys: '',
            name: '',
            product_name: '',
            price: '2323',
            quantiti: '',
            value: '',
          },
      ];
    }
}
