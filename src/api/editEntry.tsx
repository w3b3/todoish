import { CONSTANTS, headers } from "./_";
import { Task } from "../types";

export const editEntry = async (task: Task) => {
  try {
    const response = await fetch(
      `https://${process.env.REACT_APP_ASTRA_DB_ID}-${process.env.REACT_APP_ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/namespaces/${process.env.REACT_APP_ASTRA_DB_KEYSPACE}/collections/${CONSTANTS.TASKS_COLLECTION}/${task.id}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({
          ...task,
        }),
      }
    );
    const parsedResponse = await response.json();
    return parsedResponse.documentId;
  } catch (e) {
    console.info("addEntry", { e });
    return e;
  }
};
