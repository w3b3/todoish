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
  keywords: Set<string>;
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
  keywords: new Set(),
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
  const [keywords, setKeywords] = useState<Set<string>>(new Set());
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
        keywords,
        addKeyword: (keyword) => {
          // debugger;
          const _ = keywords.add(keyword);
          setKeywords(_);
        },
      }}
    >
      {props.children}
    </AppSettingsContext.Provider>
  );
};

export default AppSettingsContext;
