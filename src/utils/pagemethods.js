require('dotenv').config();
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_API_DATABASE;

const createPageToDatabase = async (place_name, address) => {
  const response = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      place: {
        title: [
          {
            text: {
              content: place_name,
            },
          },
        ],
      },
      address: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: address,
            },
          },
        ],
      },
      link: {
        url: '링크 미정',
      },

      status: {
        select: {
          name: '진료 대기',
        },
      },
    },
  });
  return response;
};

module.exports = { createPageToDatabase };
