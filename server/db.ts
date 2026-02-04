import fs from 'node:fs'
import path from 'node:path'
import Database from 'better-sqlite3'

const dataDir = path.join(process.cwd(), 'data')
fs.mkdirSync(dataDir, { recursive: true })

const dbPath = path.join(dataDir, 'todos.sqlite')
export const db = new Database(dbPath)

db.pragma('journal_mode = WAL')

db.exec(`
    CREATE TABLE IF NOT EXISTS states (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        state_id INTEGER NOT NULL DEFAULT 1 CONSTRAINT todos_states_id_f REFERENCES states,
        due_date DATE NULL DEFAULT (datetime('now'))
    );

    INSERT INTO states (id, title)
    SELECT v.id, v.title
    FROM (
             SELECT 1 AS id, 'New' AS title
             UNION ALL SELECT 2, 'In Progress'
             UNION ALL SELECT 3, 'Pending'
             UNION ALL SELECT 4, 'Done'
             UNION ALL SELECT 5, 'Deleted'
         ) AS v
    WHERE NOT EXISTS (SELECT 1 FROM states);
`)

export type Todo = {
    id: number | null
    title: string,
    state_id: number,
    due_date: string
}

export type State = {
    id: number,
    title: string
}