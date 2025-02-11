const app = require('./app.js');
const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`server is up and running on http://localhost::${port}`);
});
