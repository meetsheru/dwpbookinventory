## Books Inventory App – Playwright Test Suite
This project contains automated end-to-end tests for the Books Inventory Application using Playwright. It validates core functionality such as authentication, form validation, and CRUD operations on books.

## Features Covered:

Authentication

Valid login and invalid login scenarios

Validation for missing credentials

Books List Page

Welcome message and logout button

Navigation after login and logout

Book Management

Add, edit, and delete book entries

Validation for empty fields and character limits

## Project Striucture:

tests/
├── auth/
│   └── login.spec.js        
├── books/
│   └── addbook.spec.js
│   └── editdeletebook.spec.js
pages/
├── LoginPage.js              
├── AddBookPage.js             
└── EditBookPage.js           
└── BooksPage.js

playwright.config.js          

## Install

npm install

Run Tests:

npx playwright test

View HTML Report:

npx playwright show-report

