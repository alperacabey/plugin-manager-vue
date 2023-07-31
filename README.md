### 3rd party libraries
- **vue-router** (router)
- **vue/test-utils** (unit testing utility library)
- **jest** (testing framework)
- **axios** (http client)
- **express** (http server)
- **cors** (cross-origin resource sharing)

---
### Styles
Styles were written in accordance with [BEM](https://getbem.com/) methodology.

---
### Folder structure

    ├── public                  # Shared files
    ├── src                     # Source files
    │   ├── asseets             # Style files
    |   |   ├── **/*.scss
    │   ├── components          # Reusable components
    |   |   ├── **/*.vue
    │   ├── composables         # Encapsulated and reused stateful logics
    |   |   ├── **/*.ts
    │   ├── router              # Routes
    │   ├── services            # Socket and api gateways
    │   ├── views               # Pages
    ├── tests
    │   ├── **/*.spec.ts        # Unit tests

### Requirements

- [Node.js](https://nodejs.org/) v16 or newer.

### Installation

- Clone the repo - `git clone https://github.com/alperacabey/plugin-manager-vue.git`.
- Install project dependencies — `npm install` or `yarn`.
- Launch the app — `npm run dev` or `yarn dev`

   **Client** will become available at [http://localhost:3000](http://localhost:3000/)

   **Server** will become available at [http://localhost:3001](http://localhost:3001/)

### Available Scripts

- `dev`
- `build`
- `test`