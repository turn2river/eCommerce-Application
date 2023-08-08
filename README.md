# Perfume Shop E-commerce Project

Hi there guys!👋

We are a young team of JS developers 👨‍💻, students of RS-School.
This is our study task - an e-commerce project for a perfume shop 🛍️.

This project is intended for non-commercial use. Our only profit is knowledge and improving our technological skills.🚸.

If you have any questions, please do not hesitate to contact us at
[![Static Badge](https://img.shields.io/badge/contact_us-blue?style=plastic)](fake@example.com).

The project is built using:

[![Static Badge](https://img.shields.io/badge/React-v.18.2.0-blue?style=plastic&logo=react&logoColor=white)](https://www.npmjs.com/package/react)
[![Static Badge](https://img.shields.io/badge/Vite-v.4.4.5-orange?style=plastic&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Static Badge](https://img.shields.io/badge/TypeScript-v.5.0.2-blue?style=plastic&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Static Badge](https://img.shields.io/badge/ESLint-v.8.45.0-orange?style=plastic&logo=eslint&logoColor=white)](https://www.npmjs.com/package/eslint)
[![Static Badge](https://img.shields.io/badge/Jest-v.29.6.2-blue?style=plastic&logo=jest&logoColor=white)](https://www.npmjs.com/package/jest)
[![Static Badge](https://img.shields.io/badge/StyleLint-v.15.10.2-orange?style=plastic&logo=stylelint&logoColor=white)](https://www.npmjs.com/package/stylelint)
[![Static Badge](https://img.shields.io/badge/Husky-v.8.0.3-blue?style=plastic&logo=husky&logoColor=white)](https://www.npmjs.com/package/husky)
[![Static Badge](https://img.shields.io/badge/Sass-preprocessor-orange?style=plastic&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Static Badge](https://img.shields.io/badge/RTK-v.8.1.2-blue?style=plastic&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Static Badge](https://img.shields.io/badge/React_Router-v.6.14.2-orange?style=plastic&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Static Badge](https://img.shields.io/badge/Commitezen-v.4.3.0-blue?style=plastic)](https://www.npmjs.com/package/commitizen)

## Table of Contents

1. 🖥️ [Installation](#installation)
2. 🤖 [Scripts](#scripts)
3. 🐶 [About Husky](#about-husky)
4. ⚙️ [Testing](#testing)
5. ✍️ [Contributing](#contributing)

## Installation

Before you start, ensure you have [Node.js](https://nodejs.org/en/download/) installed.

1. **Clone** the repository [link](https://github.com/turn2river/eCommerce-Application.git).

   To clone the repository you can use the following command

   ```shell
   git clone https://github.com/turn2river/eCommerce-Application.git
   ```

   or the interface of your IDE.

2. **Install** dependencies

   Go to the development branch

   ```shell
   git checkout development
   npm run install
   ```

## Scripts

After cloning the repository and installing the dependencies you can run scripts.

1.  **Run development server**

    To launch the development server you should open your terminal and write the following command

    ```shell
    npm run dev
    ```

    The application will start on the indicated address. Copy it and paste it into the address bar of your browser.

2.  **To build project**

    To build the project you need to run the following command

    ```shell
    npm run build
    ```

    After executing this command your dist folder will be created in your local repository and you will be able to deploy your bundled project

3.  **To preview builded project**

    To preview the builded project you need to run the following command

    ```shell
    npm run preview
    ```

    The bundle will start on the indicated address. Copy it and paste it into the address bar of your browser.

4.  **Run EsLint to find and fix mistakes in code**

    If you want to check for errors in the executable file, you can run the following command

    ```shell
    npm run lint
    ```

    After executing this command you will see all the errors in the code of all the files with .ts and .tsx extensions

    If errors are detected, some of them can be fixed automatically by running the following command

    ```shell
    npm run lint:fix
    ```

5.  **Run Prettier to format code**

    If you want to format the code according to Prettier rules, you can run the following command

    ```shell
    npm run prettier
    ```

    It will format the code in all the files.

6.  **Run StyleLint to find and fix mistakes in style files with .scss extension**

    If you want to check for errors in the .scss files, you can run the following command

    ```shell
    npm run stylelint
    ```

    After executing this command you will see all the errors in the code of all the files with .scss extension

    If errors are detected, some of them can be fixed automatically by running the following command

    ```shell
    npm run stylelint:fix
    ```

## About Husky

In our project we use Husky and pre-commit hook. It means that when you try to commit changes the following scripts will be executed automatically:

```shell
npm run lint:fix
npm run prettier
npm run stylelint:fix
```

and if any mistakes are detected after executing these scripts, you'll have to fix them manually before you can commit.

## Testing

This project uses Jest for testing

You can run current tests or create custom tests and execute it by running the following command

```shell
npm run test
```

## Contributing

Contributions are welcome. Please make sure to update tests as appropriate.
