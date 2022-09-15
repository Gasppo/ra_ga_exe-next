import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import LoadingIndicatorProvider from "../utils/LoadingIndicator/LoadingContextProvider";
import LoadingOverlay from "../utils/LoadingIndicator/LoadingOverlay";
import LoadingSlider from "../utils/LoadingIndicator/LoadingSlider";
import LoadingSkeleton from "../utils/LoadingIndicator/LoadingSkeleton";
import { StyledEngineProvider } from "@mui/material";
import ErrorHandlerProvider from "../utils/ErrorHandler/error";

const queryClient = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {



  return (
    <StyledEngineProvider injectFirst>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <ErrorHandlerProvider>
            <LoadingIndicatorProvider
              blocking={LoadingOverlay}
              nonBlocking={LoadingSlider}
              replacing={LoadingSkeleton}
            >
              <Component {...pageProps} />
            </LoadingIndicatorProvider>
          </ErrorHandlerProvider>
        </QueryClientProvider>
      </SessionProvider>
    </StyledEngineProvider>
  )
};

export default MyApp;
