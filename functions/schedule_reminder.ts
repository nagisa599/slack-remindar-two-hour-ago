import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { Trigger } from "deno-slack-api/types.ts";

export const ScheduleReminderFunction = DefineFunction({
  callback_id: "schedule_reminder",
  title: "Schedule Reminder",
  source_file: "functions/schedule_reminder.ts",
  input_parameters: {
    properties: {
      title: { type: Schema.types.string },
      datetime: { type: Schema.types.string },
      users: { type: Schema.types.array, items: { type: Schema.types.string } },
      channel_id: { type: Schema.types.string },
    },
    required: ["title", "datetime", "users", "channel_id"],
  },
});

export default SlackFunction(
  ScheduleReminderFunction,
  async ({ inputs, client }) => {
    const date = new Date(inputs.datetime);
    date.setHours(date.getHours() - 2); // 2時間前

    const scheduleTime = Math.floor(date.getTime() / 1000); // UNIX秒

    await client.workflows.schedule({
      function_id: "send_reminder",
      inputs: {
        title: inputs.title,
        users: inputs.users,
        channel_id: inputs.channel_id,
      },
      schedule_time: scheduleTime,
    });

    return { outputs: {} };
  },
);
