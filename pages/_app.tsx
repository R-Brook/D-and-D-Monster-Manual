import { Footer } from "components/Footer-foo";
import { Header } from "components/Header-foo";
import { PaginationProvider } from "context/pagination/paginationContext";
import type { AppProps } from "next/app";

import "../css/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PaginationProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </PaginationProvider>
    </>
  );
}
