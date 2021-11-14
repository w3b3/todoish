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
}
const isDevelopment = process.env.REACT_APP_ENV === "development";

export const getAllEntries = async (): Promise<GetAllEntriesResponse> => {
  try {
    const response = await fetch(
      isDevelopment
        ? "https://api-dev.brasileiro.ca/todoish/tasks"
        : "https://api.brasileiro.ca/todoish/tasks"
    );
    const parsedResponse: LambdaResponse = await response.json();
    return {
      tasks: parsedResponse.tasks ?? [],
      rowCount: parsedResponse.tasks.length,
      pagination: parsedResponse.pagination,
    };
  } catch (e: any) {
    console.info("Error: getAllEntries", { e });
    return e;
  }
};
