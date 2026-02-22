import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import ActiveContext from '@/context/active-context';
import { Web3ModalProvider } from '@/components/Web3ModalProvider';

export const metadata: Metadata = {
  title: 'Pi-Network',
  description: 'Pi Network: Pi Blockchain, Community & Developer Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ActiveContext>
        <Web3ModalProvider>
          <body>
            <Toaster position="top-center" />
            <main>{children}</main>
          </body>
        </Web3ModalProvider>
      </ActiveContext>
    </html>
  );
}
