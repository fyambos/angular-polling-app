# Polling App
A simple polling application where users can create polls, vote on them, and edit or delete polls. This app uses Angular for the front-end and Firebase for data storage.

## ✨ Features
* **Create Polls**: Users can create polls with multiple options.
* **Vote on Polls**: Users can vote on available polls and see the results.
* **Edit Polls**: Poll creators can edit the question or options of an existing poll.
* **Delete Polls**: Poll creators can delete their polls.
* **Filter Polls**: Users can filter available polls by category.

## 🛠 Technologies Used
**Angular**: Frontend framework for building the application.
**Firebase**: Cloud database for storing poll data.
**Material Design**: UI components for a modern and clean design.
**TailwindCSS**: Utility-first CSS framework for styling.
## 🚀 Getting Started
### Prerequisites
Make sure you have the following installed on your machine:

* Node.js (LTS version)
* Angular CLI globally installed: npm install -g @angular/cli
* Firebase account
### Setup Instructions
1. Clone the repository:

```bash
git clone https://github.com/fyambos/angular-polling-app.git
cd polling-app
```
2. Install dependencies:

```bash
npm install
```
3. Set up Firebase:

    * Create a Firebase project in the Firebase console.
    * Get your Firebase project configuration from the console.
    * Create a file src/environments/env.dev.ts and add your Firebase configuration:
```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
  },
};
```
4. Start the app:

```bash
ng serve
```
The app should now be running at http://localhost:4200.

## 📋 Features Walkthrough
1. Creating a Poll
    * Click on "Create Poll" to open the poll creation dialog.
    * Add a question and at least two options for the poll.
    * Once the poll is created, it will be added to the list of available polls.
2. Voting on a Poll
    * When viewing a poll, select an option to vote for it.
    * After voting, you will see the total number of votes and the percentage for each option.
3. Editing a Poll
    * Only the poll creator can edit a poll.
    * Click the "Edit" button to modify the question or options.
    * You can update the options and save the changes.
4. Deleting a Poll
    * Poll creators can delete their polls by clicking the "Delete" button.
5. Filtering Polls by Category
    * Use the filter dropdown to view polls by category.

## 🤝 Contributing
* Fork the repository.
* Create your feature branch (git checkout -b feature/your-feature).
* Commit your changes (git commit -am 'Add some feature').
* Push to the branch (git push origin feature/your-feature).
* Create a new Pull Request.

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
