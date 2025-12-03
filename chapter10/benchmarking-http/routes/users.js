import { Router } from 'express';
var router = Router();

/* GET users listing. */
router.get('/', function(res) {
  res.send('respond with a resource');
});

export default router;
