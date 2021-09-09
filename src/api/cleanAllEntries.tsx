import { getAllEntries } from "./getAllEntries";
import { deleteEntry } from "./deleteEntry";

const cleanAllEntries = async () => {
  const res = await getAllEntries();
  res.tasks.forEach((e: any) => deleteEntry(e.id));
};

export { cleanAllEntries };
