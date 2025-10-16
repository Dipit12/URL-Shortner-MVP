import mongoose from 'mongoose';
const URLSchema = new mongoose.Schema({
    shortURL: {
        type: String,
        required: true,
        unique: true
    },
    longURL: {
        type: String,
        required: true
    },
    timeStamps: [
        {
            timeStamps: {
                type: Date,
                default: Date.now
            }
        }
    ]
});
export default mongoose.model('URL', URLSchema);
