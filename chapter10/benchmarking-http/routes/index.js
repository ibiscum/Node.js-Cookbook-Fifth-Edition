import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(res) {
  res.render('index', { title: 'Express' });
});

export default router;
