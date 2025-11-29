import express from 'express';
import { getNewsFeed } from "../service/newsService.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(getNewsFeed());
});

export default router;