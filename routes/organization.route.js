const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../utils/middleware')

const OrganizationController = require('../controllers/organization.controller')

router.get('/organizations', isAuthenticated, OrganizationController.GetAllOrganizations)
router.get('/organization/:organizationId/admins', isAuthenticated, OrganizationController.GetAdminsByOrganization)

router.post('/organization', isAuthenticated, OrganizationController.AddOrganization)

router.put('/organization/:organizationId', isAuthenticated, OrganizationController.UpdateOrganization)

router.delete('/organization/:organizationId', isAuthenticated, OrganizationController.DeleteOrganization)

module.exports = router