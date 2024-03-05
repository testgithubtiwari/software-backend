const express=require('express');
const { addApplicationDesignCredit, getAllApplication, getSpecificApplication, getAllApplicationofUser } = require('../controllers/applydesignCreditsController');


const router=express.Router();
router.post('/apply-design-credit',addApplicationDesignCredit);
router.get('/get-all-applications',getAllApplication);
router.get('/get-application',getSpecificApplication);
router.get('/get-application-user',getAllApplicationofUser);

module.exports=router;