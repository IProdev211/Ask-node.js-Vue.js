const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const DoneEpisodeSchema = Schema(
  {
    episode: { type: Schema.Types.ObjectId, ref: 'Episode' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model('DoneEpisode', DoneEpisodeSchema);
