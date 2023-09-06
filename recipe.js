document.addEventListener('DOMContentLoaded', () => {
    //Mengambil elemen header pertama yang ada dalam dokumen html  dan ditampung di variabel "header"
    const header = document.querySelector("header");
    //mengambil  elemen dengan Id "menu-icon" dan menampungnya dalam variabel menu-icon
    const menu = document.getElementById('menu-icon');
    //  //mengambil  elemen dengan class "close-menu" dan menampungnya dalam variabel navbar
    const navbar = document.querySelector('.close-menu');
    //event ini terjadi saat kode didalamnya dieksekusi  agar dapat melakukan  scrolling pada halaman
    window.addEventListener('scroll', () => {
      //Menambahkan atau menghapus kelas CSS "active" pada elemen header jika scrollY >0 halaman dapat di scroll dan class active yg telah di atur di css(layar header akan berubah warna di scrool) akan ditambahkan ke elemen header, jika tidak maka akan dihapus / tidak diterapkan class active nya
      header.classList.toggle('active', window.scrollY > 0);
    });
    // event elemen menu ini terjadi saat kode didalamnya dieksekusi
    menu.addEventListener('click', () => {
      // Mengganti nilai atribut className dari elemen navbar menjadi "open-menu"
     navbar.className = "open-menu"
     //Mengganti nilai atribut className dari elemen yang pertama ddari kelas "bx" menjadi class "open-menu-icon"
     document.querySelector(".bx").className = "open-menu-icon";
    });
      //event ini terjadi saat kode didalamnya dieksekusi  agar dapat melakukan  scrolling pada halaman
    window.addEventListener('scroll', () => {
      //Menghapus kelas "active" dari elemen navbar, sehingga menghilangkan efek(warna header berubah) saat di scroll
      navbar.classList.remove('active');
    });
  });
  // event ini untuk tombol penutup saat diklik
    document.querySelector(".tutup").addEventListener("click", ()=>{
      document.querySelector(".open-menu").className="close-menu";  //Mengganti nilai atribut className dari elemen yang pertama dari kelas "open-menu" menjadi "close-menu"
      document.querySelector(".open-menu-icon").className = "bx bx-menu";   //Mengganti nilai atribut className dari elemen yang pertama dari kelas "open-menu-icon" menjadi "bx bx-menu"

    });
    
const searchBtn = document.getElementById( 'search-btn');//mengambil elemen dengan ID "search-btn" dan menampungnya dalam variabel searchBtn
const mealList = document.getElementById('meal');//mengambil elemen dengan ID "meal" danmenampungnya dalam variabel mealList 
const mealDetailsContent = document.querySelector('.meal-details-content');// mengambil  elemen pertama  kelas "meal-details-content" dan menampungnya dalam variabel mealDetailsContent
const recipeCloseBtn = document.getElementById('recipe-close-btn');// mengambill elemen dengan ID "recipe-close-btn" dan menyimpannya dalam variabel recipeCloseBtn
// event listeners
searchBtn.addEventListener('click', getMealList);//Menambahkan event listener, ketika  tombol "searchBtn" diklik maka akan menjalankan fungsi getMealList 
mealList.addEventListener('click', getMealRecipe);//Menambahkan event listener, ketika  elemen mealList diklik maka akan menjalankan fungsi getMealRecipe
recipeCloseBtn.addEventListener('click', () => {//saat dklik akan menutup tampilan detail dari API
    mealDetailsContent.parentElement.classList.remove('showRecipe');// menghapus kelas "showRecipe" dari elemen parent mealDetailsContent
});
function createMealItemElement(meal) {
   
    const mealItemDiv = document.createElement('div'); // membuat elemen baru dengan tag div
    mealItemDiv.className = 'meal-item';    // memberi kelas pada tag div
    mealItemDiv.setAttribute('data-id', meal.idMeal);

    // Membuat elemen div class="meal-img"
    const mealImgDiv = document.createElement('div');
    mealImgDiv.className = 'meal-img';

    // Membuat elemen 
    const mealImg = document.createElement('img');
    mealImg.src = meal.strMealThumb;
    mealImg.alt = 'food';
    mealImgDiv.appendChild(mealImg);// Menambahkan elemen img sebagai child dari elemen class="meal-img"


    // Membuat elemen div class="meal-name"
    const mealNameDiv = document.createElement('div');
    mealNameDiv.className = 'meal-name';

    // Membuat elemen h3
    const mealNameHeading = document.createElement('h3');
    mealNameHeading.textContent = meal.strMeal;

    // Membuat elemen tag a  recipe-btn Get Recipe
    const recipeBtnLink = document.createElement('a');
    recipeBtnLink.href = '#';//elemen hyperlink agar tidak kehalaman lain
    recipeBtnLink.className = 'recipe-btn';// memberi nama kelas recipe-btn
    recipeBtnLink.textContent = 'Get Recipe'; // membuat text konten  Get Recipe yang nanatinya bisa diarahkan untuk menunjukan isi langkah /resep makanan

    // Menambahkan elemen h3 dan a sebagai child dari elemen class="meal-name"
    mealNameDiv.appendChild(mealNameHeading);
    mealNameDiv.appendChild(recipeBtnLink);

    // Menambahkan elemen div class="meal-img" dan div class="meal-name" sebagai child dari elemen class="meal-item
    mealItemDiv.appendChild(mealImgDiv);
    mealItemDiv.appendChild(mealNameDiv);
    return mealItemDiv;//mengembalikan nilai
}
// function  search berdasarkan ingredient/bahan
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            const mealList = document.getElementById('meal');

            // Menghapus konten sebelumnya
            while (mealList.firstChild) {
                mealList.removeChild(mealList.firstChild);
            }
            if (data.meals) { //memeriksa apakah jika  properti meals ada dalam objek data
                data.meals.forEach(meal => {
                    const mealElement = createMealItemElement(meal);//ntuk setiap objek makanan, fungsi createMealItemElement dipanggil dengan argumen meal  dan menampungnya dalam variabel mealElement
                    mealList.appendChild(mealElement);//ditambahkan sebagai anak ke dalam elemen mealList
                });
                mealList.classList.remove('notFound');//Menghapus kelas "notFound" di css  dari elemen mealList
            } else {//jika data tidak ada
                //Membuat elemen <p> baru yang akan menampilkan pesan tex konten
                const notFoundMsg = document.createElement('p');
                notFoundMsg.textContent = "Sorry, we couldn't find any recipes";
                mealList.appendChild(notFoundMsg);//menambahkan  elemen p notFoundMsg sebagai anak dari elemen mealList
                mealList.classList.add('notFound');//Menambahkan kelas CSS "notFound" ke elemen mealList
            }
        });
}
//function untuk menampilkan detail makanan ketika tombol "recipe-btn" pada daftar makanan diklik
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => PopUp(data.meals));
    }
}

