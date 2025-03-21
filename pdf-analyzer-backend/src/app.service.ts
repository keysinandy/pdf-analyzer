import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as pdf from 'pdf-parse';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly DEEPSEEK_API_URL =
    'https://api.deepseek.com/v1/chat/completions';
  private DEEPSEEK_API_KEY!: string;

  onModuleInit() {
    const apiKey = process.env.DEEPSEEK_API_KEY || 'your deepseek key';
    if (!apiKey) {
      throw new Error('DEEPSEEK_API_KEY must be set in environment variables');
    }
    this.DEEPSEEK_API_KEY = apiKey;
  }

  getHello(): string {
    return 'Hello World!';
  }

  async analyzePdfAndGenerateTests(file: Express.Multer.File): Promise<any> {
    try {
      // Read PDF content
      const dataBuffer = fs.readFileSync(file.path);
      const pdfData = await pdf(dataBuffer);
      const pdfText = pdfData.text;

      // Prepare prompt for DeepSeek API
      const prompt = `根据以下PDF内容，生成全面的测试用例，覆盖文档中描述的主要功能。请同时考虑正面和负面的测试场景：

${pdfText}

请按照以下格式生成测试用例：
1. 测试用例ID
2. 描述
3. 前置条件
4. 测试步骤
5. 预期结果
6. 测试数据
7. 优先级`;

      // Call DeepSeek API
      const response = await axios.post(
        this.DEEPSEEK_API_URL,
        {
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${this.DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // Clean up uploaded file
      fs.unlinkSync(file.path);

      return {
        success: true,
        testCases: response.data.choices[0].message.content,
      };
    } catch (error) {
      console.error('Error analyzing PDF:', error);
      throw error;
    }
  }
}
