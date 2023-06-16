export const API_KEY = '81805be47c20a9977d0669120b6add4a';
export const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTgwNWJlNDdjMjBhOTk3N2QwNjY5MTIwYjZhZGQ0YSIsInN1YiI6IjY0ODIyOWYyZDJiMjA5MDBlYmJmM2RiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QBYkVP1Y4DcB7g5RndWRVtYQ8Tp2I0wKn0TtL28dElE';
export let PAGE = 1;
export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + ACCESS_TOKEN,
  },
};
