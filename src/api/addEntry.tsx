import { CONSTANTS, headers } from "./_";
import { Task } from "../types";

export const addEntry = async (entry: string) => {
  try {
    const bodyPartial: Partial<Task> = {
      name: entry,
      isDone: false,
      creationTime: new Date().valueOf(),
      lastUpdateTime: 0,
      tags: [],
    };
    const response = await fetch(
      `https://${process.env.REACT_APP_ASTRA_DB_ID}-${process.env.REACT_APP_ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/namespaces/${process.env.REACT_APP_ASTRA_DB_KEYSPACE}/collections/${CONSTANTS.TASKS_COLLECTION}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(bodyPartial),
      }
    );
    const parsedResponse = await response.json();
    return parsedResponse.documentId;
  } catch (e) {
    console.info("addEntry", { e });
    return e;
  }
};
