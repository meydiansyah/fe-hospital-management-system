"use client";

import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { store } from "@/store";
import i18n from "@/i18n";
import { useInitialDataFetch } from "@/hooks/useInitialDataFetch";

function LanguageSynchronizer() {
  const lang = useSelector((state: RootState) => state.language.lang);

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang).catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Failed to change language", error);
      });
    }
  }, [lang]);

  return null;
}

function InitialDataFetcher() {
  useInitialDataFetch();
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <LanguageSynchronizer />
        <InitialDataFetcher />
        {children}
      </I18nextProvider>
    </Provider>
  );
}
