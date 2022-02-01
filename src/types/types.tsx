export const Locale = {
  BR: "pt-br",
  CA: "en-ca",
  US: "en-us",
};

export const Colors = [
  {
    base: "#0093E9",
    gradient:
      "radial-gradient( circle 685.3px at 47.8% 55.1%,  rgba(255,99,152,1) 0%, rgba(251,213,149,1) 90.1% )",
  },
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

export interface UpdateButtonInterface extends TaskManagementButton {
  handleAdd: () => any;
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
