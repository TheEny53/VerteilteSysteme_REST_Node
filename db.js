const db = [];

const insertTodo = (name, description) => {
    return db.push({ name, description, id: db.length });
};

const getAllTodos = () => {
    return db.map(it => ({ ...it }));
}

const getTodoById = (id) => {
    return db.find(it => it.id === +id);
}

const deleteTodoById = (id) => {
    const index = db.findIndex(it => it.id === +id);
    if(index === -1)
        throw new Error(`Cannot delete Todo ${id} because it does not exist`);
    
    return db.splice(index, 1)[0];
}

module.exports = {
    insertTodo,
    getTodoById,
    getAllTodos,
    deleteTodoById
}
