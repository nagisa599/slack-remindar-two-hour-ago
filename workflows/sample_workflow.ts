import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ScheduleReminderFunction } from "../functions/schedule_reminder.ts";

const workflow = DefineWorkflow({
  callback_id: "reminder_workflow",
  title: "Reminder Workflow",
  input_parameters: {
    properties: {},
    required: [],
  },
});

const form = workflow.addStep(Schema.slack.functions.OpenForm, {
  title: "リマインダーを設定",
  fields: {
    elements: [
      { name: "title", title: "タイトル", type: Schema.types.string },
      { name: "datetime", title: "日時", type: Schema.types.string },
      {
        name: "users",
        title: "メンバー",
        type: Schema.slack.types.user_id_array,
      },
    ],
    required: ["title", "datetime", "users"],
  },
});

workflow.addStep(ScheduleReminderFunction, {
  title: form.outputs.fields.title,
  datetime: form.outputs.fields.datetime,
  users: form.outputs.fields.users,
  channel_id: workflow.inputs.interactivity.interactor.id, // 投稿先チャンネル
});

export default workflow;
