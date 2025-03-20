//save/store currently fetched data
let storePetData = []


// loading spinner

const loadSpinner = (show) => {
    const spinner = document.getElementById("loader");
    if(show){
        spinner.classList.remove("hidden");
        document.getElementById("pets-container").innerHTML = "";
    }
    else{
        spinner.classList.add("hidden")
    }
}

// remove active button
const removeActiveBtn = () => {
    const allButton = document.querySelectorAll(".category-btn")
    // console.log(allButton);
    for(btn of allButton){
        btn.classList.remove(
            'rounded-full',
            'bg-emerald-100',
            'border-2',
            'border-teal-800'
        )
        btn.classList.add("rounded-xl");
    }
}

// add active button
const addActiveBtn = (category) => {
    const activeButton = document.getElementById(`btn-${category}`)
    // console.log(activeButton);
    activeButton.classList.remove("rounded-xl");
    activeButton.classList.add(
        'rounded-full',
        'bg-emerald-100',
        'border-2',
        'border-teal-800'
        )
}


// handle like button
const like = (imgUrl) => {
    const likePet = document.getElementById("like-pet");
    const div = document.createElement("div")
    div.innerHTML = ` <img class="rounded-lg" src="${imgUrl}"/>`
    likePet.appendChild(div)
    // console.log(imgUrl);
}


// handle sort data
const sort = () => {
    loadSpinner(true)
    // console.log(storePetData);
    const storedData = storePetData.sort( (a, b) => b.price - a.price)
    setTimeout( ()=> {
        loadSpinner(false)
        displayAllPets(storedData);
    }, 1000)
}