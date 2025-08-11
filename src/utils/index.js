export async function fetchRecipes(query) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${
        !query ? "dessert" : query
      }&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Couldnt fetch de response");
    }
    const data = await response.json();
    // console.log(data.results);
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
    return data.recipes;
  } catch (error) {
    console.log(error);
  }
}
