const NodeCache = require('node-cache');

const cacheTimeoutMin = 30;

const mycache = new NodeCache({checkperiod: cacheTimeoutMin * 60});

exports.mycache = mycache;