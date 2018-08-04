const mongoose = require('mongoose');

const ledger_sync = new mongoose.Schema({
    blockNum: {
        type: String,
        required: true
    },
    aadhar: {
        type: String,
        // required: true,
    },
    blockId: {
        type: String,
        required: true,
    },
    payload: {
        type: Object
    },
    block: {
        type: Object,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('ledger_sync', ledger_sync);