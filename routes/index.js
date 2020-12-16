const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexcontroller');
const settingController = require('../controllers/settingreplycontroller');
const campaignController = require('../controllers/campaigncontroller');
const auth = require('../config/auth');

/* GET - Private - Dashboard */
router.get('/', auth.ensureAuthenticatedAdmin, indexController.index_get);

// GET - Public - Login
router.get('/login', indexController.login_get);

// GET - Public - Login
router.post('/login', indexController.login_post);

// GET - Private - Logout
router.get('/logout', auth.ensureAuthenticatedAdmin, indexController.logout_get);

// GET - Public - Signup
router.get('/signup', indexController.signup_get);

// GET - Public - Signup
router.post('/signup', indexController.signup_post);

// GET - Private - Campaigns
router.get('/campaigns', auth.ensureAuthenticatedAdmin, campaignController.campaigns_get);

// GET - Private - New Campaign
router.get('/campaigns/new', auth.ensureAuthenticatedAdmin, campaignController.newcampaign_get);

// GET - Private - New Campaign
router.post('/campaigns/new', auth.ensureAuthenticatedAdmin, campaignController.newcampaign_post);

// GET - Private - Campaigns
router.get('/settings', auth.ensureAuthenticatedAdmin, settingController.settings_get);

// GET - Private - Add Setting
router.post('/settings/add', auth.ensureAuthenticatedAdmin, settingController.addsetting_post);

// GET - Private - Delete Setting
router.get('/settings/delete/:id', auth.ensureAuthenticatedAdmin, settingController.deletesetting_get);

// GET - Private - Edit Setting
router.post('/settings/edit', auth.ensureAuthenticatedAdmin, settingController.editsetting_post);

// GET - Private - Add Reply
router.post('/settings/replies/add', auth.ensureAuthenticatedAdmin, settingController.addreply_post);

// GET - Private - Delete Reply
router.get('/settings/replies/delete/:id', auth.ensureAuthenticatedAdmin, settingController.deletereply_get);

// GET - Private - Edit Reply
router.post('/settings/replies/edit', auth.ensureAuthenticatedAdmin, settingController.editreply_post);

module.exports = router;
