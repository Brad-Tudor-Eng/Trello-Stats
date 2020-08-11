# Trello Stats

## Description

Creates a summary in the reports folder of each trello board for the supplied api key and user key
The summary will include the board name, card count, and count of cards for each active user.

## Keys

go to: [Trello API](https://trello.com/app-key)
The token on the main page is your api key.
Click the token link in the bottom of the first paragraph.
Follow the instructions to get your user key

Create a .env file in the root directory of the project
In the env file enter...

```sh

API_KEY=YOUR_API_KEY
USER_KEY=YOUR_USER_TOKEN

```

## Install and single run:

```sh
$ yarn
$ yarn single:build
$ yarn single:start
```
