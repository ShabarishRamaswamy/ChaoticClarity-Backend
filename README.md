# About
This is the Backend NodeJS server for the ChaoticClarity application.

ChaoticClarity is a Document DeMystification application which takes in documents, summarizes them, extracts NER information, extracts important information, creates word cloud for that information and finally outputs useful links for further reading.


# File Structure
```
├── app  // Entry Point
├── outputs // Final Output
├── db // Connect with MongoDB atlas
├── middlwares // Folder with express middlewares 
├── models  // Database Models
├── pdfs // User's input PDF
├── public // Frontend Handlebars code
├── routes // All the routes
├── routes // Set of Utilities functions for File Uploading etc.
├── .env.example // Copy this, add required parameters and remove the .example extension.
├── package.json
├── package-lock.json 
└── .gitignore
```

# App Stack
This is the Backend Application Stack only.

1. NodeJS.
1. ExpressJS.
1. HandleBars.
1. MongoDB
1. Mongoose ORM.
1. Multer (File Uploads).

# Misc
Feel free to execute the code and add issue if you face any problems.
**Note:** This has to be run along with the ML application or the Repo named ChaoticClarity.