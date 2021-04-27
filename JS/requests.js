function signUp() {
    const user_name = document.getElementById('idUserName').value;
    const firstName = document.getElementById('idFirstName').value;
    const lastName = document.getElementById('idLastName').value;
    const email = document.getElementById('idEmail').value;
    const password = document.getElementById('idPassword').value;
    const confirmPassword = document.getElementById('idPassword2').value;
    let user = {
        user_name: user_name,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        confirm_password: confirmPassword
    };
    console.log(user)
    let jsonhttp = new XMLHttpRequest();
    const url = "http://127.0.0.1:5000/register";
    jsonhttp.open("POST", url, true);
    jsonhttp.setRequestHeader("Content-Type", "application/json");
    jsonhttp.onreadystatechange = function() {
        if (jsonhttp.readyState === 4 && JSON.parse(jsonhttp.responseText).status === 200) {
            window.location.href='Login.html';
        }
        if (jsonhttp.readyState === 4 && (JSON.parse(jsonhttp.responseText).status !== 200 || jsonhttp.status !== 200)){
            alert("Something went wrong");
            window.location.reload();
        }
    };
    let data = JSON.stringify(user);
    jsonhttp.send(data);
}

function login() {
    const email = document.getElementById('idEmail').value;
    const password = document.getElementById('idPassword').value;
    const user = {
        email: email,
        password: password
    };
    let jsonhttp = new XMLHttpRequest();
    const url = "http://127.0.0.1:5000/login";
    jsonhttp.open("POST", url, true);
    jsonhttp.setRequestHeader("Content-Type", "application/json");
    jsonhttp.onreadystatechange = function() {
        if (jsonhttp.readyState === 4 && JSON.parse(jsonhttp.responseText).status === 200) {
            localStorage.setItem('user', JSON.parse(jsonhttp.responseText).token)
            window.location.href='Home_authorized.html';
        }
        if (jsonhttp.readyState === 4 && (JSON.parse(jsonhttp.responseText).status !== 200 || jsonhttp.status !== 200)){
            alert(JSON.parse(jsonhttp.responseText).message);
            window.location.reload();
        }
    };
    let data = JSON.stringify(user);
    jsonhttp.send(data);
}

function editProfile() {
    const user_name = document.getElementById('username').value;
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('password2').value;
    let user = {
        user_name: user_name,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        confirm_password: confirmPassword,
        x_access_token: localStorage.getItem('user')
    };
    let jsonhttp = new XMLHttpRequest();
    const url = "http://127.0.0.1:5000/User/edit";
    jsonhttp.open("POST", url, true);
    jsonhttp.setRequestHeader("Content-Type", "application/json");
    jsonhttp.onreadystatechange = function() {
        if (jsonhttp.readyState === 4 && JSON.parse(jsonhttp.responseText).status === 200) {
            window.location.href='Profile.html';
        }
        if (jsonhttp.readyState === 4 && (JSON.parse(jsonhttp.responseText).status !== 200 || jsonhttp.status !== 200)){
            alert("Something went wrong");
            window.location.reload();
        }
    };
    let data = JSON.stringify(user);
    jsonhttp.send(data);
}

function deleteUser() {
    let user = {
        x_access_token: localStorage.getItem('user')
    };
    console.log(user)
    let jsonhttp = new XMLHttpRequest();
    const url = "http://127.0.0.1:5000/User/delete";
    jsonhttp.open("POST", url, true);
    jsonhttp.setRequestHeader("Content-Type", "application/json");
    jsonhttp.onreadystatechange = function() {
        if (jsonhttp.readyState === 4 && JSON.parse(jsonhttp.responseText).status === 200) {
            localStorage.removeItem('user')
            window.location.href='Register.html';
        }
        if (jsonhttp.readyState === 4 && (JSON.parse(jsonhttp.responseText).status !== 200 || jsonhttp.status !== 200)){
            alert("Something went wrong");
            window.location.reload();
        }
    };
    let data = JSON.stringify(user);
    jsonhttp.send(data);
}

function logout() {
    localStorage.removeItem('user')
    window.location.href='Login.html';
}

function getUser() {
    let user = {
        x_access_token: localStorage.getItem('user')
    };
    console.log(user)
    let jsonhttp = new XMLHttpRequest();
    const url = "http://127.0.0.1:5000/User/get";
    jsonhttp.open("POST", url, true);
    jsonhttp.setRequestHeader("Content-Type", "application/json");
    jsonhttp.onreadystatechange = function() {
        if (jsonhttp.readyState === 4 && JSON.parse(jsonhttp.responseText).status === 200) {
            let info = JSON.parse(jsonhttp.responseText);
            document.getElementById("first_name").innerHTML = info.info[1]
            document.getElementById("last_name").innerHTML = info.info[2]
            document.getElementById("user_name").innerHTML = info.info[0]
            document.getElementById("email").innerHTML = info.info[3]
            document.getElementById("count").innerHTML = info.info[4]
        }
        if (jsonhttp.readyState === 4 && (JSON.parse(jsonhttp.responseText).status !== 200 || jsonhttp.status !== 200)){
            alert("Something went wrong");
            window.location.reload();
        }
    };
    let data = JSON.stringify(user);
    jsonhttp.send(data);
}

