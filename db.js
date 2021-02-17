const Database = require('better-sqlite3');
const db = new Database('mydb.db', { verbose: console.log });

db.prepare('create table if not exists todos ( id integer primary key autoincrement, name text not null, description text not null );').run()

const insertTodo = (name, description) => {
    return db.prepare('insert into todos (name, description) values (?, ?)').run(name, description);
}

const getAllTodos = () => {
    return db.prepare('select * from todos').all();
}

const getTodoById = (id) => {
    return db.prepare('select * from todos where id = ?').get(id);
}

const deleteTodoById = (id) => {
    return db.prepare('delete from todos where id = ?').run(id);
}

module.exports = {
    insertTodo,
    getTodoById,
    getAllTodos,
    deleteTodoById
}
