import { CONSTANTS, headers } from "./_";
// import { mockApiResponse } from "../mocks";
/*This conditional is used for debugging purposes only*/
// const isLocalDevelopment = process.env.REACT_APP_ENV === "local";
const isDevelopment = process.env.REACT_APP_ENV === "development";

interface GetAllEntriesResponse {
  tasks: any;
  rowCount: any;
  pagination: any;
}

export const getAllEntries = async (): Promise<GetAllEntriesResponse> => {
  try {
    /*This conditional is used for debugging purposes only*/
    /*if (isLocalDevelopment) {
      console.info(process.env.REACT_APP_ENV, isDevelopment);
      //early return interrupts the flow below
      return {
        tasks: mockApiResponse,
        rowCount: 2,
        pagination: "jsalkdj239102931",
      };
    }*/
    const response = await fetch(
      `https://${process.env.REACT_APP_ASTRA_DB_ID}-${
        process.env.REACT_APP_ASTRA_DB_REGION
      }.apps.astra${
        isDevelopment ? "-dev" : ""
      }.datastax.com/api/rest/v2/namespaces/${
        process.env.REACT_APP_ASTRA_DB_KEYSPACE
      }/collections/${CONSTANTS.TASKS_COLLECTION}?page-size=20&profile=true`,
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
  } catch (e: any) {
    console.info("Error: getAllEntries", { e });
    return e;
  }
};
