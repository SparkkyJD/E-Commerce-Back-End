const router = require('express').Router();
const { Category, Product } = require('../../models');
// get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }]
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get one category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});
// create category
router.post('/', async (req, res) => {
  try {
    const addCategory = await Category.create(req.body);
    res.status(201).json(addCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update category
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    if (!category[0]) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;