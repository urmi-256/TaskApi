const todoSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      description: { type: 'string' },
      completed: { type: 'boolean' },
      createdAt: { type: 'string' },
      updatedAt: { type: 'string' }
    }
  };
  
  module.exports = { todoSchema };
  