function editUserInfo() {
    let user = {
        x_access_token: localStorage.getItem('user')
    };
    console.log(user)
    let jsonhttp = new XMLHttpRequest();
    const url = "http://127.0.0.1:5000/User/get";
    jsonhttp.open("POST", url, true);
    jsonhttp.setRequestHeader("Content-Type", "application/json");
    jsonhttp.onreadystatechange = function() {
        if (jsonhttp.readyState === 4 && JSON.parse(jsonhttp.responseText).status === 200) {
            console.log(JSON.parse(jsonhttp.responseText))
            let info = JSON.parse(jsonhttp.responseText);
            document.getElementById("username").value = info.info[0]
            document.getElementById("first_name").value = info.info[1]
            document.getElementById("last_name").value = info.info[2]
            document.getElementById("email").value = info.info[3]
        }
        if (jsonhttp.readyState === 4 && (JSON.parse(jsonhttp.responseText).status !== 200 || jsonhttp.status !== 200)){
            alert("Something went wrong");
            window.location.reload();
        }
    };
    let data = JSON.stringify(user);
    jsonhttp.send(data);
}

function getAllAnouncements() {
    let user = {
        x_access_token: localStorage.getItem('user')
    };
    console.log(user)
    let jsonhttp = new XMLHttpRequest();
    const url = "http://127.0.0.1:5000/Announcement/local";
    jsonhttp.open("POST", url, true);
    jsonhttp.setRequestHeader("Content-Type", "application/json");
    jsonhttp.onreadystatechange = function() {
        if (jsonhttp.readyState === 4 && JSON.parse(jsonhttp.responseText).status === 200) {
            console.log(JSON.parse(jsonhttp.responseText))
            let info = JSON.parse(jsonhttp.responseText).list_of_local_announcements;
            for(let i = 0; i<info.length; i+=1){
                let li = document.createElement('li');
                li.className = 'advertisement';
                let div1 = document.createElement('div');
                div1.className = 'advertisement-text';
                let title = document.createElement('div')
                title.className = 'title-of-advertisement';
                let text_title = document.createTextNode(info[i][1]);
                title.appendChild(text_title);
                div1.appendChild(title);

                let div_theme = document.createElement('div');
                div_theme.className = 'text_of_advertisement';
                let div_theme_b = document.createElement('b');
                let b_text = document.createTextNode("Theme: ");
                div_theme_b.append(b_text);
                div_theme.appendChild(div_theme_b);
                let theme_text = document.createTextNode(info[i][2]);
                div_theme.appendChild(theme_text);
                div1.appendChild(div_theme);

                let div_type = document.createElement('div');
                div_type.className = 'text_of_advertisement';
                let div_type_b = document.createElement('b');
                b_text = document.createTextNode("Type: ");
                div_type_b.append(b_text);
                div_type.appendChild(div_type_b);
                let type_text = document.createTextNode(info[i][3]);
                div_type.appendChild(type_text);
                div1.appendChild(div_type);

                let div_date = document.createElement('div');
                div_date.className = 'text_of_advertisement';
                let div_date_b = document.createElement('b');
                b_text = document.createTextNode("Date: ");
                div_date_b.append(b_text);
                div_date.appendChild(div_date_b);
                let date_text = document.createTextNode(info[i][7]);
                div_date.appendChild(date_text);
                div1.appendChild(div_date);

                let div2 = document.createElement('div');
                div2.className = 'advertisement-btns';
                li.appendChild(div1);
                li.appendChild(div2);

                let button1 = document.createElement('button');
                button1.className = 'button_adv';
                button1.id = info[i][0];
                let text1 = document.createTextNode('Details');
                button1.appendChild(text1);
                let button2 = document.createElement('button');
                button2.className = 'button_adv';
                let text2 = document.createTextNode('Saved');
                button2.appendChild(text2);
                div2.appendChild(button1);
                div2.appendChild(button2);

                let ul = document.getElementById('list_of_advertisements');
                ul.appendChild(li);
            }
            for(let i = 0; i<info.length; i+=1){
                document.getElementById(i+1).addEventListener("click", setToLocalStorage.bind(this, i+1));
            }
        }

        if (jsonhttp.readyState === 4 && (JSON.parse(jsonhttp.responseText).status !== 200 || jsonhttp.status !== 200)){
            alert("Something went wrong");
            window.location.reload();
        }
    };
    let data = JSON.stringify(user);
    jsonhttp.send(data);
};

