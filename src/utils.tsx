import { Colors, Task } from "./types/types";

export const sortTasks = (a: Task, b: Task) => {
  return a.lastUpdateTime || a.creationTime > b.lastUpdateTime || b.creationTime
    ? 0
    : 1;
};

export const colorPositionInArray = (i: number, type?: string) => {
  switch (type) {
    case "primary": {
      return Colors[i % Colors.length];
    }
    case "secondary": {
      return Colors[i % Colors.length];
    }
    default:
      return Colors[i % Colors.length];
  }
};
