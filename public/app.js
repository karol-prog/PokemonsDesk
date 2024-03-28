const pokeGrid = document.getElementById("pokedex");

async function getPokemon() {
  const allPromises = [];

  for (let i = 1; i <= 10; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const response = await fetch(`${url}`);
    const data = await response.json();
    /* console.log(data); */
    //push the data to array
    allPromises.push(data);

    //create a new array of pokemons
    const allPokemon = allPromises.map((data) => ({
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      types: data.types.map((type) => type.type.name).join(", "),
    }));
    console.log(allPokemon);
    renderPokemons(allPokemon);
  }
}

getPokemon();

//boiler plate for pokemons
function renderPokemons(pokemon) {
  let pokemonToHtml = "";

  pokemon.forEach((poke) => {
    pokemonToHtml += `
      <li class=" bg-red-800  flex flex-col justify-center align-center text-center rounded-xl hover:shadow-md">
        <img src=${poke.image} class="bg-cover bg-center bg-no-repeat mx-auto w-3/6">
        <div class="p-4">
          <h1 class="uppercase font-bold text-xl">${poke.id}. ${poke.name}</h1>
          <p class="text-sm">Type: ${poke.types}</p>    
        </div>
      </li>
    `;
  });

  pokeGrid.innerHTML = pokemonToHtml;
}
