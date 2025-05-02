const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const mongodb = require('./db/connect');
const userRoute = require('./routes/users.js')
const themeRoute = require('./routes/theme.js')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 8080;



app.use(cors());

app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', userRoute);
app.use('/', themeRoute);



mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
