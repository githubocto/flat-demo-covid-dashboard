import {
  readCSV,
  writeJSON,
  removeFile,
} from "https://deno.land/x/flat@0.0.8/mod.ts";

const inputFilename = Deno.args[0];
const outputFilename = inputFilename.replace(".csv", ".json");

const contents = await readCSV(inputFilename, { skipFirstRow: true });
const parsedContents = contents.map((d) => ({ ...d, Date: String(d["Date"]) }));

// await removeFile(inputFilename);

await writeJSON(outputFilename, parsedContents);
