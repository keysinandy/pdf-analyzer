import axios from 'axios';

export class PdfAnalyzerService {
  private readonly baseUrl = 'http://localhost:3000'; // 后端API的基础URL

  async analyzePdf(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${this.baseUrl}/pdf/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error analyzing PDF:', error);
      throw error;
    }
  }
}

export const pdfAnalyzerService = new PdfAnalyzerService(); 