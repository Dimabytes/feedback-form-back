import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {checkSchema, validationResult} from 'express-validator';
import addFeedback, {init} from './googleTable';
import logger from './logger';

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

const feedbackSchema = {
  category: {
    exists: true
  }
};

app.post('/feedback', checkSchema(feedbackSchema), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  try {
    await addFeedback(req.body);
    res.send();
  } catch (e) {
    logger.error(e.message);
    res.status(400).json({errors: e.message});
  }
});

init()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch(e => {
    logger.error(e.message);
  });
