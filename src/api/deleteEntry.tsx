import { CONSTANTS, headers } from "./_";

export const deleteEntry = async (entry: string) => {
  try {
    const response = await fetch(
      `https://${process.env.REACT_APP_ASTRA_DB_ID}-${process.env.REACT_APP_ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/namespaces/${process.env.REACT_APP_ASTRA_DB_KEYSPACE}/collections/${CONSTANTS.TASKS_COLLECTION}/${entry}`,
      {
        method: "DELETE",
        headers,
      }
    );

    return response.status;
  } catch (e) {
    console.error("deleteEntry", e);
    return e;
  }
};
