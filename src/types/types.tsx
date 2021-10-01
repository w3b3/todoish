export const Locale = {
  BR: "pt-br",
  CA: "en-ca",
  US: "en-us",
};

// background-color:#0093E9 ;
// background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
// background-color: #8EC5FC;
// background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
// background-color: #8BC6EC;
// background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);

// export const Colors = [
//   "rgba(253, 212, 1, 0.95)",
//   "rgba(253, 212, 1, 0.85)",
//   "rgba(253, 212, 1, 0.75)",
// ];
export const Colors = [
  {
    base: "#0093E9",
    gradient:
      "radial-gradient( circle 685.3px at 47.8% 55.1%,  rgba(255,99,152,1) 0%, rgba(251,213,149,1) 90.1% )",
  },
  // {
  //   base: "#0093E9",
  //   gradient:
  //     "radial-gradient( circle 610px at 5.2% 51.6%,  #333 0%, #666 97.5% )",
  // },
  // {
  //   base: "#0093E9",
  //   gradient: "linear-gradient(300deg, #0093E9 0%, #80D0C7 100%)",
  // },
  // {
  //   base: "#ff000",
  //   gradient: "linear-gradient(300deg, #d53369 0%, #daae51 100%)",
  // },
  // {
  //   base: "#0000ff",
  //   gradient: "linear-gradient(150deg, #FDBB2D 0%, #3A1C71 100%)",
  // },
  // {
  //   base: "#8EC5FC",
  //   gradient: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
  // },
  // {
  //   base: "#8BC6EC",
  //   gradient: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
  // },
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
