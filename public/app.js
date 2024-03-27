async function getPokemon() {
  const allPromises = [];

  for (let i = 1; i < 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const response = await fetch(`${url}`);
    const data = await response.json();
    /* console.log(data); */
    allPromises.push(data);

    Promise.all(allPromises).then((result) => {
      const allPokemon = result.map((data) => ({
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map((type) => type.type.name).join(", "),
      }));
      console.log(allPokemon);
    });
  }
}

getPokemon();
