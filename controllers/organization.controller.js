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

const AddOrganization = async (req, res) => {
    try {
        const {
            org_name,
            org_description,
            org_country,
            org_city,
            org_picture,
        } = req.body
        const existing_organization = await OrganizationService.FindOne({
            org_name
        })

        if(existing_organization){
            return res.status(409).json({
                message: 'Data exists',
            })
        }

        await OrganizationService.Create({
            org_name,
            org_description,
            org_country,
            org_city,
            org_picture,
        })

        return res.status(200).json({
            message: 'Data inserted',
        })
    } catch (error) {
        console.log('error', error)
    }
}

module.exports = {
    GetAllOrganization
}