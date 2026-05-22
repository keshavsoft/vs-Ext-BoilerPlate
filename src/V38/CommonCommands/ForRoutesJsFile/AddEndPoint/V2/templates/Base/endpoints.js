import express from 'express';
import bodyparser from "body-parser";

const router = express.Router();

router.use(bodyparser.json());

export { router };
