import { Test, TestingModule } from '@nestjs/testing';
import { AuctionsController } from './auctions.controller';
import { AuctionsService } from './auctions.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateAuctionDto } from './dto/create-auction.dto';

describe('AuctionsController', () => {
  let controller: AuctionsController;
  let auctionService: AuctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionsController],
      providers: [AuctionsService, PrismaService],
    }).compile();

    controller = module.get<AuctionsController>(AuctionsController);
    auctionService = module.get<AuctionsService>(AuctionsService);
  });

  it('should return all Auctions', () => {

    auctionService.findAll = jest.fn().mockReturnValueOnce([{
      id: "1234",
      brand: "Teste",
      model: "Teste",
      year: 1234,
      startingBid: 1,
      actualBid: 1,
      auctionStartDate: "2024-02-08T11:42:45.838+00:00",
      auctionEndDate: "2024-02-08T11:42:45.838+00:00",
      creatorId: "1"
    },{
      id: "1235",
      brand: "Teste",
      model: "Teste",
      year: 1234,
      startingBid: 1,
      actualBid: 1,
      auctionStartDate: "2024-02-08T11:42:45.838+00:00",
      auctionEndDate: "2024-02-08T11:42:45.838+00:00",
      creatorId: "1"
    }]);

    expect(controller.findAll()).toStrictEqual([{
      id: "1234",
      brand: "Teste",
      model: "Teste",
      year: 1234,
      startingBid: 1,
      actualBid: 1,
      auctionStartDate: "2024-02-08T11:42:45.838+00:00",
      auctionEndDate: "2024-02-08T11:42:45.838+00:00",
      creatorId: "1"
    },{
      id: "1235",
      brand: "Teste",
      model: "Teste",
      year: 1234,
      startingBid: 1,
      actualBid: 1,
      auctionStartDate: "2024-02-08T11:42:45.838+00:00",
      auctionEndDate: "2024-02-08T11:42:45.838+00:00",
      creatorId: "1"
    }])
  });

  it('should return created Auction', () => {

    auctionService.create = jest.fn().mockReturnValueOnce({
      id: "1234",
      brand: "Teste Novo Auction",
      model: "Teste Novo Auction",
      year: 1234,
      startingBid: 1,
      actualBid: 1,
      auctionStartDate: "2024-02-08T11:42:45.838+00:00",
      auctionEndDate: "2024-02-08T11:42:45.838+00:00",
      creatorId: "1"
    });

    const createDto = new CreateAuctionDto();

    expect(controller.create(createDto)).toStrictEqual({
      id: "1234",
      brand: "Teste Novo Auction",
      model: "Teste Novo Auction",
      year: 1234,
      startingBid: 1,
      actualBid: 1,
      auctionStartDate: "2024-02-08T11:42:45.838+00:00",
      auctionEndDate: "2024-02-08T11:42:45.838+00:00",
      creatorId: "1"
    })
  });
});
