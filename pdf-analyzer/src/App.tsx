import { useState } from 'react'
import { Box, Button, Container, Paper, Typography, CircularProgress } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import axios from 'axios'
import { saveAs } from 'file-saver'

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile)
        setError(null)
      } else {
        setError('请上传PDF文件')
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      // 发送请求到API
      const response = await axios.post('http://localhost:3000/analyze-pdf', formData)
      
      // 下载生成的测试用例
      const blob = new Blob([JSON.stringify(response.data, null, 2)], {
        type: 'application/json'
      })
      saveAs(blob, 'test-cases.json')
    } catch (err) {
      setError('PDF分析失败，请重试')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          PDF需求文档分析器
        </Typography>
        
        <Paper
          sx={{
            p: 4,
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f5f5f5'
          }}
        >
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id="pdf-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="pdf-upload">
            <Button
              component="span"
              variant="contained"
              startIcon={<CloudUpload />}
              sx={{ mb: 2 }}
            >
              选择PDF文件
            </Button>
          </label>

          {file && (
            <Typography variant="body1" sx={{ mb: 2 }}>
              已选择: {file.name}
            </Typography>
          )}

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!file || loading}
            sx={{ mt: 2 }}
          >
            {loading ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
                分析中...
              </>
            ) : (
              '开始分析'
            )}
          </Button>
        </Paper>
      </Box>
    </Container>
  )
}

export default App
