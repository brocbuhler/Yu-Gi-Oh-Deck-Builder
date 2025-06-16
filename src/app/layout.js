import { Inter } from 'next/font/google';
import PropTypes from 'prop-types';
import ClientProvider from '@/utils/context/ClientProvider';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, minHeight: '100vh' }}>
        {/* Background + overlay wrapper */}
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: "url('/images/favicon.ico')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            zIndex: -2,
          }}
        />
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)', 
            zIndex: -1,
          }}
        />
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  return {
    title: `Yu-Gi-Oh! Deck Builder - ${slug || 'HOME'}`,
    description: `This is a dynamically generated description for ${slug}.`,
    keywords: [`${slug}`, 'dynamic', 'page'],
    openGraph: {
      title: `Open Graph Title for ${slug}`,
      description: `Open Graph Description for ${slug}`,
      url: `https://yourwebsite.com/${slug}`,
    },
  };
};
