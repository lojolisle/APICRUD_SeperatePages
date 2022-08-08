$(document).ready(function(){

    /* API call Get all Users */
    const getAllUsers = async() => {
        const response = await fetch("http://localhost:23826/api/User/GetUsers");
        const usersJson = await response.json();
        if (usersJson) {
            console.log(usersJson)
            _displayItems(usersJson);
        }   
    }

    // delete user 
    const deleteUser = async(id) => {
        console.log('delete user id ', id);
        const response = await fetch("http://localhost:23826/api/User/DeleteUser/" + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        const user = await response.json();
        if (user) {
            getAllUsers();
        }
    }

    // on load call getAllUsers()
    getAllUsers();

    // Delete Form
    const deleteForm = document.getElementById('deleteForm');
    deleteForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const itemId = document.getElementById("delete-id").value.trim(); 
        deleteUser(itemId);
    });

    function displayDeleteForm(id) {
        const item = users.find(item => item.id === id);
        document.getElementById("delete-id").value = item.id;
    }
      
      
    function _displayCount(itemCount) {
        const name = itemCount === 1 ? "entry" : "entries";
        document.getElementById(
        "counter"
        ).innerHTML = `Showing <b>${itemCount}</b> ${name}`;
    }

    function _displayItems(data) {
        const tBody = document.getElementById("users");
        tBody.innerHTML = "";
        _displayCount(data.length);
        const button = document.createElement("button");

        data.forEach(item => {
            console.log(item)
            let editButton = document.createElement("a");
            editButton.href = "user.html?userId=" + item.id
            editButton.className = "edit";
            // editButton.addEventListener("click", function(){
            //     displayEditForm(item.id)
            // });

            editButton.innerHTML = "<i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i>";

            let deleteButton = document.createElement("a");
            deleteButton.href = "#deleteUserModal";
            deleteButton.className = "delete";
            deleteButton.addEventListener("click", function() {
                displayDeleteForm(item.id)
            });
            deleteButton.setAttribute("data-toggle", "modal");
            deleteButton.innerHTML = "<i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i>";

            let tr = tBody.insertRow();

            let td1 = tr.insertCell(0);
            let textTitle = document.createTextNode(item.userName);

            td1.appendChild(textTitle);

            let td2 = tr.insertCell(1);
            let textCity = document.createTextNode(item.city);
            td2.appendChild(textCity);

            let td3 = tr.insertCell(2);
            let textPhone = document.createTextNode(item.phonenumber);
            td3.appendChild(textPhone);

            let td4 = tr.insertCell(3);
            td4.appendChild(editButton);
            td4.appendChild(deleteButton);
        });

        users = data;
    }
    

    // force the modal window to close on submit
    $("#deleteUserModal").submit(function() {
        $("#deleteUserModal").modal("hide");
    });

});
