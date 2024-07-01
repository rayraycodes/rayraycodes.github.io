import { Html, Head, Main, NextScript } from 'next/document'
import Copyright from '../components/Copyright'  
import Home from '../app/page'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/images/rayicon/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Copyright />
      </body>
    </Html>
  )
}