import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class OpenaiService {
  private readonly openai = new OpenAI({
    apiKey: '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',
  });

  async queryOpenai(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          {role: 'user', content: prompt},
        ],
        max_tokens: 100, // Adjust as needed
      });

      console.log('Query completed!')

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error calling OpenAI API:', error.message);
      throw new Error('Error calling OpenAI API');
    }
  }
}
