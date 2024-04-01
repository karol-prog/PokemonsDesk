const pokeGrid = document.getElementById("pokedex");

async function getPokemon() {
  const allPromises = [];

  for (let i = 1; i <= 10; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const response = await fetch(`${url}`);
    const data = await response.json();
    //push the data to array
    allPromises.push(data);

    //create a new array of pokemons
    const allPokemon = allPromises.map((data) => ({
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      types: data.types.map((type) => type.type.name).join(", "),
    }));
    /* console.log(allPokemon); */
    renderPokemons(allPokemon);
  }
}

getPokemon();

//boiler plate for pokemons
function renderPokemons(pokemon) {
  let pokemonToHtml = "";

  pokemon.forEach((poke) => {
    pokemonToHtml += `
      <li class="hover:cursor-pointer bg-red-800  flex flex-col justify-center align-center text-center rounded-xl hover:shadow-md" onclick="getDetailsPokemons(${poke.id})">
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

//function onclick for getting details of each pokemon
async function getDetailsPokemons(pokemonId) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  const response = await fetch(`${url}`);
  const data = await response.json();
  //call the function for renderDetails
  renderDetails(data);
}

//function for displaying details of each pokemon
function renderDetails(detail) {
  const abilities = detail.abilities.map((ability) => {
    return ability.ability.name;
  });

  const htmlDetail = `
    <div id="details" class="fixed top-0 left-0 bg-orange-700 w-screen h-screen opacity-95">
      <button id="close-btn" class="border-none rounded-xl bg-red-800 p-3 absolute top-10 right-10 hover:cursor-pointer" onclick="closeDetails()">Close</button>

      <div class="bg-red-800 max-w-xl flex flex-col justify-center align-center text-center rounded-xl mx-auto my-40">
        <img src=${detail.sprites.front_default} class="bg-cover bg-center bg-no-repeat mx-auto w-3/6">
        <div class="p-4">
          <h1 class="uppercase font-bold text-xl">${detail.id}. ${detail.name}</h1>
           <p><small>Height: ${detail.height} kg</small> | <small>Weight: ${detail.weight} kg</small></p> 
           <p><small>Abilities: ${abilities}</small></p>
        </div>
      </div>
    </div>
  `;
  pokeGrid.innerHTML = htmlDetail + pokeGrid.innerHTML;
}

//funciton onclick for closing the details
function closeDetails() {
  const details = document.getElementById("details");
  details.parentElement.removeChild(details);
}
