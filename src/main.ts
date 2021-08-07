import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect } from "mongoose";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    console.log("[NestJS] App running");
    await connect(process.env.DATABASE_URL, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    console.log("[MongoDB] Connected successfully")
}
bootstrap();