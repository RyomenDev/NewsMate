import express from "express";
const router = express.Router();

import { GetAllContacts } from "../controllers/admin.controller.js";
router.get("/contacts", GetAllContacts);

export default router;
