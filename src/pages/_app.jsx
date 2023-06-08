import Head from "next/head";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { store } from "@/store";
import { createEmotionCache } from "@/utils/create-emotion-cache";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/lang/i18";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import "./CKEditor.css";

const clientSideEmotionCache = createEmotionCache();

export default function App(props) {
  const { i18n } = useTranslation();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  globalThis.localStorage?.setItem("i18nextLng", "en");
  const lang = globalThis.localStorage?.getItem("i18nextLng");

  useEffect(() => {
    // if (lang === "ar" || lang === "en") {
    //   document.documentElement.setAttribute("dir", "rtl");
    // } else {
    //   document.documentElement.setAttribute("dir", "ltr");
    // }
    i18n.changeLanguage(lang);
  }, [lang]);

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>{`${process.env.APP_NAME}`}</title>
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </Provider>
    </>
  );
}
