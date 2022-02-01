import { createContext, useState } from "react";
import { Task } from "../types/types";

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
  currentFilter: string | null;
  setCurrentFilter: (filter: string | null) => void;
  taskName: string | null;
  setTaskName: (task: string | null) => void;
  taskList: Task[] | null;
  setTaskList: (list: Task[] | null) => void;
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
  currentFilter: null,
  setCurrentFilter: (filter) => ({}),
  taskName: null,
  setTaskName: (name) => ({}),
  taskList: null,
  setTaskList: (list) => ({}),
});

export const AppSettingsProvider = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isEditing, setEditing] = useState<{ isEditing: boolean; id: string }>({
    isEditing: false,
    id: "",
  });
  const [locale, setLocale] = useState("pt-br");
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<Set<string>>(new Set());
  const [taskName, setTaskName] = useState<string | null>(null);
  const [taskList, setTaskList] = useState<Task[] | null>(null);
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
          const _ = keywords.add(keyword.toUpperCase());
          setKeywords(_);
        },
        currentFilter,
        setCurrentFilter: (filter) => setCurrentFilter(filter),
        taskName,
        setTaskName: (name) => setTaskName(name),
        taskList,
        setTaskList: (list) => setTaskList(list),
      }}
    >
      {props.children}
    </AppSettingsContext.Provider>
  );
};

export default AppSettingsContext;
