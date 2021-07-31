import { CONSTANTS, headers } from "./_";

export const getAllEntries = async () => {
  try {
    const response = await fetch(
      `https://${process.env.REACT_APP_ASTRA_DB_ID}-${process.env.REACT_APP_ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/namespaces/${process.env.REACT_APP_ASTRA_DB_KEYSPACE}/collections/${CONSTANTS.TASKS_COLLECTION}?page-size=20&profile=true`,
      {
        method: "GET",
        headers,
      }
    );
    const parsedResponse = await response.json();
    const tasks = Object.entries(parsedResponse.data).map((e: any) => {
      return {
        id: e[0],
        name: e[1].name || e[1].taskName,
        creationTime: e[1].creationTime,
      };
    });
    return {
      tasks: tasks,
      rowCount: parsedResponse.profile.nested[0].queries[0].rowCount,
      pagination: parsedResponse.pageState,
    };
  } catch (e) {
    console.info("getAllEntries", { e });
    return e;
  }
};
