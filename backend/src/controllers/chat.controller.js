import { generateToken } from "../config/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const token = await generateToken(req.auth().userId);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating Stream token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
