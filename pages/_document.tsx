import { Html, Head, Main, NextScript } from 'next/document';

const Document: React.FC = () => {

  return (
    <Html >
      <Head />
      <body
        className='font-encode-sans'
        data-theme="ix-light-primary"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;