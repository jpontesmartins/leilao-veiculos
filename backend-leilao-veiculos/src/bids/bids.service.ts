import { Injectable } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BidsService {
  constructor(private prisma: PrismaService) {}

  async create(createBidDto: CreateBidDto) {

    //validar o amount aqui tbm
    const auction = await this.prisma.auction.findUnique({
      where: {
        id: createBidDto.auctionId
      }
    });
    const isValidAmount = createBidDto.amount > auction.actualBid && createBidDto.amount > auction.startingBid;
    if (!isValidAmount){
      throw new Error("Errrrro");
    } 

    return await this.prisma.bid.create({
      data: {
        amount: createBidDto.amount,
        auctionId: createBidDto.auctionId,
        userId: createBidDto.userId
      }
    })
  }

  findAll() {
    return `TODOS OS LANCES`;
  }

}
