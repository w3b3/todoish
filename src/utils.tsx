import { Task } from "./strings/types/types";

export const sortTasks = (a: Task, b: Task) => {
  return a.lastUpdateTime || a.creationTime > b.lastUpdateTime || b.creationTime
    ? 0
    : 1;
};
