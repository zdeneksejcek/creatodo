# CreaTODO - React + TypeScript + Vite

## Software Requirements:
* NodeJS 25+, npm 11+
* yarn (`npm install --global yarn`)

## Good to know
* Application contains empty FE with minimum code just to get started in the src directory.
* The server directory contains all BE code and functionality necessary to run CreaTODO application.
* BE should be started (`yarn run dev:api`) in a terminal and can be running all the time. Please see server/requests.http for API details.
* FE should communicate with BE via REST API. For convenience, please use an already pre-configured proxy (/api is forwarded automatically to server)

## Front End Requirements
- [ ] Visuals are up to you, make it simple and clean.
- [ ] Use React + TypeScript + Vite for FE (as idicated in the project)
- [ ] Pick your favorite date picker library

- [ ] Create a todo
- [ ] Set a todo's state from given options: new (default), in progress, pending, done, deleted
- [ ] Todos have four properties: id (assigned by DB), title, state_id and due_date (Date)
- [ ] Todos should be sortable on FE by state and due date. We don't expect too many tasks.
- [ ] Done todos should be crossed out.
- [ ] Todos are never deleted from BE or FE, only marked as deleted and hidden from the user. There should be a checkbox on the screen showing all todos including deleted once.
- [ ] Deleted todos should be shown in gray color if visible (checkbox is checked)
- [ ] Todos should be persisted in BE and all loaded on FE on application start.