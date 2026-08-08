// models/Counter.js

import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    seq: {
        type: Number,
        default: 99
    }
});

const employeeCounter = mongoose.model('employeeCounter', counterSchema);

export default employeeCounter;
