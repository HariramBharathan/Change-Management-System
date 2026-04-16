import express from "express";
import { getRequests, createRequest, approveHOD, approveAcademic } from "../controllers/requestController.js";

const router = express.Router();

router.get("/requests", getRequests);
router.post("/requests", createRequest);
router.patch("/requests/:id/hod", approveHOD);
router.patch("/requests/:id/academic", approveAcademic);

export default router;
