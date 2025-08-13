export async function fetchRecipes(query, offset = 0, number = 8) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${
        !query ? "dessert" : query
      }&number=${number}&offset=${offset}&apiKey=${
        process.env.NEXT_PUBLIC_API_KEY
      }`
    );
    if (!response.ok) throw new Error("Couldnt fetch de response");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchInformation(id) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    if (!response.ok) throw new Error("Couldnt fetch de response");

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchRandom(amount) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=${amount}&exclude-tags=quinoa&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    if (!response.ok) throw new Error("Couldnt fetch de response");

    const data = await response.json();

    const simplifiedData = data.recipes.map(({ id, title, image }) => ({
      id,
      title,
      image,
    }));

    return simplifiedData;
    // return data.recipes;
  } catch (error) {
    console.log(error);
  }
}
