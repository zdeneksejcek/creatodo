import express from 'express'
import cors from 'cors'
import { db, type Todo} from './db'
import {requireBasicAuth} from "./auth.ts";

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', requireBasicAuth)

app.get('/api/todos', (_req, res) => {
    const rows = db.prepare(`SELECT id, title, state_id, due_date FROM todos ORDER BY id DESC`).all() as Todo[]
    res.json(rows)
})

app.post('/api/todos', (req, res) => {
    const title = typeof req.body?.title === 'string' ? req.body.title.trim() : ''
    if (!title) {
        res.status(400).json({ error: 'title is required' })
        return
    }

    const dueDate = typeof req.body?.dueDate === 'string' ? req.body.dueDate.trim() : '';

    const info = db
        .prepare(`INSERT INTO todos (title, due_date) VALUES (?, ?)`)
        .run(title, dueDate);

    const row = db
        .prepare(`SELECT * FROM todos WHERE id = ?`)
        .get(info.lastInsertRowid) as Todo;

    res.status(201).json(row)
})

app.put('/api/todos/:id', (req, res) => {
    const id = Number(req.params.id)

    const todo = {
        id,
        title: req.body.title as string,
        dueDate: req.body.dueDate as string,
        stateId: req.body.stateId as number,
    };

    const update = db.prepare(`
        UPDATE todos SET title = ?, due_date = ?, state_id = ? WHERE id = ?
    `)

    const info = update.run(todo.title, todo.dueDate, todo.stateId, id);

    if (info.changes === 0) {
        res.status(404).json({ error: 'todo not found' })
        return
    }

    const row = db.prepare(`SELECT id, title, state_id, due_date FROM todos WHERE id = ?`).get(id) as Todo
    res.json(row)
})

app.get('/api/states', (_req, res) => {
    const rows = db.prepare(`SELECT id, title FROM states ORDER BY id`).all() as Todo[]
    res.json(rows)
})

const port = Number(process.env.PORT ?? 8787)
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${port}`)
})