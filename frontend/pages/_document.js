import { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* {CssBaseline.flush()} */}
        <meta
          name="description"
          content="Jano - Creative Multipurpose React NextJS Template"
        />
        <meta
          name="keywords"
          content="agency, bootstrap 5, business, business multipurpose, charity, creative, creative template, crypto, education, hosting, insurance, landing page, portfolio, real estate, responsive, react, nextjs"
        />
        {/* fontawesome */}
        <script src="https://kit.fontawesome.com/1781837daa.js" crossorigin="anonymous"></script>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
