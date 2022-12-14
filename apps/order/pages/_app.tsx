import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartProvider from "../store/CartProvider";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function MyAppWithProvider({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <MyApp Component={Component} pageProps={pageProps} />
      </CartProvider>
      <Analytics />
    </QueryClientProvider>
  );
}

export default MyAppWithProvider;
