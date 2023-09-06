
  document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector("header");  //Mengambil elemen header pertama yang ada dalam dokumen html  dan ditampung di variabel "header"
  const menu = document.getElementById('menu-icon');  //mengambil  elemen dengan Id "menu-icon" dan menampungnya dalam variabel menu-icon
  const navbar = document.querySelector('.close-menu');  //  //mengambil  elemen dengan class "close-menu" dan menampungnya dalam variabel navbar
  //event ini terjadi saat kode didalamnya dieksekusi  agar dapat melakukan  scrolling pada halaman
  window.addEventListener('scroll', () => {
    //Menambahkan atau menghapus kelas CSS "active" pada elemen header jika scrollY >0 halaman dapat di scroll dan class active yg telah di atur di css(layar header akan berubah warna di scrool) akan ditambahkan ke elemen header, jika tidak maka akan dihapus / tidak diterapkan class active nya
    header.classList.toggle('active', window.scrollY > 0);
  });
  // ketika kita klik ini maka akan memunculkan popup untuk menuju halaman lain
  menu.addEventListener('click', () => {
   navbar.className = "open-menu"    // Mengganti nilai atribut className dari elemen navbar menjadi "open-menu"
   document.querySelector(".bx").className = "open-menu-icon";   //Mengganti nilai atribut className dari elemen yang pertama ddari kelas "bx" menjadi class "open-menu-icon"
  });
    //event ini terjadi saat kode didalamnya dieksekusi  agar dapat melakukan  scrolling pada halaman
  window.addEventListener('scroll', () => {
    //Menghapus kelas "active" dari elemen navbar, sehingga menghilangkan efek(warna header berubah) saat di scroll
    navbar.classList.remove('active');
  });
});
// event ini untuk tombol penutup saat diklik
  document.querySelector(".tutup").addEventListener("click", ()=>{
    //Mengganti nilai atribut className dari elemen yang pertama dari kelas "open-menu" menjadi "close-menu"
    document.querySelector(".open-menu").className="close-menu";
    //Mengganti nilai atribut className dari elemen yang pertama dari kelas "open-menu-icon" menjadi "bx bx-menu"
    document.querySelector(".open-menu-icon").className = "bx bx-menu";  
  });
  // function untuk mengambil dan menampilkan ingredient/bahan makanan yang diambil dari Api
