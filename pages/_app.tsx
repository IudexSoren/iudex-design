import type { AppProps } from 'next/app'
import { SSRProvider } from 'react-aria';
import '@styles/globals.css'

import '@fontsource/be-vietnam/300.css';
import '@fontsource/be-vietnam/400.css';
import '@fontsource/be-vietnam/500.css';
import '@fontsource/be-vietnam/700.css';
import '@fontsource/ibm-plex-sans/100.css';
import '@fontsource/ibm-plex-sans/300.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import '@fontsource/familjen-grotesk/400.css';
import '@fontsource/familjen-grotesk/500.css';
import '@fontsource/familjen-grotesk/600.css';
import '@fontsource/familjen-grotesk/700.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  )
}

export default MyApp
