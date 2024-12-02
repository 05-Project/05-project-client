import {
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="05-proejct" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
