import { Injectable } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { PrismaService } from '../../src/prisma/prisma.service';

@Injectable()
export class AuctionsService {
  constructor(private prisma: PrismaService) {}

  async create(createAuctionDto: CreateAuctionDto) {

    const dateConverter = s => {
      let [d, m, y] = s.split(/\D/);
      return new Date(y, m-1, d);
    };

    const newAuction = await this.prisma.auction.create({
      data: {
        actualBid: createAuctionDto.startingBid,
        auctionEndDate: dateConverter(createAuctionDto.endDate).toISOString(),
        auctionStartDate: dateConverter(createAuctionDto.initialDate).toISOString(),
        brand: createAuctionDto.brand,
        model: createAuctionDto.model,
        year: createAuctionDto.year,
        startingBid: createAuctionDto.startingBid,
        creatorId: createAuctionDto.creatorId
      }
    })

    return newAuction;
  }

  async findAll() {
    return await this.prisma.auction.findMany();
  }

}
