const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
	// get all thoughts
	async getAllThoughts(req, res) {
		try {
			const dbThoughtData = await Thought.find({}).sort({ _id: -1 });
			res.json(dbThoughtData);
		} catch (err) {
			console.log(err);
			res
				.status(500)
				.json({ message: "An error occurred while retrieving thoughts" });
		}
	},

	// get one thought by id
	async getThoughtById(req, res) {
		try {
			const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId })
				.populate({
					path: "reactions",
					select: "-__v",
				})
				.select("-__v");

			if (!dbThoughtData) {
				return res
					.status(404)
					.json({ message: "No thought found with this id!" });
			}
			res.json(dbThoughtData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	// create thought
	async createThought(req, res) {
		try {
			const dbThoughtData = await Thought.create(req.body);
			const dbUserData = await User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $push: { thoughts: dbThoughtData._id } },
				{ new: true }
			);

			if (!dbUserData) {
				return res
					.status(404)
					.json({ message: "No user found with this id!" });
			}
			// if (!dbUserData.isValid(req.body.userId)) {
			// 	return res.status(400).json({ message: "Invalid user ID." });
			// }


			
			res.json({ message: "Thought created!" });
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	// update thought by id
	async updateThought(req, res) {
		try {
			const dbThoughtData = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $set: req.body },
				{
					new: true,
					runValidators: true,
				}
			);

			if (!dbThoughtData) {
				return res
					.status(404)
					.json({ message: "No thought found with this id!" });
			}
			res.json({ message: "Thought updated!" });
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	// delete thought by id
	async deleteThought(req, res) {
		try {
			const deletedThought = await Thought.findOneAndDelete({
				_id: req.params.thoughtId,
			});

			if (!deletedThought) {
				return res
					.status(404)
					.json({ message: "No thought found with this id!" });
			}

			res.json({ message: "Thought deleted!" });
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	// add reaction to thought
	async addReaction(req, res) {
		try {
			const dbThoughtData = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $push: { reactions: req.body } },
				{ new: true, runValidators: true }
			);

			if (!dbThoughtData) {
				return res
					.status(404)
					.json({ message: "No thought found with this id!" });
			}
			res.json(dbThoughtData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	// remove reaction from thought
	async removeReaction(req, res) {
		try {
			const dbThoughtData = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $pull: { reactions: { reactionId: req.params.reactionId } } },
				{ new: true }
			);

			if (!dbThoughtData) {
				return res
					.status(404)
					.json({ message: "No thought found with this id!" });
			} else {
				res.json({ message: "Reaction deleted!" });
			}
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},
};
