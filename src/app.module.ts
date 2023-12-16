import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OpenaiService } from './openai/openai.service';
import { ClickhouseService } from './clickhouse/clickhouse.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [OpenaiService, ClickhouseService],
})
export class AppModule {}
