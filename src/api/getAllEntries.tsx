interface MyMainObjectModel {
  creationTime: number;
  id: string;
  isDone: boolean;
  lastUpdateTime: number;
  name: string;
  tags: string[];
}
interface LambdaResponse extends GetAllEntriesResponse {
  stage: string;
}

interface GetAllEntriesResponse {
  tasks: MyMainObjectModel[];
  rowCount: number;
  pagination: string;
  error: null | string;
}
export const isDevelopment = process.env.REACT_APP_ENV === "development";

export const getAllEntries = async (): Promise<GetAllEntriesResponse> => {
  try {
    /* ENV "local" relies on package.json "proxy": "https://api-dev.brasileiro.ca",
     *  In this case the up to be hit would be "/todoish/tasks" and the domain is the above */

    const response = await fetch(
      `${isDevelopment ? "" : process.env.REACT_APP_API_HOST}/todoish/tasks`,
      {
        method: "GET",
        // headers: {
        //   "x-todoish": new Date(Date.now()).toUTCString(),
        //   "cache-control": "no=cache",
        // },
        keepalive: true,
        mode: "cors",
        redirect: "error",
        referrerPolicy: "same-origin",
        credentials: "same-origin",
        cache: "no-cache",
        body: null,
      }
    );
    const parsedResponse: LambdaResponse = await response.json();
    return {
      tasks: parsedResponse.tasks ?? [],
      rowCount: parsedResponse.tasks.length,
      pagination: parsedResponse.pagination,
      error: null,
    };
  } catch (e: any) {
    console.info("Error: getAllEntries", { e });
    return {
      tasks: [],
      rowCount: 0,
      pagination: "",
      error: e,
    };
  }
};
