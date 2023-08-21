import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTweetDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    tweet: string;
}