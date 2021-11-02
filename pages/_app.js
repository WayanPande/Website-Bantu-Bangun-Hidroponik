import { Provider } from 'react-redux'
import { Provider as SessionProvider } from 'next-auth/client'
import store from '../store'
import '../styles/globals.css'
import NProgress from "nprogress"
import Head from "next/head"
import Router from "next/router"

Router.onRouteChangeStart = url => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()

Router.onRouteChangeError = () => NProgress.done()

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session} >
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          />
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  )
}

export default MyApp
