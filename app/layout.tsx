import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Animal Risk Map',
  description: 'Map for animal risk reports',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
