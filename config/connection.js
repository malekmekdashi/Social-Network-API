const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;




// const { connect } = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/social-network', {
//     userNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// module.exports = mongoose.connection;
