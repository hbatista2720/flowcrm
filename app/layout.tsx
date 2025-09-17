import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/lib/auth/providers'
import { ThemeProvider } from '@/lib/themes/ThemeProvider'
import { TutorialProvider } from '@/components/tutorial/TutorialProvider'
import TutorialOverlay from '@/components/tutorial/TutorialOverlay'
import TutorialMenu from '@/components/tutorial/TutorialMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FlowCRM - Bot Builder & CRM',
  description: 'Plataforma todo-en-uno para crear bots de WhatsApp y gestionar leads',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <TutorialProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {children}
                <TutorialOverlay />
                <TutorialMenu />
              </div>
            </TutorialProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}