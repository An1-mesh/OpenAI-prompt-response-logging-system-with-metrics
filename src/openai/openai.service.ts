import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class OpenaiService {
  private readonly openai = new OpenAI({
    apiKey: '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',
  });

  async queryOpenai(prompt: string, model: string): Promise<Record<string, string>> {
    try {
      const response = await this.openai.chat.completions.create({
        model: model,
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          {role: 'user', content: prompt},
        ],
        max_tokens: 300, // Adjust as needed
      });

      console.log('Query completed!')

      return { status: '200', content: response.choices[0]?.message?.content || '' }
    } catch (error) {
      console.error('Error calling OpenAI API:', error.message);
      // throw new Error('Error calling OpenAI API');
      return { status: error.message.substring(0, 3), content: error.message }
    }
  }
}
