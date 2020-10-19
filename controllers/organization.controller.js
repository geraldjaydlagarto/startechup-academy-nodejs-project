const OrganizationService = require("../services/organization.service")

const GetAllOrganization = async (req, res) => {
    try {
        const organizations = OrganizationService.Find
        return res.status(200).json({
            message: 'Ok',
            data: organizations
        })
    } catch (error) {
        console.log('error', error)
    }
}