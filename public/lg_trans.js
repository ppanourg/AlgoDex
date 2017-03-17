var temp = document.getElementById("login_bubble");
temp.parentNode.removeChild(temp);

temp = document.getElementById("login_script");
temp.parentNode.removeChild(temp);

temp = document.getElementById("login_style");
temp.parentNode.removeChild(temp);

temp = document.createElement("link");
temp.setAttribute("href", "./style.css");
temp.setAttribute("rel", "stylesheet");
temp.setAttribute("type", "text/css");
document.head.appendChild(temp);

temp = document.createElement("script");
temp.setAttribute("src", "./edit.js");
temp.setAttribute("id", "edit");
document.head.appendChild(temp);

temp = document.createElement("script");
temp.setAttribute("src", "./about.js");
temp.setAttribute("id", "about");
document.head.appendChild(temp);

temp = document.createElement("script");
temp.setAttribute("src", "./search.js");
temp.setAttribute("id", "search");
document.head.appendChild(temp);

temp = document.createElement("script");
temp.setAttribute("src", "./home.js");
temp.setAttribute("id", "home");
document.head.appendChild(temp);

temp = null;
