import {
  readCSV,
  writeJSON,
  removeFile,
} from "https://deno.land/x/flat@0.0.5/mod.ts";

const inputFilename = Deno.args[0];
const outputFilename = inputFilename.replace(".csv", ".json");

const contents = await readCSV(inputFilename, { skipFirstRow: true });
const parsedContents = contents.filter(
  (d) => d["sub_region_1"] !== "sub_region_1"
);

await removeFile(inputFilename);

await writeJSON(outputFilename, parsedContents);
