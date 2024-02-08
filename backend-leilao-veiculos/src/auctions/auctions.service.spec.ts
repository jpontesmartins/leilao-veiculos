import { Test, TestingModule } from '@nestjs/testing';
import { AuctionsService } from './auctions.service';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('AuctionsService', () => {
  let service: AuctionsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuctionsService, PrismaService],
    }).compile();

    service = module.get<AuctionsService>(AuctionsService);
    prisma = module.get<PrismaService>(PrismaService)

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
