import {
  readCSV,
  readJSON,
  writeJSON,
  removeFile,
} from "https://deno.land/x/flat@0.0.11/mod.ts";

const outputFilename = "./dashboard/data.json";

// load data saved from Flat
const mobilityData = await readJSON("./raw-data/mobility.json");
const covidStatsData = await readJSON("./raw-data/covid_stats.json");
const restrictionsData = await readCSV("./raw-data/restrictions_per_state.csv");
const states = await readJSON("./postprocessing/stateNames.json");

// combine our data sources into a single array of objects
const combinedData = states
  .map(({ name, abbreviation }) => {
    const mobilityRaw = mobilityData.find((d) => d["sub_region_1"] === name);
    if (!mobilityRaw) return;
    const mobility = {
      date: mobilityRaw["date"],
      groceryAndPharmacyPercentChangeFromBaseline: mobilityRaw[
        "grocery_and_pharmacy_percent_change_from_baseline"
      ].length
        ? +mobilityRaw["grocery_and_pharmacy_percent_change_from_baseline"]
        : null,
      parksPercentChangeFromBaseline: mobilityRaw[
        "parks_percent_change_from_baseline"
      ].length
        ? +mobilityRaw["parks_percent_change_from_baseline"]
        : null,
      residentialPercentChangeFromBaseline: mobilityRaw[
        "residential_percent_change_from_baseline"
      ].length
        ? +mobilityRaw["residential_percent_change_from_baseline"]
        : null,
      retailAndRecreationPercentChangeFromBaseline: mobilityRaw[
        "retail_and_recreation_percent_change_from_baseline"
      ].length
        ? +mobilityRaw["retail_and_recreation_percent_change_from_baseline"]
        : null,
      transitStationsPercentChangeFromBaseline: mobilityRaw[
        "transit_stations_percent_change_from_baseline"
      ].length
        ? +mobilityRaw["transit_stations_percent_change_from_baseline"]
        : null,
      workplacesPercentChangeFromBaseline: mobilityRaw[
        "workplaces_percent_change_from_baseline"
      ].length
        ? +mobilityRaw["workplaces_percent_change_from_baseline"]
        : null,
    };
    const covidStats = covidStatsData
      .filter((d) => d["state"] === name)
      .map(({ date, cases, deaths }) => ({
        Date: date,
        cases: cases.length ? +cases : null,
        deaths: deaths.length ? +deaths : null,
      }));

    const restrictions = restrictionsData
      .filter((d) => d["RegionName"] === name)
      .map((d) => ({
        Date: d["Date"],
        schoolClosing: d["C1_School closing"].length
          ? +d["C1_School closing"]
          : null,
        workplaceClosing: d["C2_Workplace closing"].length
          ? +d["C2_Workplace closing"]
          : null,
        cancelPublicEvents: d["C3_Cancel public events"].length
          ? +d["C3_Cancel public events"]
          : null,
        restrictionsOnGatherings: d["C4_Restrictions on gatherings"].length
          ? +d["C4_Restrictions on gatherings"]
          : null,
        closePublicTransport: d["C5_Close public transport"].length
          ? +d["C5_Close public transport"]
          : null,
        stayAtHomeRequirements: d["C6_Stay at home requirements"].length
          ? d["C6_Stay+ at home requirements"]
          : null,
        restrictionsOnInternalMovement: d[
          "C7_Restrictions on internal movement"
        ].length
          ? d["C7_Restrictions+ on internal movement"]
          : null,
        internationalTravelControls: d["C8_International travel controls"]
          .length
          ? +d["C8_International travel controls"]
          : null,
      }));
    return { name, mobility, covidStats, restrictions };
  })
  .filter(Boolean);

// // clean separate data files
// await removeFile("mobility.json");
// await removeFile("covid_stats.csv");
// await removeFile("restrictions_per_state.csv");

// save our shiny new combined data!
await writeJSON(outputFilename, combinedData);
