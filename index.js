const searchBox=document.querySelector('.searchBox')
const searchBtn=document.querySelector('.searchBtn')
const recipeContainer=document.querySelector('.recipe-container')
const recipeDetailsContent=document.querySelector('.recipe-details-content')
const recipeCloseBtn=document.querySelector('.recipe-close-btn')


// Function to get recipes
const fetchRecipes=async(query)=>{
    recipeContainer.innerHTML="<h2>Fetching Recipes...</h2>";
    // console.log("query",query);
try{


    const data =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=await data.json();
    console.log("alldata",data);
    // console.log("response",response);
    // // console.log("akshay",response?.meals[0]?.strCategory);
    
    recipeContainer.innerHTML="";
    response.meals.forEach(meal=>{
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span>Category</p>
        `
        // // Button added in the ui under perticular recipe.
        const button=document.createElement('button');
        button.textContent="View Recipe";
        recipeDiv.appendChild(button);

        // Adding event listener to recipe button
        button.addEventListener('click',()=>{
           //function
            openRecipePopup(meal);
        });

        recipeContainer.appendChild(recipeDiv);
        // console.log(response.meal[0]);
    });
} 
catch(error){
    recipeContainer.innerHTML="<h2>Error in Fetching Recipes...</h2>";
}
};
//Function to fetch ingredients and measurements
const fetchIngredients=(meal)=>{
console.log(meal);
    let ingredientsList="";
    for(let i=1; i<=20;i++){
       const ingredient=meal[`strIngredient${i}`];
       if(ingredient){
        const measure=meal[`strMeasure${i}`];
        ingredientsList+= `<li>${measure} ${ingredient}</li>`
       }
       else{
        break;
       }
   }
    return ingredientsList;
}

// function for the details for recipe[]
const openRecipePopup=(meal)=>{
      recipeDetailsContent.innerHTML=`
      <h2 class="recipeName">${meal.strMeal}</h2>
      <h3>Ingredents:</h3>
      <ul class="IngredientList">${fetchIngredients(meal)}</ul>
      <div class="recipeInstruction">
        <h3>Instructions:</h3>
        <p >${meal.strInstructions}</p>
      </div>
      `
      recipeDetailsContent.parentElement.style.display="block";
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
});

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2>type the meal name in the search box..!</h2>`;
        return;
    }
    fetchRecipes(searchInput);
    // console.log("Button clicked")
});








// const searchBox = document.querySelector('.searchBox');
// const searchBtn = document.querySelector('.searchBtn');
// const recipeContainer = document.querySelector('.recipe-container');

// // Function to get recipes
// const fetchRecipes = async (query) => {
//     recipeContainer.innerHTML = "Fetching Recipes...";  
//     try {
//         const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//         const data = await response.json();

//         // Clear previous results
//         recipeContainer.innerHTML = '';

//         if (data.meals) {
//             data.meals.forEach(meal => {
//                 const recipeDiv = document.createElement('div');
//                 recipeDiv.classList.add('recipe');
//                 recipeDiv.innerHTML = `
//                     <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
//                     <h3>${meal.strMeal}</h3>
//                     <p><span>${meal.strArea}</span> Dish</p>
//                     <p>Belongs to <span>${meal.strCategory}</span> Category</p>
//                 `;
//                 // Button added in the UI
//                 const button = document.createElement('button');
//                 button.textContent = "View Recipe";
//                 recipeDiv.appendChild(button);

//                 recipeContainer.appendChild(recipeDiv);
//             });
//         } else {
//             recipeContainer.innerHTML = 'No recipes found for your search query.';
//         }
//     } catch (error) {
//         console.error('Error fetching recipes:', error);
//         recipeContainer.innerHTML = 'Failed to fetch recipes. Please try again later.';
//     }
// };

// searchBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     const searchInput = searchBox.value.trim();
//     if (searchInput) {
//         fetchRecipes(searchInput);
//     } else {
//         recipeContainer.innerHTML = 'Please enter a search term.';
//     }
// });