function getAnnouncementInfo() {
    let user = {
        x_access_token: localStorage.getItem('user'),
        id: localStorage.getItem('id')
    };
    let jsonhttp = new XMLHttpRequest();
    const url = "http://127.0.0.1:5000/Announcement/getInfo";
    jsonhttp.open("POST", url, true);
    jsonhttp.setRequestHeader("Content-Type", "application/json");
    jsonhttp.onreadystatechange = function() {
        if (jsonhttp.readyState === 4 && JSON.parse(jsonhttp.responseText).status === 200) {
            let info = JSON.parse(jsonhttp.responseText).list_of_local_announcements;
            console.log(info);
            document.getElementById("title").innerHTML = info[1]
            document.getElementById("theme").innerHTML = info[2]
            document.getElementById("type").innerHTML = info[3]
            document.getElementById("description").innerHTML = info[4]
            document.getElementById("email").innerHTML = info[5]
            document.getElementById("location").innerHTML = info[6]
            document.getElementById("date").innerHTML = info[7]
        }
        if (jsonhttp.readyState === 4 && (JSON.parse(jsonhttp.responseText).status !== 200 || jsonhttp.status !== 200)){
            alert("Something went wrong");
            window.location.reload();
        }
    };
    let data = JSON.stringify(user);
    jsonhttp.send(data);
}

function setToLocalStorage(id){
    localStorage.setItem('id', id)
    window.location.href = 'Information_advertisement.html'
}

function getUsersAnnouncement(){
    let user = {
        x_access_token: localStorage.getItem('user')
    };
    console.log(user)
    let jsonhttp = new XMLHttpRequest();
    const url = "http://127.0.0.1:5000/Announcement";
    jsonhttp.open("POST", url, true);
    jsonhttp.setRequestHeader("Content-Type", "application/json");
    jsonhttp.onreadystatechange = function() {
        if (jsonhttp.readyState === 4 && JSON.parse(jsonhttp.responseText).status === 200) {
            console.log(JSON.parse(jsonhttp.responseText))
            let info = JSON.parse(jsonhttp.responseText).list_of_announcements;
            for(let i = 0; i<info.length; i+=1){
                let li = document.createElement('li');
                li.className = 'advertisement';
                let div1 = document.createElement('div');
                div1.className = 'advertisement-text';
                let title = document.createElement('div')
                title.className = 'title-of-advertisement';
                let text_title = document.createTextNode(info[i][1]);
                title.appendChild(text_title);
                div1.appendChild(title);

                let div_theme = document.createElement('div');
                div_theme.className = 'text_of_advertisement';
                let div_theme_b = document.createElement('b');
                let b_text = document.createTextNode("Theme: ");
                div_theme_b.append(b_text);
                div_theme.appendChild(div_theme_b);
                let theme_text = document.createTextNode(info[i][2]);
                div_theme.appendChild(theme_text);
                div1.appendChild(div_theme);

                let div_type = document.createElement('div');
                div_type.className = 'text_of_advertisement';
                let div_type_b = document.createElement('b');
                b_text = document.createTextNode("Type: ");
                div_type_b.append(b_text);
                div_type.appendChild(div_type_b);
                let type_text = document.createTextNode(info[i][3]);
                div_type.appendChild(type_text);
                div1.appendChild(div_type);

                let div_date = document.createElement('div');
                div_date.className = 'text_of_advertisement';
                let div_date_b = document.createElement('b');
                b_text = document.createTextNode("Date: ");
                div_date_b.append(b_text);
                div_date.appendChild(div_date_b);
                let date_text = document.createTextNode(info[i][7]);
                div_date.appendChild(date_text);
                div1.appendChild(div_date);

                let div2 = document.createElement('div');
                div2.className = 'advertisement-btns';
                li.appendChild(div1);
                li.appendChild(div2);

                let button1 = document.createElement('button');
                button1.className = 'button_adv';
                button1.id = info[i][0];
                let text1 = document.createTextNode('Details');
                button1.appendChild(text1);
                let button2 = document.createElement('button');
                button2.className = 'button_adv';
                let text2 = document.createTextNode('Edit');
                button2.appendChild(text2);
                let button3 = document.createElement('button');
                button3.className = 'button_adv';
                let text3 = document.createTextNode('Delete');
                button3.appendChild(text3);
                div2.appendChild(button1);
                div2.appendChild(button2);
                div2.appendChild(button3);

                let ul = document.getElementById('list_of_advertisements');
                ul.appendChild(li);
            }
            for(let i = 0; i<info.length; i+=1){
                document.getElementById(i+1).addEventListener("click", setToLocalStorage.bind(this, i+1));
            }
        }

        if (jsonhttp.readyState === 4 && (JSON.parse(jsonhttp.responseText).status !== 200 || jsonhttp.status !== 200)){
            alert("Something went wrong");
            window.location.reload();
        }
    };
    let data = JSON.stringify(user);
    jsonhttp.send(data);
}

