import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

import nudgeHandler from './api/nudge.js'
import postmortemHandler from './api/postmortem.js'

function createVercelRes(nodeRes) {
  const vercelRes = {
    status(code) {
      nodeRes.statusCode = code
      return vercelRes
    },
    json(payload) {
      if (!nodeRes.headersSent) {
        nodeRes.setHeader('Content-Type', 'application/json')
      }
      nodeRes.end(JSON.stringify(payload))
    },
  }
  return vercelRes
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => resolve(data))
    req.on('error', () => resolve(''))
  })
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.OPENAI_API_KEY ||= env.OPENAI_API_KEY || env.VITE_OPENAI_API_KEY

  return {
    plugins: [
      react(),
      {
        name: 'mockmate-dev-api',
        apply: 'serve',
        configureServer(server) {
          server.middlewares.use('/api/nudge', async (req, res, next) => {
            if (req.method !== 'POST') {
              next()
              return
            }
            req.body = await readBody(req)
            await nudgeHandler(req, createVercelRes(res))
          })

          server.middlewares.use('/api/postmortem', async (req, res, next) => {
            if (req.method !== 'POST') {
              next()
              return
            }
            req.body = await readBody(req)
            await postmortemHandler(req, createVercelRes(res))
          })
        },
      },
    ],
	build: {
		chunkSizeWarningLimit: 1600,
	},
  }
})
