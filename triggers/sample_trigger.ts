import { Trigger } from "deno-slack-api/types.ts";
import ReminderWorkflow from "../workflows/sample_workflow.ts";

const trigger: Trigger = {
  type: "shortcut",
  name: "Set Reminder",
  description: "リマインダーを設定します",
  workflow: `#/workflows/${ReminderWorkflow.callback_id}`,
  inputs: {},
};

export default trigger;
