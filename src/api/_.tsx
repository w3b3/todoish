export const headers = {
  "X-Cassandra-Token": process.env.REACT_APP_ASTRA_DB_APPLICATION_TOKEN ?? "",
  "Content-Type": "application/json",
};
export const CONSTANTS = {
  TASKS_COLLECTION: "tasks",
};
