let btn = document.getElementById("btn_enviar");

let agregar = (event) => {
    event.preventDefault();
    let us = "desafiolatam";
    getUser(us).then(resp => {console.log(resp)});
    getRepo(us,10,20).then(resp => {console.log(resp)});
    alert("la tarea fallo con exito");
};
btn.addEventListener("click", agregar);

//​https://api.github.com/users/{user}​
//https://api.github.com/users/{user}/repos?page={pagina}&per_page={cantidad_repos}​​

async function request(url){
    const results = await fetch(url);
    const response = await results.json();
    return response;
};

async function  getUser(user){
    const url = `https://api.github.com/users/${user}`; 
    return request(url);
}
async function  getRepo(user,pagina,cantidad_repos){
    const url = `https://api.github.com/users/${user}/repos?page=${pagina}&per_page=${cantidad_repos}`; 
    return request(url);
}


btn.addEventListener("click", agregar, false);