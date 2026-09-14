import { Hono } from 'hono'
import { renderer } from './renderer'
import api from './routes/api'
import { HomePage } from './pages/home'
import { DemoPage } from './pages/demo'
import { ReportPage } from './pages/report'
import type { Bindings } from './lib/types'

const app = new Hono<{ Bindings: Bindings }>()

app.use(renderer)

app.route('/api', api)

app.get('/', (c) => c.render(<HomePage />))

app.get('/demo', (c) =>
  c.render(<DemoPage />, { title: 'Live Demo — Wallet Attribution Engine | CRYPTO-ATTRIB' })
)

app.get('/report/:ref', async (c) => {
  const ref = c.req.param('ref')
  const row = await c.env.DB.prepare('SELECT * FROM cases WHERE case_ref = ?').bind(ref).first()
  if (!row) {
    return c.render(
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0A1128;color:#fff;font-family:sans-serif">
        <div style="text-align:center">
          <h1 style="font-family:'Lora',serif">Case not found</h1>
          <p style="color:#A9B7D0;margin-top:10px">
            No case with reference "{ref}" exists.{' '}
            <a href="/demo" style="color:#00E5FF">Run a new trace →</a>
          </p>
        </div>
      </div>,
      { title: 'Case not found' }
    )
  }
  const data = {
    ...row,
    graph: JSON.parse(row.graph_json as string),
  } as any
  return c.render(<ReportPage data={data} />, { title: `Report ${ref} | CRYPTO-ATTRIB` })
})

export default app
