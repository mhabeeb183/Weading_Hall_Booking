import './globals.css'

export const metadata = {
  title: 'Nachiyar Mahal | Premium Wedding Destination',
  description: 'Book your dream wedding at Nachiyar Mahal. View our elegant spaces and check availability.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
