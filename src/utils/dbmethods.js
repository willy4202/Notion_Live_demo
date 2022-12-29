require('dotenv').config();
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_API_DATABASE;

const getDatabase = async () => {
  const response = await notion.databases.query({ database_id: databaseId });
  const refinedResponse = response.results.map((page) => {
    return {
      id: page.id,
      name: page.properties.이름.title[0]?.plain_text,
      number: page.properties.전화번호?.phone_number,
      status: page.properties.현황.status?.name,
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
