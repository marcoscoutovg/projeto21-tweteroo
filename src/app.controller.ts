import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dto';
import { CreateTweetDto } from './dtos/tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post("sign-up")
  @HttpCode(HttpStatus.OK)
  signUp(@Body() body: CreateUserDto) {
    return this.appService.createUser(body);
  }

  @Post('tweets')
  @HttpCode(HttpStatus.CREATED)
  createTweet(@Body() body: CreateTweetDto) {
    return this.appService.createTweet(body);
  }

  @Get('tweets')
  @HttpCode(HttpStatus.OK)
  getTweets(@Query('page') page: number) {
    return this.appService.getTweets(page);
  }

  @Get('/tweets/:username')
  @HttpCode(HttpStatus.OK)
  getTweetsByUser(@Param('username') username: string) {
    return this.appService.getTweetsByUser(username);
  }

}
