import { CONSTANTS, headers } from "./_";
import { Task } from "../types";
import { v4 as uuidv4 } from "uuid";

export const addEntry = async (entry: string) => {
  try {
    const bodyPartial: Partial<Task> = {
      id: uuidv4(),
      name: entry,
      isDone: false,
      creationTime: new Date().valueOf(),
      lastUpdateTime: 0,
      tags: [],
    };
    const response = await fetch(
      `https://${process.env.REACT_APP_ASTRA_DB_ID}-${process.env.REACT_APP_ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/namespaces/${process.env.REACT_APP_ASTRA_DB_KEYSPACE}/collections/${CONSTANTS.TASKS_COLLECTION}/${bodyPartial.id}`,
      {
        method: "PUT",
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
