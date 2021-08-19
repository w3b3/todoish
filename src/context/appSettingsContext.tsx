import { createContext, useState } from "react";

export interface IAppSettingsContext {
  isLoading: boolean;
  toggleLoading: () => void;
  isInitialized: boolean;
  toggleInitialized: () => void;
  locale: string;
  setLocale: (locale: string) => void;
}
export const AppSettingsContext = createContext<IAppSettingsContext>({
  isLoading: false,
  toggleLoading: () => ({}),
  isInitialized: false,
  toggleInitialized: () => ({}),
  locale: "pt-br",
  setLocale: (language) => ({}),
});

export const AppSettingsProvider = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [locale, setLocale] = useState("pt-br");
  return (
    <AppSettingsContext.Provider
      value={{
        isLoading,
        toggleLoading: () => setIsLoading(!isLoading),
        isInitialized,
        toggleInitialized: () => setIsInitialized(true),
        locale,
        setLocale,
      }}
    >
      {props.children}
    </AppSettingsContext.Provider>
  );
};

export default AppSettingsContext;
