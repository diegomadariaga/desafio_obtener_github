let btn = document.getElementById("btn_enviar");


const promesa1 = (user, pagina, cantidad_repos) => new Promise((resolve, reject) => {

    Promise.all([getUser(user), getRepo(user, pagina, cantidad_repos)])
        .then((respuesta) => {
            if (respuesta[0].message == 'Not Found') {
                alert(`no se encuentró el usuario "${user}"`);
                reject("error");
            } else {
                document.getElementById("col_datos_personales").innerHTML = `
                    <p><h3>Datos de Usuario</h3></p>
                    <p><img src="${respuesta[0].avatar_url}" alt="" ></p>
                    <p>Nombre de usuario: ${respuesta[0].name}</p>
                    <p>Nombre de login: ${respuesta[0].login}</p>
                    <p>Cantidad de Repos: ${respuesta[0].public_repos}</p>
                    <p>Localidad: ${respuesta[0].location}</p>
                    <p>Tipo de usuario: ${respuesta[0].type}</p>
                    `;
                    
                let lista_repos = "<br>";
                if (respuesta[1].length === 0) {
                    lista_repos = lista_repos + `<p>${"no hay más repositorios para mostrar"}</p>`;
                    
                } else {
                    respuesta[1].forEach(element => {
                        lista_repos = lista_repos + `<p><a href="${element.html_url}">${element.name}</a></p>`;
                    });
                    
                }
                document.getElementById("col_listado_repos").innerHTML = lista_repos;
                resolve("ok");
            }

        });

});

let agregar = (event) => {
    event.preventDefault();
    let us = document.getElementById("nombre").value;
    let num_pagina = document.getElementById("pagina").value;
    let cant_repos = document.getElementById("repoPagina").value;
    

    promesa1(us, num_pagina, cant_repos).then(resp => {
        console.log(resp);
    })
    .catch(err => {
        console.log(err);
    });

};
btn.addEventListener("click", agregar);

//​https://api.github.com/users/{user}​
//https://api.github.com/users/{user}/repos?page={pagina}&per_page={cantidad_repos}​​

async function request(url) {
    try {
        const results = await fetch(url);
        const response = await results.json();
        console.log(url)
        return response;

    } catch (error) {
        alert("No fue posible concretar la solicitud al servidor");
        throw Error("No fue posible concretar la solicitud al servidor");
    }

}

function getUser(user) {
    try {
        const url = `https://api.github.com/users/${user}`;
        return request(url);

    } catch (error) {
        alert("no se pudo encontrar el usuario");
    }
}
function getRepo(user, pagina, cantidad_repos) {
    try {
        const url = `https://api.github.com/users/${user}/repos?page=${pagina}&per_page=${cantidad_repos}`;

        return request(url);
    } catch (error) {
        alert("no se pudo cargar las repo");
    }
}


btn.addEventListener("click", agregar, false);