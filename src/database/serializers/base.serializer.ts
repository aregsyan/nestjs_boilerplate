import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class BaseResponse {
  @ApiProperty({
    description: 'id',
    type: String,
    required: true,
    example: '10c24d46-a88d-4420-8aa2-8e45f9ee2166', // Example ObjectId string
  })
  @Expose({name: 'id'})
  id: string;

  @ApiProperty({
    description: 'createdAt',
    type: Date,
    required: false,
    example: '2000-10-31T01:30:00.000', // Example ObjectId string
  })
  @Expose({name: 'createdAt'})
  createdAt: Date;

  @ApiProperty({
    description: 'updatedAt',
    type: Date,
    required: false,
    example: '2000-10-31T01:30:00.000', // Example ObjectId string
  })
  @Expose({name: 'updatedAt'})
  updatedAt: Date;
}