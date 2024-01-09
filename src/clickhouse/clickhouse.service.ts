import { Injectable } from '@nestjs/common';
import { createClient, ClickHouseClient, ClickHouseLogLevel } from '@clickhouse/client';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

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
      const tokenCount = response.split(' ').length;
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

  async getFilteredClickhouseData(startDate: DateTime, endDate: DateTime): Promise<any[]> {
    try {
      // Format dates before passing to ClickHouse
      const formattedStartDate = startDate.toFormat('yyyy-MM-dd HH:mm:ss');
      const formattedEndDate = endDate.toFormat('yyyy-MM-dd HH:mm:ss');
      
      // Construct your filtered query based on parameters
      const result = await this.client.query({
        query: `
        SELECT *
        FROM requests
        WHERE created_at BETWEEN {start_date: DateTime}
        AND {end_date: DateTime}
        ORDER BY created_at DESC
        LIMIT 10`,
        format: 'JSONEachRow',
        query_params: {
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        }
      });

      // Extract rows from the result
      const rows = await result.json();
      console.log('rows:', rows)

      return rows as any[];
    } catch (error) {
      console.error('Error fetching filtered data from the database:', error);
      throw new Error('Error fetching filtered data from the database');
    }
  }
}
