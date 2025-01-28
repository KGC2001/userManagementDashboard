
        document.addEventListener("DOMContentLoaded", () => {
            const userTableBody = document.getElementById("userTableBody");
            const userForm = document.getElementById("userForm");
            const formTitle = document.getElementById("formTitle");

            const firstName = document.getElementById("firstName");
            const lastName = document.getElementById("lastName");
            const email = document.getElementById("email");
            const department = document.getElementById("department");
            const userId = document.getElementById("userId");

            let users = JSON.parse(localStorage.getItem("users")) || [];

            const saveToLocalStorage = () => {
                localStorage.setItem("users", JSON.stringify(users));
            };

            const renderUsers = () => {
                userTableBody.innerHTML = users
                    .map(
                        (user) => `
                    <tr id="user-${user.id}">
                        <td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.email}</td>
                        <td>${user.department}</td>
                        <td>
                            <button onclick="editUser(${user.id})">Edit</button>
                            <button onclick="deleteUser(${user.id})">Delete</button>
                        </td>
                    </tr>
                `
                    )
                    .join("");
            };

            const saveUser = (event) => {
                event.preventDefault();

                // Validate email
                if (!email.value.includes("@") || !email.value.includes(".")) {
                    alert("Please enter a valid email address.");
                    return;
                }

                const id = userId.value;
                const user = {
                    id: id ? parseInt(id) : users.length > 0 ? users[users.length - 1].id + 1 : 1,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    department: department.value,
                };

                if (id) {
                    const index = users.findIndex((u) => u.id == id);
                    users[index] = user;
                } else {
                    users.push(user);
                }

                saveToLocalStorage();
                renderUsers();
                userForm.reset();
                formTitle.textContent = "Add User";
            };

            window.editUser = (id) => {
                formTitle.textContent = "Edit User";
                const user = users.find((u) => u.id == id);
                userId.value = user.id;
                firstName.value = user.firstName;
                lastName.value = user.lastName;
                email.value = user.email;
                department.value = user.department;
            };

            window.deleteUser = (id) => {
                users = users.filter((user) => user.id != id);
                users = users.map((user, index) => ({ ...user, id: index + 1 }));
                saveToLocalStorage();
                renderUsers();
            };

            userForm.addEventListener("submit", saveUser);

            renderUsers();
        });