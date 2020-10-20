const express = require('express')
const router = express.Router()

const OrganizationController = require('../controllers/organization.controller')

router.get('/organizations', OrganizationController.GetAllOrganizations)
router.get('/organization/:organizationId/admins', OrganizationController.GetAdminsByOrganization)

router.post('/organization', OrganizationController.AddOrganization)

router.put('/organization/:organizationId', OrganizationController.UpdateOrganization)

router.delete('/organization/:organizationId', OrganizationController.DeleteOrganization)

module.exports = router