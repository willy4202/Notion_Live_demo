require('dotenv').config();
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_API_DATABASE;

const getDatabase = async () => {
  const response = await notion.databases.query({ database_id: databaseId });
  const refinedResponse = response.results.map((page) => {
    return {
      id: page.id,
      place: page.properties.place.title[0]?.plain_text,
      address: page.properties.address.rich_text[0]?.plain_text,
      status: page.properties.status.select?.name,
      link: page.properties.link?.url,
    };
  });
  return refinedResponse;
};

const retrieveDatabase = async () => {
  const res = await notion.databases.retrieve({
    database_id: databaseId,
  });
  console.log(res);
};

retrieveDatabase();

module.exports = { getDatabase };
