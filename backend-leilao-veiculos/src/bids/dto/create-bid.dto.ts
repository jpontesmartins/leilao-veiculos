import { ApiProperty } from "@nestjs/swagger";

export class CreateBidDto {
    
    @ApiProperty()
    amount: number;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    auctionId: string;

}
