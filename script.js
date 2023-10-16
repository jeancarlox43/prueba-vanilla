let sortOrder = 1;
let users = [];
const myUrl = "https://jsonplaceholder.typicode.com/users";

//complete the fetchData function
async function fetchData(myUrl) {
    // Make a fetch request to the given URL.
    const response = await fetch(myUrl);
  
    // Check if the response is successful.
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${myUrl}: ${response.status}`);
    }
  
    // Parse the response as JSON.
    const data = await response.json();
  
    // Return the data.
    return data;
  }
  

//complete the sortUsers function
// users is the array of users and order can be 1 or -1, which means order ascending or descending respectively
function sortUsers(users, order) {
    // Sort the users array by name.
    users.sort((a, b) => {
      if (a.name < b.name) {
        return order;
      } else if (a.name > b.name) {
        return -1 * order;
      } else {
        return 0;
      }
    });
  
    // Return the sorted users array.
    return users;
}
  

//Implement a function that select users with the name input
function filterUsersByName(users, name) {
    // Filter the users array to only include users whose name contains the given name.
    const filteredUsers = users.filter((user) => {
      return user.name.includes(name);
    });
  
    // Return the filtered users array.
    return filteredUsers;
  }
  

function displayData(tbody, users) {
  tbody.innerHTML = users
    .map(
      (user) => `
    <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
    </tr>
  `
    )
    .join("");
}

async function initializeApp() {
  const tbody = document.getElementById("table-body");
  const sortBtn = document.getElementById("sort");
  const nameFilter = document.getElementById("nameFilter");

  users = await fetchData(myUrl);
  displayData(tbody, users);

  // when a visitor click the sortBtn element, the users should be ordered ascending in the first click, and descending in the second click
  sortBtn.addEventListener("click", () => {
    // Reverse the sort order.
    sortOrder = -sortOrder;

     // Sort the users array.
    users = sortUsers(users, sortOrder);

    // Display the sorted users.
    displayData(tbody, users);
  });

  // when a visitor fill the name in the nameFilter element, the table should only show users asociated to this name
  nameFilter.addEventListener("input", () => {
   // Get the name entered in the nameFilter element.
  const name = nameFilter.value;

  // Filter the users array by name.
  const filteredUsers = filterUsersByName(users, name);

  // Display the filtered users.
  displayData(tbody, filteredUsers);
  });
}

if (typeof document !== "undefined") {
  initializeApp();
}

module.exports = { fetchData, sortUsers, filterUsersByName, displayData };
initializeApp();
