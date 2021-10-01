import { createContext, useState } from "react";

export interface IAppSettingsContext {
  isLoading: boolean;
  toggleLoading: () => void;
  isInitialized: boolean;
  toggleInitialized: () => void;
  isEditing: { isEditing: boolean; id: string };
  toggleEditing: (id?: string) => void;
  locale: string;
  setLocale: (locale: string) => void;
  keywords: string[];
  addKeyword: (keyword: string) => void;
}

export const AppSettingsContext = createContext<IAppSettingsContext>({
  isLoading: false,
  toggleLoading: () => ({}),
  isInitialized: false,
  toggleInitialized: () => ({}),
  isEditing: { isEditing: false, id: "" },
  toggleEditing: (id?: string) => ({}),
  locale: "pt-br",
  setLocale: (language) => ({}),
  keywords: [],
  addKeyword: (keyword) => ({}),
});

export const AppSettingsProvider = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isEditing, setEditing] = useState<{ isEditing: boolean; id: string }>({
    isEditing: false,
    id: "",
  });
  const [locale, setLocale] = useState("pt-br");
  const [_keywords, setKeywords] = useState<string[]>([]);
  return (
    <AppSettingsContext.Provider
      value={{
        isLoading,
        toggleLoading: () => setIsLoading(!isLoading),
        isInitialized,
        toggleInitialized: () => setIsInitialized(true),
        isEditing,
        toggleEditing: (id: string = "") => setEditing({ isEditing: !!id, id }),
        locale,
        setLocale,
        keywords: _keywords,
        addKeyword: (keyword) => {
          const _ = [..._keywords];
          _.push(keyword);
          setKeywords(_);
        },
      }}
    >
      {props.children}
    </AppSettingsContext.Provider>
  );
};

export default AppSettingsContext;
