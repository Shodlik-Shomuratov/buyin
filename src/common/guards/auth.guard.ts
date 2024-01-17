import { Reflector } from '@nestjs/core';
import { RolesGuard } from './role.guard';
import { JwtService } from '@nestjs/jwt';

export const AuthGuard = new RolesGuard(new Reflector(), new JwtService());
