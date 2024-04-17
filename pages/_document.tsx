import { Html, Head, Main, NextScript } from 'next/document'
import Home from '../app/page'
 
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/images/rayicon/favicon.ico" />
        <title>Know Regan</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}