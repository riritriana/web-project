//  memunculkan menu icon pada saat ukuran layar max-width 991px
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
