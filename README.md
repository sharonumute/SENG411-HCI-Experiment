# SENG411 Assignment 2

You can view the experiment at: "https://sharonumute.github.io/SENG411-HCI-Experiment"

## Running the code

1. In the root directory, run `yarn start`

## Important: Deployment

1. in the `package.json` file, change the `homepage` variable to your deployment URL

## Important: Saving data to Google Sheets

1. Follow the instructions on this [Medium Article](https://www.freecodecamp.org/news/react-and-googlesheets/).
2. Create a `.env` file in the cloned root directory and add the variable `REACT_APP_GOOGLE_SHEETS`.
3. Copy the `CONNECTION URL` from the instructions, and assign it to this new variable.

Data collected from the site should now be sent directly to the provided google sheets.
