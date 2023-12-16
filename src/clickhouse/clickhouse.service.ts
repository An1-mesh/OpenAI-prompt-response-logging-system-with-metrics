import { Injectable } from '@nestjs/common';
import { createClient, ClickHouseClient, ClickHouseLogLevel } from '@clickhouse/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClickhouseService {
  private readonly client: ClickHouseClient;

  constructor() {
    this.client = createClient({
      host: 'https://fn676uyydp.ap-south-1.aws.clickhouse.cloud:8443',
      username: 'default',
      password: 'jAqaF_IO86uKF',
      database: 'Prompt_Logging_DB',
      log: {
        level: ClickHouseLogLevel.WARN,
      }
    });
  }

  async logRequest(prompt: string, response: string, metadata: Record<string, any>, latency: number): Promise<void> {
    try {
      const tokenCount = prompt.split(' ').length;
      const id = uuidv4(); // Generate a unique UUID

      // Execute the INSERT query
      await this.client.insert({
        table: 'requests',
        format: 'JSON',
        values: [{
          id: id,
          prompt: prompt,
          response: response,
          token_count: tokenCount,
          metadata: JSON.stringify(metadata),
          latency: latency,
          created_at: new Date(),
        }],
      })

      console.log('Response logged successfully!');
    } catch (error) {
      console.error('Error logging request:', error);
      throw error; // Propagate the error if needed
    }
  }
}