function createAdv(){
    const title = document.getElementById('title').value;
    const theme = document.getElementById('theme').value;
    const type_of_advertisement = document.getElementById('type_of_advertisement').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;
    let announcement_info = {
        name: title,
        theme: theme,
        type_of_announcement: type_of_advertisement,
        location: location,
        description: description,
        x_access_token: localStorage.getItem('user')
    };
    console.log(announcement_info);
    let jsonhttp = new XMLHttpRequest();
    const url = "http://127.0.0.1:5000/Announcement/create";
    jsonhttp.open("POST", url, true);
    jsonhttp.setRequestHeader("Content-Type", "application/json");
    jsonhttp.onreadystatechange = function() {
        if (jsonhttp.readyState === 4 && JSON.parse(jsonhttp.responseText).status === 200) {
            window.location.href='Home_authorized.html';
            alert(JSON.parse(jsonhttp.responseText).message);
        }
        if (jsonhttp.readyState === 4 && (JSON.parse(jsonhttp.responseText).status !== 200 || jsonhttp.status !== 200)){
            alert(JSON.parse(jsonhttp.responseText).message);
            window.location.reload();
        }
    };
    let data = JSON.stringify(announcement_info);
    jsonhttp.send(data);
}

function getSavedAnnouncements() {
    let user = {
        x_access_token: localStorage.getItem('user')
    };
    console.log(user)
    let jsonhttp = new XMLHttpRequest();
    const url = "http://127.0.0.1:5000/saved_announcement";
    jsonhttp.open("POST", url, true);
    jsonhttp.setRequestHeader("Content-Type", "application/json");
    jsonhttp.onreadystatechange = function() {
        if (jsonhttp.readyState === 4 && JSON.parse(jsonhttp.responseText).status === 200) {
            console.log(JSON.parse(jsonhttp.responseText))
            let info = JSON.parse(jsonhttp.responseText).list_of_local_announcements;
            for(let i = 0; i<info.length; i+=1){
                let li = document.createElement('li');
                li.className = 'advertisement';
                let div1 = document.createElement('div');
                div1.className = 'advertisement-text';
                let title = document.createElement('div')
                title.className = 'title-of-advertisement';
                let text_title = document.createTextNode(info[i][1]);
                title.appendChild(text_title);
                div1.appendChild(title);

                let div_theme = document.createElement('div');
                div_theme.className = 'text_of_advertisement';
                let div_theme_b = document.createElement('b');
                let b_text = document.createTextNode("Theme: ");
                div_theme_b.append(b_text);
                div_theme.appendChild(div_theme_b);
                let theme_text = document.createTextNode(info[i][2]);
                div_theme.appendChild(theme_text);
                div1.appendChild(div_theme);

                let div_type = document.createElement('div');
                div_type.className = 'text_of_advertisement';
                let div_type_b = document.createElement('b');
                b_text = document.createTextNode("Type: ");
                div_type_b.append(b_text);
                div_type.appendChild(div_type_b);
                let type_text = document.createTextNode(info[i][3]);
                div_type.appendChild(type_text);
                div1.appendChild(div_type);

                let div_date = document.createElement('div');
                div_date.className = 'text_of_advertisement';
                let div_date_b = document.createElement('b');
                b_text = document.createTextNode("Date: ");
                div_date_b.append(b_text);
                div_date.appendChild(div_date_b);
                let date_text = document.createTextNode(info[i][7]);
                div_date.appendChild(date_text);
                div1.appendChild(div_date);

                let div2 = document.createElement('div');
                div2.className = 'advertisement-btns';
                li.appendChild(div1);
                li.appendChild(div2);

                let button1 = document.createElement('button');
                button1.className = 'button_adv';
                button1.id = info[i][0];
                let text1 = document.createTextNode('Details');
                button1.appendChild(text1);
                let button2 = document.createElement('button');
                button2.className = 'button_adv';
                let text2 = document.createTextNode("Delete from_ Saved");
                button2.appendChild(text2);
                div2.appendChild(button1);
                div2.appendChild(button2);

                let ul = document.getElementById('list_of_advertisements');
                ul.appendChild(li);
            }
            for(let i = 0; i<info.length; i+=1){
                document.getElementById(i+1).addEventListener("click", setToLocalStorage.bind(this, i+1));
            }
        }

        if (jsonhttp.readyState === 4 && (JSON.parse(jsonhttp.responseText).status !== 200 || jsonhttp.status !== 200)){
            alert("Something went wrong");
            window.location.reload();
        }
    };
    let data = JSON.stringify(user);
    jsonhttp.send(data);
}