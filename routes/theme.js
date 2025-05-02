const router = require('express').Router();

const themeRoute = require('../controllers/theme.js');


router.get('/theme', themeRoute.getThemes);

router.get('/theme/:id',themeRoute.getThemeById);

router.post('/theme', themeRoute.createTheme);

router.put('/theme/:id', themeRoute.updateTheme);

router.delete('/theme/:id', themeRoute.deleteTheme);

module.exports = router;