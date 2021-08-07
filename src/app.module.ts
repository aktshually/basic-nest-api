import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: ".env.local"
    }), UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
