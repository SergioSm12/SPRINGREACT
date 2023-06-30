/*
httpClient
  .then((response) => response.json())
  .then((data) => console.log(data));
*/

const findAllUsers = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1/todos"
  );
  const users = await response.json();
  const ul = document.createElement("ul");
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.title;
    ul.append(li);
    console.log(user.title);
  });
  document.getElementById('root').append(ul);
};

findAllUsers();
//console.log(users);
console.log("Hola que tal");
