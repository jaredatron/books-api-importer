# Google Books to CSV

This script searched the google books api for random words and exports data about the resulting books into a CSV file.

This was created to help populate a books database for `LearnersGuild` `Learners`

## Usage

Create a `Google API Key` and give it permission to use `Google Books`

Create a `.env` file that looks like this:

```
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY_HERE
```

Run it!

```
node google-books-to-csv.js
```

Check It!

```
cat books.csv
```


## LICENSE

This software is licensed under [The WTFPL (Do What the Fuck You Want To Public License)](https://en.wikipedia.org/wiki/WTFPL)
