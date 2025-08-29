import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const SendMessageFunction = DefineFunction({
  callback_id: "send_reminder",
  title: "Send Reminder",
  source_file: "functions/send_message.ts",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.types.string },
      title: { type: Schema.types.string },
      users: { type: Schema.types.array, items: { type: Schema.types.string } },
    },
    required: ["channel_id", "title", "users"],
  },
});

export default SlackFunction(
  SendMessageFunction,
  async ({ inputs, client }) => {
    const userMentions = inputs.users.map((id) => `<@${id}>`).join(" ");
    const message = `⏰ *リマインド*: ${inputs.title}\n${userMentions}`;
    await client.chat.postMessage({
      channel: inputs.channel_id,
      text: message,
    });
    return { outputs: {} };
  },
);
