import mongoose from "mongoose";

const Schema = mongoose.Schema

const doAssignmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  testId: {
    type: Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  answers: [{
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
    answerId: {
      type: Schema.Types.ObjectId,
      ref: 'Answers',
    }
  }]
})

const DoAssignment = mongoose.model("DoAssignment", doAssignmentSchema)
export default DoAssignment