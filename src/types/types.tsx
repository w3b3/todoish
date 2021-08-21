export const Locale = {
  BR: "pt-br",
  CA: "en-ca",
  US: "en-us",
};

export const Colors = [
  "cb997e",
  "eddcd2",
  "fff1e6",
  // "f0efeb",
  "ddbea9",
  "a5a58d",
  "b7b7a4",
];

export interface Task {
  name: string;
  id: string;
  creationTime: number;
  lastUpdateTime: number;
  isDone: boolean;
  tags: string[];
}

export interface EditMode {
  id: string;
  isEditing: boolean;
}

export interface TaskManagementButton {
  entry: Task;
}

export interface FavoriteButtonInterface extends TaskManagementButton {
  handleFavorite: (id: string) => any;
}

export interface CompleteButtonInterface extends TaskManagementButton {
  handleComplete: (id: string) => any;
}
export interface EditButtonInterface extends TaskManagementButton {
  handleEdit: (id: string) => any;
}

export interface RestoreButtonInterface extends TaskManagementButton {
  handleRestore: (id: string) => any;
}

export interface DeleteButtonInterface extends TaskManagementButton {
  handleDelete: (id: string) => any;
}

export interface CancelEditButtonInterface extends TaskManagementButton {
  handleCancelEdit: () => any;
}
