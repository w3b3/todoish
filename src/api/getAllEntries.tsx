import { CONSTANTS, headers } from "./_";
import { mockApiResponse } from "../mocks";

/*This conditional is used for debugging purposes only*/
const isDevelopment = process.env.REACT_APP_ENV === "development";

export const getAllEntries = async () => {
  try {
    /*This conditional is used for debugging purposes only*/
    if (isDevelopment) {
      console.info(process.env.REACT_APP_ENV, isDevelopment);
      //early return interrupts the flow below
      return {
        tasks: mockApiResponse,
        rowCount: 2,
        pagination: "jsalkdj239102931",
      };
    }
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
        ...e[1],
      };
    });
    return {
      tasks: tasks,
      rowCount: parsedResponse.profile.nested[0].queries[0].rowCount,
      pagination: parsedResponse.pageState,
    };
  } catch (e) {
    console.info("Error: getAllEntries", { e });
    return e;
  }
};
