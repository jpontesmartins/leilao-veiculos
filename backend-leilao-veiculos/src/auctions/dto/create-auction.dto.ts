import { ApiProperty } from "@nestjs/swagger";
export class CreateAuctionDto {

    @ApiProperty()
    brand: string;

    @ApiProperty()
    model: string;

    @ApiProperty()
    year: number;
    
    @ApiProperty()
    startingBid: number;

    @ApiProperty()
    initialDate: string;
    
    @ApiProperty()
    endDate: string;

    @ApiProperty()
    creatorId: string;

}
