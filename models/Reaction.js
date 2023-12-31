const { Schema, Types } = require("mongoose");
const dateFormat = require("dayjs");
//const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
	{
		reactionId: {
			type: Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			maxlength: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		},
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

module.exports = ReactionSchema;
