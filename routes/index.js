var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');



/* GET home page. */
router.get('/', checkAuthenticated, function(req, res, next) {
  res.render('index', { name: req.user.name });
});

router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login');
})

router.post('/login', checkNotAuthenticated,  passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/register', checkNotAuthenticated, function(req, res, next) {
  res.render('register', { name: 'Neil' });
});

router.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    users.push({
      id: Date.now(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    res.redirect('/login')
  } catch {
    res.redirect('/register');
  }
  console.log(users);
})

router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
})

function checkAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } 
  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return res.redirect('/');
  } 
  next();
}

module.exports = router;
