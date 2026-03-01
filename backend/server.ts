import 'dotenv/config'
import express, { type Application, type Request, type Response, type NextFunction } from 'express'
import cors from 'cors'
import { connectDB } from './config/db'
import contactRoutes from './routes/contact.routes'

const app: Application = express()
const PORT = process.env.PORT ?? 5001

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(
  cors({
    
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://surya-portfolio-three-xi.vercel.app/']
        : ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// ── Routes ────────────────────────────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Portfolio API is running 🚀' })
})

app.use('/api/contact', contactRoutes)

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// ── Global Error Handler ──────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ success: false, message: 'Internal server error' })
})

// ── Start ─────────────────────────────────────────────────────────────────────
const startServer = async (): Promise<void> => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`📦 Environment: ${process.env.NODE_ENV ?? 'development'}`)
  })
}

startServer().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})