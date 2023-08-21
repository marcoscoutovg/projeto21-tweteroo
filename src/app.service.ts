import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDto } from './dtos/user.dto';
import { CreateTweetDto } from './dtos/tweet.dto';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  getHealth(): string {
    return "I'm okay!";
  }
  createUser(body: CreateUserDto) {
    const user = new User(body.username, body.avatar);
    return this.users.push(user);
  }

  createTweet(body: CreateTweetDto) {
    const user = this.users.find(user => user.username === body.username);
    if (!user) throw new HttpException('User unauthorized', HttpStatus.UNAUTHORIZED);
    const tweet = new Tweet({ username: user.username, avatar: user.avatar }, body.tweet);
    return this.tweets.push(tweet);
  }

  getTweets(page: number) {

    if (page < 1) {
      throw new HttpException('Informe uma página válida!', HttpStatus.BAD_REQUEST)
    }
    return this.tweets.slice(this.tweets.length - 15).reverse();

  }

  getTweetsByUser(username: string) {
    return this.tweets.filter(t => t.username === username);
  }
}
