const OrganizationService = require("../services/organization.service")
const { ParseOrganization } = require('../models/organization.model')

const Utils = require('./utils')

const GetAllOrganizations = async (req, res) => Utils.Execute(res, async () => {
    const organizations = await OrganizationService.Find({})
    return Utils.Success(res, organizations)
})

const GetAdminsByOrganization = async (req, res) => Utils.Execute(res, async () => {
    const { organizationId } = req.params
    const admins = await OrganizationService.FindOneAndPopulate(
        { _id: organizationId },
        'admins'
    )
    return Utils.Success(res, admins)
})

const AddOrganization = async (req, res) => Utils.Execute(res, async () => {
    const newOrganization = ParseOrganization(req)
    const existingOrganization = await OrganizationService.FindOne({
        org_name: newOrganization.org_name
    })
    if (existingOrganization) {
        return Util.Error(res, 409, "Organization already exist")
    }
    const organization = await OrganizationService.Create(newOrganization)
    return Utils.Success(res, organization)
})

const UpdateOrganization = async (req, res) => Utils.Execute(res, async () => {
    const { organizationId } = req.params
    const newData = ParseOrganization(req)
    const oldData = await OrganizationService.FindOne({
        _id: organizationId
    })

    if (!oldData) {
        return Utils.Error(res, 404, "Organization does not exist")
    }

    await OrganizationService.FindOneAndUpdate(
        { _id: organizationId },
        newData
    )
    const organizaiton = await OrganizationService.FindOne(
        { _id: organizationId }
    )
    return Utils.Success(res, organizaiton)
})

const DeleteOrganization = async (req, res) => Utils.Execute(res, async () => {
    const { organizationId } = req.params
    await OrganizationService.DeleteOne({ _id: organizationId })
    return Utils.Success(res, null)
})

module.exports = {
    GetAllOrganizations,
    GetAdminsByOrganization,
    AddOrganization,
    UpdateOrganization,
    DeleteOrganization
}