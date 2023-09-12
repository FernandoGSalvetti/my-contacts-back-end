const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(orderBy);
    response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;
    const category = await CategoriesRepository.findById(id);
    response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;
    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }
    const categoryExists = await CategoriesRepository.findByName(name);
    if (!categoryExists) {
      const category = await CategoriesRepository.create({ name });
      response.json(category);
    }
    return response.status(400).json({ error: 'This name already in use' });
  }

  async update(request, response) {
    const { name } = request.body;
    const { id } = request.params;
    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }
    const categoryByName = await CategoriesRepository.findByName(name);
    if (categoryByName && categoryByName.id !== id) {
      return response.status(400).json({ error: 'This name already in use' });
    }
    const updatedCategory = await CategoriesRepository.update(id, { name });
    return response.json(updatedCategory);
  }

  async delete(request, response) {
    const { id } = request.params;
    await CategoriesRepository.delete(id);
    return response.sendStatus(204);
  }
}

module.exports = new CategoryController();
