const { query } = require('express')
const Organization = require('../models/organization.model')

const Find = async () => {
    const organizations =  await Organization.find({})
    return organizations
}

const FindOne = async (query) => {
    const organization = await Organization.findOne(query)
    return organization
}

const Create = async (data) => {
    const organization =  await Organization.create(data)
    return organization
}

const FindOneAndUpdate = async (filter, data) => {
    const organization = await Organization.findOneAndUpdate(filter, {...data})
    return organization
}

const DeleteOne = async (data) => {
    const organization = await Organization.deleteOne(filter)
    return organization
}

module.exports = {
    Find,
    FindOne,
    Create,
    FindOneAndUpdate,
    DeleteOne
}