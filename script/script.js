const loadCategories = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await res.json();
    displayCategories(data.categories);

}

const loadAllPets = async () => {
    loadSpinner(true)
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const data = await res.json();

    setTimeout(() => {
        loadSpinner(false)
        displayAllPets(data.pets);
        storePetData = data.pets
    }, 2000);
}

const loadPetByCategories = async (category) =>{

    //remove active button
    removeActiveBtn()
    //show active button
    addActiveBtn(category)

    loadSpinner(true)
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data = await res.json();

    setTimeout(() => {
        loadSpinner(false)
        displayAllPets(data.data);
        storePetData = data.data
    }, 2000);
}

const loadAllPetsDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    const data = await res.json()
    displayPetDetails(data.petData);
}

const displayPetDetails = (detail) => {
    // console.log(detail);
    const bodyDetail = document.getElementById("details-container")
    const {image, pet_name, breed,  date_of_birth, gender, price, vaccinated_status, pet_details} = detail
    bodyDetail.innerHTML = `
            <img class="w-full rounded-lg mb-2" src="${image}" alt="">
            <h3 class="text-xl font-bold">${pet_name}</h3>
            <div class="grid grid-cols-2">
                <p><i class="fa-solid fa-grip"></i>  Breed: ${breed?breed:"Not available"}</p>
                <p><i class="fa-solid fa-calendar"></i> Birth: ${date_of_birth ? date_of_birth : 'Not available'}</p>
                <p><i class="fa-solid fa-mercury"></i> Gender: ${gender ? gender : 'Not available'}</p>
                <p><i class="fa-solid fa-dollar-sign"></i> Price : ${price ? price : 'Not available'}</p>
            </div>
            <p><i class="fa-solid fa-mercury"></i> Vaccinated status: ${vaccinated_status? vaccinated_status : 'Not available'}</p>
            <div class="divider"></div>
            <div class="mb-2">
                <p class="text-xl font-bold">Details Information</p>
                <p>${pet_details? pet_details : 'Not available'}</p>
            </div>
    `

    my_modal_6.showModal()
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categories.forEach(categorie => {
        const { category_icon, category } = categorie
        // console.log(category);
        const div = document.createElement("div");
        div.innerHTML = `
            <button id="btn-${category}" onclick="loadPetByCategories('${category}')" class="btn category-btn w-full py-3 px-6 md:py-4 md:px-8 bg-white text-lg shadow-lg rounded-xl flex items-center justify-center gap-4  h-full">
                <img src="${category_icon}" alt="">
                <p>${category}</p>
            </button>
        `
        categoryContainer.appendChild(div)
    });
}

const displayAllPets = (petall) => {
    const petContainer = document.getElementById("pets-container");
    if( petall.length === 0){
        petContainer.classList.remove('grid');
        petContainer.innerHTML = `
            <div class="bg-gray-100 p-6 lg:p-20 text-center rounded-lg space-y-4">
                <img class="mx-auto" src="images/error.webp" />
                <h2 class="text-2xl font-bold">No Information Available</h2>
                <p class="text-gray-500">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        `

        return;
    }else{
        petContainer.classList.add('grid')
    }
    
    // petContainer.innerHTML = "";
    petall.forEach(pet => {
        // console.log(pet);
        const { breed, category,petId, date_of_birth, gender, image, pet_name, price } = pet;

        const div = document.createElement("div");
        div.innerHTML = `
            <div class="p-6 border rounded-lg">
                <img class="rounded-lg w-full h-[160px]" src="${image}" alt="">
                <h2 class="text-xl font-bold mt-4">${pet_name}</h2>
                <p><i class="fa-solid fa-grip"></i>  Breed: ${breed?breed: 'Not available'}</p>
                <p><i class="fa-solid fa-calendar"></i> Birth: ${date_of_birth? date_of_birth : 'Not available'}</p>
                <p><i class="fa-solid fa-mercury"></i> Gender: ${gender? gender: 'Not available'}</p>
                <p><i class="fa-solid fa-dollar-sign"></i> Price : ${price? price : 'Not available'}</p>
                <div class="divider"></div>
                <div class="flex  justify-between">
                    <button onclick="like('${image}')" class="btn px-4"><i class="fa-solid fa-thumbs-up"></i></button>
                    <button onclick="adoptModal(this)" class="btn px-4">Adopt</button>
                    <button onclick="loadAllPetsDetails('${petId}')" class="btn px-4">Details</button>
                </div>
            </div>
        `
        petContainer.appendChild(div)
    });
}


// adopt button functionality
const adoptModal = (event) => {
    let count = 3;
    const countContainer = document.getElementById("countdown-container")
    countContainer.innerText = count;

    my_modal_5.showModal()

    const interval = setInterval(() => {
        count-- 
        if(count !== 0) countContainer.innerText = count;
        if(count < 1){
            clearInterval(interval)
            my_modal_5.close()
            event.textContent = "Adopted"
            event.disabled = true
        }
    }, 1000);
}

loadCategories()
loadAllPets();