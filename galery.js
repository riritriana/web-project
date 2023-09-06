
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
    //Mengganti nilai atribut className dari elemen yang pertama dari kelas "open-menu" menjadi "close-menu"
    document.querySelector(".open-menu").className="close-menu";
    //Mengganti nilai atribut className dari elemen yang pertama dari kelas "open-menu-icon" menjadi "bx bx-menu"
    document.querySelector(".open-menu-icon").className = "bx bx-menu";  
  });

// function ini  untuk menampilkan galeri gambar makanan yang diperoleh dari API 
  function showGalery() {
    //fetch untuk mengambil data dari URL
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=c")
    .then((res) => res.json())//then untuk menangani respons dari permintaan fetch dan untuk mengubah respons JSON menjadi objek JavaScript
    .then((data) => {    // untuk menangani data setelah diubah menjadi objek JavaScript
        console.log(data);      //untuk mencetak data hasil dari respons API pada konsol
        const galleryContainer = document.getElementById("gallery-container");   // membuat tampungan untuk menampilakn gambar dengan mengambil elemen id gallery container 
        for (let a = 0; a < 45; a++) {      // mengulangi proses pembuatan elemen galeri untuk mengambil data/gambarnya sebanyak 45 kali .
            console.log(data.meals[a]);   //untuk Mencetak data ke konsol yang digunakan untuk memeriksa detail makanan yang diambil dari API
            const popularImgDiv = document.createElement("div"); // untuk Membuat elemen  baru yang akan menjadi tampungan untuk setiap gambar
            popularImgDiv.className = "galery";   //Menambahkan kelas ke elemen div
            const popularImg = document.createElement("img"); //Membuat elemen img baru yang akan menampilkan gambar dari API
            popularImg.src = data.meals[a].strMealThumb; //Menetapkan sumber gambar untuk elemen img yang dibuat, yang diambil dari properti strMealThumb dari objek makanan pada indeks a dari array data.meals
            popularImg.alt = "foodies";   //Menetapkan teks alternatif untuk elemen img, ini akan ditampilkan jika gambar tidak dapat  diakses
            popularImg.className = "gallery-img";   // Menambahkan kelas CSS untuk mengatur ukuran gambarnya
            popularImgDiv.appendChild(popularImg);  //Menambahkan elemen img sebagai anak dari elemen div sebagai tampungannya
            galleryContainer.appendChild(popularImgDiv); //Menambahkan elemen div sebagai anak dari elemen dengan Id "gallery-container"
        }
    });
}
//memanggil function 
showGalery();
