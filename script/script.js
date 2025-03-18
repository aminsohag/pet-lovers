const loadCategories = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await res.json();
    displayCategories(data.categories);
    
}

const loadAllPets = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const data = await res.json();
    displayAllPets(data.pets);
}


const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById("category-container");
    categories.forEach(categorie => {
        const {category_icon, category} = categorie
        // console.log(category);
        const div = document.createElement("div");
        div.innerHTML = `
            <button class="btn category-btn py-4 px-12 bg-white text-lg shadow-lg border rounded-xl flex items-center justify-center gap-6 h-full">
                <img src="${category_icon}" alt="">
                <p>${category}</p>
            </button>
        `
        categoryContainer.appendChild(div)
    });
}

const displayAllPets = (pet) =>{
    console.log(pet); 
}

loadCategories()
loadAllPets();