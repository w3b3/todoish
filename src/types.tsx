export interface Task {
  name: string;
  id: string;
  creationTime: number;
  lastUpdateTime: number;
  isDone: boolean;
  tags?: string[];
}
