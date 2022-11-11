const { User, Thought } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) => 
            !user 
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId }
        )
        .then((user) => 
            !user 
                ? res.status(404).json({ message: 'No user found'})
                : Thought.findOneAndUpdate(
                    {username: req.params.username},
                    {$pull: {username: req.params.username }},
                    {new: true })
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'User removed. No thoughts to remove.'})
                : res.json({message: 'user and thoughts removed'})
        )
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req,res) {
        User.findOneAndUpdate(
            { _id: rq.params.userId},
            {$set: req.body },
            {new: true}
        )
        .then((user) => 
            !user 
                ? res.status(404).json({ message: 'No thought associated with this id.'})
                : res.json({ user: "user has been updated"})
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)}
        )
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            {$addToSet: { friends: {friendId: req.params.friendId}}},
            {runValidators: true, new: true}
        )
        .then((friend) =>
            !friend
                ? res.status(404).json({ message: 'no friend with this id.'})
                : res.json(friend)
        ).catch((err) => res.status(500).json(err));
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            {$pull: {friends: {friendId: req.params.friendId}}},
            {runValidators: true, new: true}
        ).then((friend) =>
            !friend
                ? res.status(404).json({message: 'User not found'})
                : res.json({user: 'friend removed'})
        ).catch((err) => res.status(500).json(err));
    },   
};