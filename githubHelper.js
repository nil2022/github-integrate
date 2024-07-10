import axios from "axios";
import moment from "moment";

const { GITHUB_TOKEN } = process.env;

/**
 ** Fetches the latest commits from a GitHub repository.
 *
 * @param {string} username - The username of the repository owner.
 * @param {string} repository - The name of the repository.
 * @param {number} [pageSize=2] - The maximum number of commits to fetch per page(OPTIONAL, Default=2) in descending order.
 */
async function fetchCommits(username, repository, pageSize = 2) {
    try {
        // check for github token
        if (!GITHUB_TOKEN || GITHUB_TOKEN === "") throw new Error("Github Token is not provided");
        // check for username and repository
        else if ((username || repository) === undefined) throw new Error("Provide both Username and Repository");

        // Fetch the commits from the GitHub API
        const response = await axios.get(`https://api.github.com/repos/${username}/${repository}/commits`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });

        // Limit the number of commits to fetch per page
        response.data.length > pageSize ? (response.data.length = pageSize) : null;

        // Filter out commits made by other users, keeping only the commits made by the specified user
        const commits = response.data.filter((commit) => commit.committer?.login === username || commit.author?.login === username || commit?.url);

        if (commits.length === 0) {
            return console.log(`\nNo commits found for [${username}/${repository}]`);
        }

        // Format the fetched commits and returns result
        const commitsData = commits.map((commit) => {
            return {
                Commit: commit.sha.substring(0, 7), // Commit hash
                Message: commit.commit.message, // Commit message
                Date: moment(commit.commit.author.date).format("DD-MM-YYYY HH:mm:ss A"), // Commit date and time
                URL: commit.html_url, // Commit URL
                Author: commit.commit.author?.name || "-", // Commit author GitHub username
                Username: commit.author?.login || commit.committer?.login || (commit?.html_url).substring(19).split("/")[0], // Commit author name
            };
        });

        // Print the fetched commits to the console
        console.log(commitsData);
    } catch (error) {
        if (error.response?.status === 404 || error.response?.statusText === "Not Found") {
            return console.log(`\nNo commits found for [${username}/${repository}]`);
        }
        console.error("Error fetching commits:", error.name + ": " + error.message + "\n" + error.stack);
        // process.exit(1);
    }
}

fetchCommits("nilanjanhaldar24", "sample-repo");
