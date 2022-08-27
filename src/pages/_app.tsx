import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import LoadingIndicatorProvider from "../utils/LoadingIndicator/LoadingContextProvider";
import LoadingOverlay from "../utils/LoadingIndicator/LoadingOverlay";
import LoadingSlider from "../utils/LoadingIndicator/LoadingSlider";
import LoadingSkeleton from "../utils/LoadingIndicator/LoadingSkeleton";

const queryClient = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {



  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <LoadingIndicatorProvider
          blocking={LoadingOverlay}
          nonBlocking={LoadingSlider}
          replacing={LoadingSkeleton}
        >
          <Component {...pageProps} />
        </LoadingIndicatorProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
};

export default MyApp;
