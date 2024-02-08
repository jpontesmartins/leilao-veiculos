import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'leilao-veiculos-0.0.1';
  }
}
