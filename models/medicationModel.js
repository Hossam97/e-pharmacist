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
    consultation: String
});

const Medication = mongoose.model('Medication', medicationSchema);
module.exports = Medication;