const mongoose = require('mongoose');

const medicationSchema = mongoose.Schema({
    brandName: {
        type: String, 
        required: [true, 'You must provide a brand name']
    },
    genericName: {
        type: String,
        required: [true, 'You must provide a generic name']
    },
    image: String,
    activeIngredient: String,
    dosage: String,
    administration: String,
    warning: String,
    consultation: String,
    isOTC: {type: Boolean, default: false},
    references: String
});

medicationSchema.index({brandName: 'text', genericName: 'text'})

const Medication = mongoose.model('Medication', medicationSchema);
module.exports = Medication;