import { appWithTranslation } from "next-i18next";

import "@/styles/globals.css";
import { AppWrapper } from "@/context/context";

function MyApp({ Component, pageProps }) {
    return (
        <AppWrapper>
            <Component {...pageProps} />
        </AppWrapper>
    );
}

export default appWithTranslation(MyApp);
