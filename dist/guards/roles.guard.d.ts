import { Tokens } from './../tokens/tokens.entity';
import { ExecutionContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Reflector } from '@nestjs/core';
export declare class Guard {
    private readonly reflector;
    private readonly tokensRepository;
    constructor(reflector: Reflector, tokensRepository: Repository<Tokens>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
