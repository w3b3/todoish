import { CONSTANTS, headers } from "./_";
const isDevelopment = process.env.REACT_APP_ENV === "development";

export const deleteEntry = async (entry: string) => {
  try {
    const response = await fetch(
      `https://${process.env.REACT_APP_ASTRA_DB_ID}-${
        process.env.REACT_APP_ASTRA_DB_REGION
      }.apps.astra${
        isDevelopment ? "-dev" : ""
      }.datastax.com/api/rest/v2/namespaces/${
        process.env.REACT_APP_ASTRA_DB_KEYSPACE
      }/collections/${CONSTANTS.TASKS_COLLECTION}/${entry}`,
      {
        method: "DELETE",
        headers,
      }
    );
    // Trying to run `.json()` I get the below error:
    // SyntaxError: JSON.parse: unexpected end of data at line 1 column 1 of the JSON data
    // const parsedResponse = await response.json();
    return response.status;
  } catch (e) {
    console.error("deleteEntry", e);
    return e;
  }
};
