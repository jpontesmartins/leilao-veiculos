import { Injectable } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { PrismaService } from '../../src/prisma/prisma.service';

@Injectable()
export class AuctionsService {
  constructor(private prisma: PrismaService) {}

  async create(createAuctionDto: CreateAuctionDto) {
    const newAuction = await this.prisma.auction.create({
      data: {
        actualBid: createAuctionDto.startingBid,
        auctionEndDate: new Date("10/02/2024").toISOString(),
        auctionStartDate: new Date("08/02/2024").toISOString(),
        brand: createAuctionDto.brand,
        model: createAuctionDto.model,
        year: createAuctionDto.year,
        startingBid: createAuctionDto.startingBid,
        creatorId: "65c4be355a38c87234663719"
      }
    })

    return newAuction;
  }

  async findAll() {
    return await this.prisma.auction.findMany();
  }

}
