import { Provider } from 'react-redux'
import { Provider as SessionProvider } from 'next-auth/client'
import store from '../store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session} >
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  )
}

export default MyApp
