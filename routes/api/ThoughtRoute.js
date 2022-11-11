const router = require('express').Router();
const { getAllThoughts, getThoughtsById, createThought, updateThought, deleteThought, addReaction, deleteReaction} = require('../../controllers/ThoughtController');


//   --/api/thought
router.route('/').get(getAllThoughts).post(createThought);

//  --/api/thought/:id
router.route('/:thoughtId').get(getThoughtsById).post(updateThought).delete(deleteThought);


//  --/api/thought/thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;