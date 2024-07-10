# Fetching GitHub Commits

This document provides a detailed process for fetching GitHub commits using a helper function written in JavaScript.

## Prerequisites

- Node.js installed on your machine.
- A GitHub personal access token with the necessary permissions.
- The `axios` and `moment` libraries installed.

## Step-by-Step Process

### 1. Import Required Libraries

First, import the necessary libraries: `axios` for making HTTP requests and `moment` for formatting dates.

```javascript
import axios from "axios";
import moment from "moment";
```


### 2. Fetch the GitHub token from environment variables.

Rename `.env.sample` to `.env` and provide GitHub personal access token.

```javascript
const { GITHUB_TOKEN } = process.env;
```

### 3. Call the Helper Function with the desired username and repository.

```javascript
fetchCommits("your-username", "your-repository-name", "results-per-page"(OPTIONAL));
```
### 4. Get reponse for latest commits in descending order

```javascript
[
  {
    Commit: '7c22ce7',
    Message: 'node_modules added to gitignore',
    Date: '10-07-2024 15:08:21 PM',
    URL: 'https://github.com/nilanjanhaldar24/sample-repo/commit/7c22ce70f0ebab7624e0c547d27137c651397f98',
    Author: 'Nilanjan Haldar',
    Username: 'nilanjanhaldar24'
  },
  {
    Commit: '9cb54bd',
    Message: 'first commit',
    Date: '10-07-2024 15:00:22 PM',
    URL: 'https://github.com/nilanjanhaldar24/sample-repo/commit/9cb54bdac63a33da3c1c4e90e156da298819634f',
    Author: 'Nilanjan Haldar',
    Username: 'nilanjanhaldar24'
  }
]
```


