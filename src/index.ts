import dotenv from "dotenv";
import fs from "fs";

import TrelloAPI from "./models/TrelloAPI";
dotenv.config();


const { API_KEY, USER_KEY } = process.env;

const Trello = new TrelloAPI(API_KEY, USER_KEY);

const run = async () => {
  const boards = await Trello.getBoards();
  const report = await Promise.all(
    boards.map(async (board) => {
      const membersOnBoard = await Trello.getMembersOnBoard(board.id);

      const membersMap = membersOnBoard.reduce((obj, member) => {
        return { ...obj, [member.id]: member.fullName };
      }, {});

      const cards = await Trello.getCardsOnBoard(board.id);
      const totalCards = cards.length;

      const cardsOnBoard = cards.reduce((col, card) => {
        const { idMembers } = card;
        try {
          const names = idMembers.map((id) => membersMap[id]);
          const mappedNames = { ...col };

          names.forEach((name) => {
            mappedNames[name] = !!mappedNames[name] ? mappedNames[name] + 1 : 1;
          });

          return mappedNames;
        } catch {
          return col;
        }
      }, {});

      return {
        boardId: board.id,
        name: board.name,
        totalCards,
        cardsOnBoard,
      };
    })
  );

  const date = new Date().toLocaleDateString();
  const json = JSON.stringify({ date, report }, null, 2);

  fs.writeFileSync(`./reports/${date.split("/").join("_")}_report.json`, json);
};

run();
