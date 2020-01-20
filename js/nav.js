document.addEventListener("DOMContentLoaded", function () {
    //Activate sidebar nav
    var elems = document.querySelectorAll(".sidenav");
    M
        .Sidenav
        .init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200)
                    return;

                //Muat Daftar tautan menu
                document
                    .querySelectorAll(".topnav, .sidenav")
                    .forEach(function (elm) {
                        elm.innerHTML = xhttp.responseText;
                    });

                //Daftar event listener untuk setiap tautan menu
                document
                    .querySelectorAll(".sidenav a, .topnav a")
                    .forEach(function (elm) {
                        elm.addEventListener("click", function (event) {
                            //tutup sidenav
                            var sidenav = document.querySelector(".sidenav");
                            M
                                .Sidenav
                                .getInstance(sidenav)
                                .close();

                            //Memuat konten yang dipanggil
                            page = event
                                .target
                                .getAttribute("href")
                                .substr(1);
                            loadPage(page);
                        });
                    });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
    //Load page content
    var page = window
        .location
        .hash
        .substr(1);
    if (page == "") {
        page = "home";
    };


    // Memanggil ajax untuk memuat contant dari folder pages
    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            var content = document.querySelector("#body-content");
            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status == 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
        xhttp.open("GET", "pages/" + page + ".html", true); //membuat tidak dinamis(hanya menampilkan halaman depan) : membuat navbar tidak berfungsi sepenuhnya;
        xhttp.send();
    };
    loadPage(page);


});