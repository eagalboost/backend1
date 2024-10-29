import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createService,
  deleteService,
  getService,
  getServices,
  updateService,
} from "../controllers/service.controller.js";

const router = express.Router();

router.post("/", verifyToken, createService);
router.delete("/:id", verifyToken, deleteService);
router.get("/single-service/:id", getService);
router.get("/", getServices);
router.put("/:id", verifyToken, updateService);

export default router;
