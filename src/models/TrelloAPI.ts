import base from "axios";

class TrelloAPI {
  #API_KEY = "";
  #USER_KEY = "";
  #axios = undefined;

  /**
   *
   * @param API_KEY: API key from https://trello.com/app-key
   * @param USER_KEY: User key from trello
   */
  constructor(API_KEY, USER_KEY) {
    this.#API_KEY = API_KEY;
    this.#USER_KEY = USER_KEY;
    this.#axios = base.create({ baseURL: "https://api.trello.com" });
  }

  #makeRequest = async (url) => {
    try {
      const { data } = await this.#axios({
        method: "get",
        url,
        params: {
          key: this.#API_KEY,
          token: this.#USER_KEY,
        },
      });

      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  /**
   * @summary  List boards for given memberId
   * @param memberId: member id for user whos boards you'd like to collect
   * @default: "me" return the boards for the current user key
   */
  getBoards = async (memberId = "me") =>
    await this.#makeRequest(`/1/members/${memberId}/boards`);

  /**
   * @summary List all active cards for a board
   * @param id id of the board to collect
   * @returns all active cards on a board
   */
  getCardsOnBoard = async (id) =>
    await this.#makeRequest(`/1/boards/${id}/cards`);

  /**
   * @summary list all active board members
   * @param id id of the board
   * @returns a collection of board members
   */
  getMembersOnBoard = async (id) =>
    await this.#makeRequest(`/1/boards/${id}/members`);

  /**
   * @summary gets all cards a member is listed on
   * @param id id of member
   * @return a collection of cards
   */
  getCardsMemberIsOn = async (id) =>
    await this.#makeRequest(`/1/members/${id}/cards`);
}

export default TrelloAPI;
