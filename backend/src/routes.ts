import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express();
const prisma = new PrismaClient();

// Home
router.get("/", (req: Request, res: Response) => {
  res.send("route");
});

// Services
router.post("/services", async (req: Request, res: Response) => {
  const { name, price } = req.body;

  const service = {
    name,
    price,
  };

  try {
    const response = await prisma.service.create({ data: service });
    res.status(201).send(response);
  } catch (error: any) {
    res.status(400).send(error.message || "Unable to create Service");
  }
});

router.get("/services", async (req: Request, res: Response) => {
  try {
    const response = await prisma.service.findMany();
    // response.forEach((res:Service) => {
    //   res.price = res.price;
    // });
    // Não precisa disso não tio
    res.status(201).send(response);
  } catch (error: any) {
    res.status(400).send(error.message || "Unable to list Services");
  }
});

export default router;
