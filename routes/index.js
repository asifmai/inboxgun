const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexcontroller');
const auth = require('../config/auth');

/* GET - Public - Dashboard */
router.get('/', auth.ensureAuthenticatedAdmin, indexController.index_get);

// GET - Public - Login
router.get('/login', indexController.login_get);

// GET - Public - Login
router.post('/login', indexController.login_post);

// GET - Public - Logout
router.get('/logout', indexController.logout_get);

// GET - Public - Signup
router.get('/signup', indexController.signup_get);

// GET - Public - Signup
router.post('/signup', indexController.signup_post);

// GET - Public - Campaigns
router.get('/campaigns', auth.ensureAuthenticatedAdmin, indexController.campaigns_get);

// GET - Public - Campaigns
router.get('/campaigns/new', auth.ensureAuthenticatedAdmin, indexController.newcampaign_get);

// GET - Public - Campaigns
router.get('/settings', auth.ensureAuthenticatedAdmin, indexController.settings_get);

// GET - Public - Add Setting
router.post('/settings/add', auth.ensureAuthenticatedAdmin, indexController.addsetting_post);

// GET - Public - Delete Setting
router.get('/settings/delete/:id', auth.ensureAuthenticatedAdmin, indexController.deletesetting_get);

// GET - Public - Edit Setting
router.post('/settings/edit', auth.ensureAuthenticatedAdmin, indexController.editsetting_post);

// GET - Public - Add Reply
router.post('/settings/replies/add', auth.ensureAuthenticatedAdmin, indexController.addreply_post);

// GET - Public - Delete Reply
router.get('/settings/replies/delete/:id', auth.ensureAuthenticatedAdmin, indexController.deletereply_get);

// GET - Public - Edit Reply
router.post('/settings/replies/edit', auth.ensureAuthenticatedAdmin, indexController.editreply_post);

module.exports = router;
