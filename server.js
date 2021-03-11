const express = require("express");

const cors = require("cors");
const FormData = require("form-data");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

const fields = {
  name: "entry.1966862118",
  link: "entry.1854719752",
};

const formUrl =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfqI8uCLtuUH61GeNBBI29sYNF9nL6VRJ0xfeTb902qY4hY1A/formResponse";

app.post("/", (req, res, next) => {
  const form = new FormData();
  const { name, link } = req.body;
  console.log("req.body", req.body);
  if (!name || !link) {
    return res.status(400).json({ success: false });
  }

  form.append(fields.name, name);
  form.append(fields.link, link);

  form.submit(formUrl, (err, data) => {
    if (data.statusCode === 200) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  });
});

const PORT = 6060;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
