import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) { }

  // dar lance
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  create(@Body() createBidDto: CreateBidDto, @Request() req: any) {
    if (!req.user.id) {
      throw new ForbiddenException();
    }

    return this.bidsService.create(createBidDto);
  }

  @Get()
  findAll() {
    return this.bidsService.findAll();
  }

}
