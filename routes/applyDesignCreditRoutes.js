const express=require('express');
const { addApplicationDesignCredit, getAllApplication, getSpecificApplication, getAllApplicationofUser, getAllApplicationsDesignCredit, getLink } = require('../controllers/applydesignCreditsController');
const upload=require('../middlewares/multer.middleware');

const router=express.Router();
router.post('/apply-design-credit',addApplicationDesignCredit);
router.get('/get-all-applications',getAllApplication);
router.get('/get-application',getSpecificApplication);
router.get('/get-application-user',getAllApplicationofUser);
router.get('/get-application-design-credit',getAllApplicationsDesignCredit);
module.exports=router;