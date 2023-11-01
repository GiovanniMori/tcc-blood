import { rewardSchema } from "@/schemas/reward";
import { Reward } from "@prisma/client";
import axios from "axios";

export async function createReward(reward: rewardSchema): Promise<void> {
  try {
    const response = await axios.post("/api/rewards", reward);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
