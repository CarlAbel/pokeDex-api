const pokemonCount = 1000;
var pokedex = {}; // {1 : {"name" : "bulbsaur", "img" : url, "type" : ["grass", "poison"], "desc" : "...."} }

window.onload = async function() {
    // getPokemon(1);
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
        let pokemon = document.createElement("article");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("pokemon-list").append(pokemon);
    }
    document.getElementById("pokemon-description").innerText = pokedex[1]["desc"];
}
//getPokemon
async function getPokemon(pokeId) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokeId.toString();

    let res = await fetch(url);
    let pokemon = await res.json();

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();
    
    pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"];

    pokedex[pokeId] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc};
}

//updatePokemon
function updatePokemon(){
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];
    //clear previous type
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }
    //update types
    let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); //adds background color and font color
        typesDiv.append(type);
    }
    //update description
    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];
}
