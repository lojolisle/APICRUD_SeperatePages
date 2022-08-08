$(document).ready(function() {

    const getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    };

    const userId = getUrlParameter('userId');


    //  get one user by Id
    const getUser = async(id) => {
        const response = await fetch("http://localhost:23826/api/User/GetUser/" + id);
        const user = await response.json();
        console.log('chk user --', user)
        if (user) {
            document.getElementById("edit-id").value = user.id;
            document.getElementById("edit-name").value = user.userName;
            document.getElementById("edit-city").value = user.city;
            document.getElementById("edit-phone").value = user.phonenumber;
        }
    }

    // Edit form
    const editForm = document.getElementById('editForm');

    // API call  Update User
    const updateUserApiCall = async(item) => {
        console.log('item for update ', item)
        const response = await fetch('http://localhost:23826/api/User/UpdateUser', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });
        const result = await response.json();
        console.log(result);
        if (result.length >= 1) {
            const alertDiv = document.querySelector(".alert")
            // success class
            alertDiv.classList.add('alert-success');
            alertDiv.innerHTML = "User " + item.userName + " has been updated successfully!"
        }
    }

    editForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const itemId = document.getElementById("edit-id").value.trim();
        const item = {
        id: parseInt(itemId, 10),
        userName: document.getElementById("edit-name").value.trim(),
        phonenumber: document.getElementById("edit-phone").value.trim(),
        city: document.getElementById("edit-city").value.trim(),
        };
        updateUserApiCall(item);
    
    });

    // Back button event
    const cancelButton = document.querySelector('input[type=button]');
    cancelButton.addEventListener('click', function(e) {
        location.href = "index.html"
    });

    getUser(userId);
});