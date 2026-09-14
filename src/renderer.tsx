import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || 'Real-Time Crypto Fraud Attribution System | I4C'}</title>
        <meta
          name="description"
          content="A real-time crypto fraud attribution system that traces victim-reported wallet addresses across chains and attributes them to exchanges in minutes — built for I4C, CIS Division."
        />
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230A1128'/%3E%3Ccircle cx='50' cy='50' r='22' fill='none' stroke='%2300E5FF' stroke-width='6'/%3E%3Ccircle cx='50' cy='50' r='6' fill='%2300E5FF'/%3E%3C/svg%3E" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Lora:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
})
