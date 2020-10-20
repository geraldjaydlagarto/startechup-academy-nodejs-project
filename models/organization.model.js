const mongoose = require('mongoose')

const OrganizationSchema = new mongoose.Schema({
    org_name: String,
    org_description: String,
    org_country: String,
    org_city: String,
    org_picture: String,
    admins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false
})

const Organization = mongoose.model('organization', OrganizationSchema, 'organization')

OrganizationSchema.pre('findOneAndUpdate', async function() {
    this.update({}, { $set: { updatedAt: new Date() } })
})

const ParseOrganization = {
    org_name,
    org_description,
    org_country,
    org_city,
    org_picture,
} = (req) => { return req.body }

module.exports = { Organization, ParseOrganization }