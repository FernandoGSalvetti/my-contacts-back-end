const ContactRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;
    const contacts = await ContactRepository.findAll(orderBy);
    response.status(200).json(contacts);
  }

  async show(request, response) {
    // Mostrar um registro
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);
    if (!contact) {
      return response.status(404).json({ error: 'User Not Found' });
    }
    return response.status(200).json(contact);
  }

  async store(request, response) {
    // Criar um registro
    const {
      name, email, phone, category_id,
    } = request.body;
    if (!name) {
      return response.json({ error: 'Name is required' });
    }
    const contactExists = await ContactRepository.findByEmail(email);
    if (!contactExists) {
      const contact = await ContactRepository.create(
        name,
        email,
        phone,
        category_id,
      );
      return response.json(contact);
    }
    return response.status(400).json({ error: 'This e-mail already in use' });
  }

  async update(request, response) {
    // Editar um registro
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;
    const contactExists = await ContactRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'Contact Not Found' });
    }
    if (!name) {
      return response.status(404).json({ error: 'Name is required' });
    }
    const contactByEmail = await ContactRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail already in use' });
    }
    const updatedContact = await ContactRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });
    return response.status(201).json(updatedContact);
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;

    await ContactRepository.delete(id);
    return response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
