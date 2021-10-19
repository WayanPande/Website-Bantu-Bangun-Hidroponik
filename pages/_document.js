import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link rel="shortcut icon" type="images/png" href='/images/favicon.png' />
                </Head>
                <body>
                    <div id='overlays' />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;