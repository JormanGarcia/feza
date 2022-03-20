import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import "normalize.css";
import "moment/locale/es";
import moment from "moment";
import GlobalStyles from "../styles/GlobalStyles";
import Layout from "~/components/Layout";
import Toast from "~/components/Toast";
import { ToastContextProvider, useToast } from "~/stores/toastStore";
import { useState } from "react";

moment.locale("es");

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <ToastContextProvider>
        <Layout>
          <Toast />

          <Component {...pageProps} />
        </Layout>
      </ToastContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
