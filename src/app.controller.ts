import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai/openai.service';
import { ClickhouseService } from './clickhouse/clickhouse.service';

@Controller()
export class AppController {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly clickhouseService: ClickhouseService,
  ) {}

  @Post('query')
  async queryOpenaiAndLog(@Body() body: { prompt: string, metadata: Record<string, any> }): Promise<string> {
    const start = Date.now();

    try {
      const response = await this.openaiService.queryOpenai(body.prompt, body.metadata.model);

      // Log to ClickHouse
      await this.clickhouseService.logRequest(body.prompt, response, body.metadata, Date.now() - start);

      console.log('OpenAI query and Clickhouse logging successful!');

      return response;
    } catch (error) {
      // Handle errors
      console.error(error);
      return 'Error processing the OpenAI request!';
    }
  }
}
