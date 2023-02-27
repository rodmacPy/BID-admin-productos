const { Router } = require('express');
const { check } = require('express-validator');
const {
    productosGet,
    productosPost,
    productosPut,
    productosPatch,
    productosDelete,
    productosOneGet
} = require('../controllers/productos');

const router = Router();

router.get('/', productosGet);

router.post('/',
    check('title', 'El nombre es obligatorio').notEmpty(),
    check('description', 'La descripcion es obligatorio').notEmpty(),
    check('description', 'El mimino es de 6 letras').isLength({ min: 6 }),
    check('price', 'El correo no es válido').isNumeric(),
    productosPost
);
router.get('/:id', productosOneGet);

router.put('/:id', productosPut);

router.patch('/', productosPatch);

router.delete('/:id', productosDelete);

module.exports = router;