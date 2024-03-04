const express=require('express');
const { addDesignCredit, getAllDesignCredits, removeDesignCredit, filterDesignCredit } = require('../controllers/designCreditController');

const router=express.Router();

router.post('/add-design-credit',addDesignCredit);
router.get('/all-design-credits',getAllDesignCredits);
router.post('/remove-design-credit',removeDesignCredit);
router.post('/filter-design-credit',filterDesignCredit);
module.exports=router;