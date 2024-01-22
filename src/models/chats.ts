import mongoose from "mongoose";

const schema = mongoose.Schema;

const chatSchema = new schema(
  {
    role: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Chat = mongoose.model("chat", chatSchema);

export default Chat;
