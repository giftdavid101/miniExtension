import airtable from "airtable";

airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.REACT_APP_API_KEY,
});

const base = airtable.base(process.env.REACT_APP_BASE_ID as string);

export default base;