/// ini function untuk  membuat dan mengembalikan elemen yang akan menampilkan detail makanan yang diperoleh dari API ketika tombol "Get Recipe" pada daftar makanan diklik.
function createRecipeElement(meal) {
    // membuat menambahkan class, menambahkan tex konten 

    const recipeContainer = document.createElement('div');
    const recipeTitleHeading = document.createElement('h2');
    recipeTitleHeading.className = 'recipe-title';
    recipeTitleHeading.textContent = meal.strMeal;

    const recipeCategoryPara = document.createElement('p');
    recipeCategoryPara.className = 'recipe-category';
    recipeCategoryPara.textContent = meal.strCategory;

    const recipeInstructDiv = document.createElement('div');
    recipeInstructDiv.className = 'recipe-instruct';

    const recipeInstructHeading = document.createElement('h3');
    recipeInstructHeading.textContent = 'Instructions:';

    const recipeInstructPre = document.createElement('p');
    recipeInstructPre.textContent = meal.strInstructions;

    recipeInstructDiv.appendChild(recipeInstructHeading);
    recipeInstructDiv.appendChild(recipeInstructPre);

    const recipeMealImgDiv = document.createElement('div');
    recipeMealImgDiv.className = 'recipe-meal-img';

    const recipeMealImg = document.createElement('img');
    recipeMealImg.src = meal.strMealThumb;
    recipeMealImg.alt = '';

    recipeMealImgDiv.appendChild(recipeMealImg);

    const recipeLinkDiv = document.createElement('div');
    recipeLinkDiv.className = 'recipe-link';

    const recipeLinkAnchor = document.createElement('a');
    recipeLinkAnchor.href = meal.strYoutube;
    recipeLinkAnchor.target = '_blank';
    recipeLinkAnchor.textContent = 'Watch Video';

    recipeLinkDiv.appendChild(recipeLinkAnchor);

    // Menambahkan semua elemen ke dalam container (recipeContainer)
    recipeContainer.appendChild(recipeTitleHeading);
    recipeContainer.appendChild(recipeCategoryPara);
    recipeContainer.appendChild(recipeInstructDiv);
    recipeContainer.appendChild(recipeMealImgDiv);
    recipeContainer.appendChild(recipeLinkDiv);

    return recipeContainer;
}
// fungsi ini untuk menampilkan resep makanan
function PopUp(meal) {
    console.log(meal);
    meal = meal[0];//menetapkan elemen pertama dari objek ke dalam variabel meal
    const recipeElement = createRecipeElement(meal);    // Buat elemen resep menggunakan fungsi createRecipeElement
    // Membersihkan konten sebelumnya dari elemen mealDetailsContent
    while (mealDetailsContent.firstChild) {
        mealDetailsContent.removeChild(mealDetailsContent.firstChild);
    }
    // Menambahkan elemen resep ke dalam elemen mealDetailsContent menggunakan appendChild
    mealDetailsContent.appendChild(recipeElement);
    // Menambahkan class 'showRecipe' ke parent container untuk menampilkan Modal
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
const popularRecipe= document.getElementById('Popular-recipe');
const tombolRecipe = document.getElementsByClassName('recipe');