function getIngredient() {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=b")
    .then((res) => res.json())//then untuk menangani respons dari permintaan fetch dan untuk mengubah respons JSON menjadi objek JavaScript
    .then((data) => { // untuk menangani data setelah diubah menjadi objek JavaScript
      console.log(data);      //untuk mencetak data hasil dari respons API pada konsol
      for (let a = 0; a < 9; a++) {
        console.log(data.meals[a]);//untuk Mencetak data ke konsol yang digunakan untuk memeriksa detail makanan yang diambil dari API
        const popularItemDiv = document.createElement("div");// Membuat elemen div baru sebagai tampunganya
        popularItemDiv.className = "popular-box"; //Menambahkan kelas CSS "popular-box" ke elemen div

        const popularImgDiv = document.createElement("div");// Membuat elemen div baru sebagai tampunganya
        popularImgDiv.className = "popular-img";//Menambahkan kelas CSS "popular-img" ke elemen div

        const popularImg = document.createElement("img");//Membuat elemen img baru yang akan menampilkan gambar 
        popularImg.src = data.meals[a].strMealThumb;//Menetapkan sumber gambar untuk elemen img yang dibuat, yang diambil dari properti strMealThumb dari objek makanan pada indeks a dari array data.meals
        popularImg.alt = "foodies";   //Menetapkan teks alternatif untuk elemen img, ini akan ditampilkan jika gambar tidak dapat  diakses
        popularImgDiv.appendChild(popularImg);//Menambahkan elemen img sebagai anak dari elemen div class "popular-box"
        popularItemDiv.appendChild(popularImg);//Menambahkan elemen img sebagai anak dari elemen div class "popular-img"

        const popularNameDiv = document.createElement("div");//Membuat elemen div baru sebagai penampung  untuk menampilkan nama makanan dan link "Recipe"
        popularNameDiv.className = "popular-name";//menambahkan kelas
        popularItemDiv.appendChild(popularNameDiv);//Menambahkan elemen div sebagai anak dari elemen div class "popular-img"

        const popularNameHeading = document.createElement("h3");//Membuat elemen h3 baru yang akan menampilkan nama makanan
        popularNameHeading.textContent = data.meals[a].strMeal; //Menetapkan teks nama makanan untuk elemen h3
        popularNameDiv.appendChild(popularNameHeading);//Menambahkan elemen h3 (nama makanan) sebagai anak dari elemen div sebagai penampung nama makanan dan link "Recipe".

        const showRecipe = document.createElement("a");//menambhakan teks "Recipe" untuk elemen <a> 
        showRecipe.textContent = "Recipe";//menambhakna isi konten elemen a
        showRecipe.className="recipe";//memberi kelas elemen a

        //Ketika event ini terjadi, kode di dalamnya akan dieksekusi yaiyu mengambil dan menampilkan data dari API
        showRecipe.addEventListener("click", () => {
          const containerBox = document.createElement("div");//membuat elemen
          containerBox.className = "box";//memberi nama kelas

          // membuat elemen baru, menambhakan kelas, menambahkan teks konten
          const titleIngredient=document.createElement('h1');
          titleIngredient.className="title-ingredient";
          titleIngredient.textContent="Ingredient :";
          containerBox.appendChild(titleIngredient);// ditambahkan sebagai anak dari elemen div dengan kelas "box"

          // membuat elemen p baru sampai ingredient10 (sebanyak 10 kali karena ingredient diAPI ada byk sehingga diambilnya 1 persatu )
          const ingredient1 = document.createElement("p");//Membuat elemen p baru yang akan menampilkan bahan pertama dari makanan dan ukurannya.
          ingredient1.className = "ingredientItem";//memberi kelas
          ingredient1.textContent =// menambahkan isi konten dengan data yg diperoleh dari API Berupa bahan makanan dan takarannya yg lainnya sama sampai ingredient10
          data.meals[a].strIngredient1 + " " +data.meals[a].strMeasure1;
          containerBox.appendChild(ingredient1);//menambahkan elemen p sebagai anak dari elemen div class box

          const ingredient2 = document.createElement("p");
          ingredient2.className = "ingredientItem";
          ingredient2.textContent = data.meals[a].strIngredient2 + "   " + data.meals[a].strMeasure2;
          containerBox.appendChild(ingredient2);

          const ingredient3 = document.createElement("p");
          ingredient3.className = "ingredientItem";
          ingredient3.textContent = data.meals[a].strIngredient3 + "   " +data.meals[a].strMeasure3;
          containerBox.appendChild(ingredient3);

          const ingredient4 = document.createElement("p");
          ingredient4.className = "ingredientItem";
          ingredient4.textContent = data.meals[a].strIngredient4 + "   " +data.meals[a].strMeasure4;
          containerBox.appendChild(ingredient4);

          const ingredient5 = document.createElement("p");
          ingredient5.className = "ingredientItem";
          ingredient5.textContent = data.meals[a].strIngredient5 + "   " +data.meals[a].strMeasure5;
          containerBox.appendChild(ingredient5);

          const ingredient6 = document.createElement("p");
          ingredient6.className = "ingredientItem";
          ingredient6.textContent = data.meals[a].strIngredient6 + "   " +data.meals[a].strMeasure6;
          containerBox.appendChild(ingredient6);

          const ingredient7 = document.createElement("p");
          ingredient7.className = "ingredientItem";
          ingredient7.textContent = data.meals[a].strIngredient7 + "   " +data.meals[a].strMeasure7;
          containerBox.appendChild(ingredient7);

          const ingredient8 = document.createElement("p");
          ingredient8.className = "ingredientItem";
          ingredient8.textContent = data.meals[a].strIngredient8 + "   " +data.meals[a].strMeasure8;
          containerBox.appendChild(ingredient8);

          const ingredient9 = document.createElement("p");
          ingredient9.className = "ingredientItem";
          ingredient9.textContent = data.meals[a].strIngredient9 + "   " +data.meals[a].strMeasure9;
          containerBox.appendChild(ingredient9);

          const ingredient10 = document.createElement("p");
          ingredient10.className = "ingredientItem";
          ingredient10.textContent = data.meals[a].strIngredient10 + "   " +data.meals[a].strMeasure10;
          containerBox.appendChild(ingredient10);

          
          const btnClose=document.createElement("button");//membuat elemen button baru
          btnClose.className="btn-close";//memeberi kelas
          btnClose.textContent="X";//memeberi teks konten
          containerBox.appendChild(btnClose);//menambahkan elemen button sebagai anak dari elemen div class box

          // ketika kita klik event ini maka akan menghapus/menutup data yg ditampilkan dari API 
          btnClose.addEventListener("click",()=>{
            document.querySelector("header").removeChild(containerBox);//memilih semua elemen header dan menghapus semua anak dari container box
          })
          document.querySelector("header").appendChild(containerBox);//memilih semua elemen header dan Menambahkan elemen containerBox  sebagai anak dari elemen header
        });

        popularNameDiv.appendChild(showRecipe);//untuk menambahkan elemen showRecipe (elemen a yang berisi tombol "Recipe") sebagai anak dari elemen popularNameDiv.

      const  div = document.querySelector("#popular-container");//untuk memilih elemen dengan ID "popular-container" dalam halaman dan menampungnya dalam variabel div
      console.log(div)//mencetaj je konsole
       div.appendChild(popularItemDiv);//Menambahkan elemen popularItemDiv  sebagai anak dari elemen div dgn Id "popular-container"
      }
    });
}
//memanggil function
getIngredient();
