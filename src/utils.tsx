import { Task } from "./types";

export const sortTasks = (a: Task, b: Task) => {
  return a.creationTime > b.creationTime ? 1 : 0;
};
