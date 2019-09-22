import { Tokens } from './../tokens/tokens.entity';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reflector } from '@nestjs/core';

@Injectable()
export class Guard{
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(Tokens)
    private readonly tokensRepository: Repository<Tokens>,
  ) {
  }

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const token = context.getArgs()[0]['headers'];
    const id = context.getArgs()[0]['params']['id'];
    if (!roles) {
      return true;
    }

    if (roles[0] === 'admin') {
      return await this.tokensRepository
        .findOne({
          token: token,
        })
        .then(admin => {
          if (admin) {
            if (
              admin.role === 2 &&
              admin.date > new Date(new Date().valueOf() - 15 * 60 * 1000)
            ) {
              this.tokensRepository
                .update(
                  {
                    token: token,
                  },
                  {
                    date: new Date(),
                  },
                )
                .then(() => {
                  return true;
                });
            }
          }
          return false;
        });
    }

    if (roles[0] === 'user') {
      return await this.tokensRepository
        .findOne({
          token: token,
        })
        .then(user => {
          if (user) {
            if (
              user.role === 0 &&
              user.date > new Date(new Date().valueOf() - 15 * 60 * 1000) &&
              user.id_user === parseInt(id, 10)
            ) {
              console.log(43);
              this.tokensRepository.update(
                {
                  token: token,
                },
                {
                  date: new Date(),
                },
              );
              return true;
            }
          }
          return false;
        });
    }
    return false;
  }
}
