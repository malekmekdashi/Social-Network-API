const { User, Thought } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
        .then(thought => res.json(thought))
        .catch((err) => { console.log(err); res.status(500).json(err)})
    },
    getThoughtsById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) => 
            !thought 
                ? res.status(404).json({ message: 'No thought found' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { userId: req.body.userId },
                { $push: { thought: req.thoughtText }},
                { runValidators: true, new: true}
            )
        })
        .then((thought) => 
            !thought
                ? res.status(404).json({message: 'Error: please try again.'})
                : res.json({ message: "Thought created."})
        )
        .then((thought) => res.json(thought))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)});
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { thoughtId: req.params.thoughtId},
            { thoughtText: req.body.thoughtText, username: req.body.username },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: "Please try again" })
                : res.json({ thought: "Thought updated" })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then(() => res.json({ message: "thought removed" } ))
        .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { thoughtId: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true}
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: "No thought found." })
                : res.json({ thought: "Reaction added."})    
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { thoughtId: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.params.reactionId } }},
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: "No thought found" })
                : res.json({ thought: "Reaction removed."}) 
        )
        .catch((err) => res.status(500).json(err));
    },
};