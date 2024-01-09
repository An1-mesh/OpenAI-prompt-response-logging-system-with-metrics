import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { OpenaiService } from './openai/openai.service';
import { ClickhouseService } from './clickhouse/clickhouse.service';
import { DateTime } from 'luxon';

@Controller()
export class AppController {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly clickhouseService: ClickhouseService,
  ) {}

  @Post('query')
  async queryOpenaiAndLog(@Body() body: { prompt: string, model: string }): Promise<string> {
    const start = Date.now();

    try {
      const response = await this.openaiService.queryOpenai(body.prompt, body.model);

      // Log to ClickHouse
      await this.clickhouseService.logRequest(body.prompt, response.content, body.model, Date.now() - start);

      console.log('OpenAI query and Clickhouse logging successful!');

      return response.content;
    } catch (error) {
      // Handle errors
      console.error(error);
      return 'Error processing the OpenAI request!';
    }
  }

  // New endpoint for filtered queries
  @Get('filterData')
  async getFilteredData(@Query() query: { startDate: string, endDate: string }): Promise<any[]> {
    try {

      // console.log(query.startDate)
      // console.log(query.endDate)

      // Convert Luxon DateTime strings to Luxon DateTime objects
      const startDate = DateTime.fromISO(query.startDate);
      const endDate = DateTime.fromISO(query.endDate);

      // Your logic to fetch and return filtered sample data from your data source
      const filteredData = await this.clickhouseService.getFilteredClickhouseData(startDate, endDate);

      return filteredData;
    } catch (error) {
      console.error('Error fetching filtered data in the App controller:', error);
      throw new Error('Error fetching filtered data in the App controller');
    }
  }
}
