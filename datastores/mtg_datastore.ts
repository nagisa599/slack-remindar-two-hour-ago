import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

/**
 * Datastore for storing meeting information
 * and reminder schedules
 */
const MTGDatastore = DefineDatastore({
  name: "MTGSchedules",
  primary_key: "meeting_id",
  attributes: {
    meeting_id: {
      type: Schema.types.string,
    },
    title: {
      type: Schema.types.string,
    },
    date: {
      type: Schema.types.string, // ISO datetime string
    },
    members: {
      type: Schema.types.array,
      items: {
        type: Schema.slack.types.user_id,
      },
    },
    channel_id: {
      type: Schema.slack.types.channel_id,
    },
    created_by: {
      type: Schema.slack.types.user_id,
    },
    reminder_sent: {
      type: Schema.types.boolean,
    },
  },
});

export default MTGDatastore;