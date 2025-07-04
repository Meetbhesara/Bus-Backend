const generateSegments = require('./generateSegment');
const seatAssign = require('./seat-assign');

module.exports = {
    success: require('./success-response'),
    Error: require('./error-response'),
    generateSegments:require('./generateSegment'),
    seatAssign: require('./seat-assign'),
}