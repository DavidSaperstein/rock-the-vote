# node-react-heroku-template

## SETUP

These instruction assume you have already started a Heroku app to host this project on.

1. Create `.env` file with the following variables:
	* `PORT=8080` 
	* `HEROKU_URL=` *heroku app url*

2. ```yarn install```
3. ```cd client && yarn install```
4. In `App.js` update the `baseURL` to reflect the correct Heroku URL for production.

5. In root run ```yarn dev```

6. In `client` run ```yarn start```

*If you have set up successfully localhost:3000 should have a purple banner that reads **hello world**.*

This template uses a simple express server with a React frontend using SCSS. The state management in the example is hooks based. If you are using this for a larger app I recommend moving the reducer(s) to their own file.
