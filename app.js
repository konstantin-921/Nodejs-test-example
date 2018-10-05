import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import auth from './route/auth';
import users from './route/users';
import boards from './route/boards';
import columns from './route/columns';
import tasks from './route/tasks';
import passport from './services/strategy';

const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(auth);
app.use(users);
app.use(boards);
app.use(columns);
app.use(tasks);

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const server = app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

export default server;
