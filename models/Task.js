const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  tasks: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      deadlineDate: {
        type: Date,
        required: true
      },
      done: {
        type: Boolean,
        default: false
      },
      created_at: {
        type: Date,
        default: Date.now()
      }
    }
  ],

  created_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Task = mongoose.model("tasks", TaskSchema);
