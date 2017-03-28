// grab the mongoose module
var mongoose = require('mongoose');

// define our schema
var quoteSchema = new mongoose.Schema({
				quotes : {type : String, default: ''}
});

quoteSchema.set('collection', 'quotes');

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Quote', quoteSchema);
