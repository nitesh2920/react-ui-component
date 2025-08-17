# React-ui-comonent

## 🧠 Approach

I focused on building clean, reusable React components with TypeScript to ensure type safety and better developer experience. TailwindCSS was used for easy, consistent styling with support for dark mode. Accessibility was a priority, so I added proper labels, ARIA attributes, and keyboard-friendly interactions.

The components are flexible, supporting different variants and states to cover common use cases. 
<div align="left">


<br clear="left"/>

##  Project Structure

```sh
└── react-ui-component/
    │   ├── components
    │   │   ├── DataTable
    │   │   │   ├── DataTable.stories.tsx     # Storybook file to showcase DataTable
    │   │   │   ├── DataTable.test.tsx        # test file using jest
    │   │   │   └── DataTable.tsx             # DataTable component code
    │   │   └── InputField
    │   │       ├── InputField.stories.tsx    # storybook for inputField
    │   │       ├── InputField.test.tsx       # test file using jest
    │   │       ├── InputField.tsx            # inputField componene code
    │   │       └── InputField.types.ts
    │   ├── index.css
    │   ├── main.tsx
    │   ├── setupTest.ts
    │   └── vite-env.d.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    └── vitest.shims.d.ts
```
###  Installation

1. Clone the react-ui-component repository:
```sh
❯ git clone https://github.com/nitesh2920/react-ui-component
```

2. Navigate to the project directory:
```sh
❯ cd react-ui-component
```

3. Install the project dependencies:


**Using `npm`** &nbsp; 

```sh
❯ npm install
```




###  run local dev.
Run react-ui-component using the following command:
**Using `npm`** &nbsp;

```sh
❯ npm run dev
```


###  Testing
Run the test suite using the following command:
**Using `npm`** &nbsp; 

```sh
❯ npm test
```

###  run storybook 
Run the test suite using the following command:
**Using `npm`** &nbsp;

```sh
❯ npm run storybook
```


---
