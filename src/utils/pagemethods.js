require('dotenv').config();
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_API_DATABASE;

const createPageToDatabase = async (hospital_name, number) => {
  const response = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      이름: {
        title: [
          {
            text: { content: hospital_name },
          },
        ],
      },

      전화번호: {
        phone_number: number,
      },
    },
  });
  return response;
};

module.exports = { createPageToDatabase };
