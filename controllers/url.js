const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateShortURL(req, res) {
  const body = req.body;
  //   console.log(body.url);
  if (!body.url) return res.json({ err: "No url  given" });
  const shortId = shortid();

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", { id: shortId });
}

async function handleGetURLWithShortURL(req, res) {
  const { id } = req.params;
  const entry = await URL.findOneAndUpdate(
    { shortId: id },
    {
      $push: {
        visitHistory: { timeStamp: Date.now() }, // Use timeStamp to match schema
      },
    },
    {
      new: true,
    }
  );
  if (!entry) {
    return res.status(404).json({ err: "Short URL not found" });
  }

  res.redirect(entry.redirectURL);
}
module.exports = {
  handleGenerateShortURL,
  handleGetURLWithShortURL,
};
