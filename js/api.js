let url = "https://readerapi.codepolitan.com/";

const status = (response) => {
    if (response.status == 200) {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    } else {
        console.log(`Error : ${response.status}`);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log(`Error api : ${error}`);
}

function getApi() {
    fetch(url + "articles")
        .then(status)
        .then(json)
        .then((data) => {
            let articleHtml = '';
            const datas = data.result;
            datas.forEach((article) => {
                articleHtml += `
                            <div class="col s12 m4">
                                <div class="card">
                                    <a href="./article.html?id=${article.id}">
                                        <div class="card-image waves-effect waves-block waves-light">
                                            <img src="${article.thumbnail}" />
                                        </div>
                                    </a>
                                    <div class="card-content">
                                        <span class="card-title truncate">${article.title}</span>
                                        <p>${article.description}</p>
                                    </div>
                                </div>
                            </div>`

            });
            document.getElementById('articles').innerHTML = articleHtml;
        })
        .catch(error)
}

function getArticleById() {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    fetch(url + "article/" + idParam)
        .then(status)
        .then(json)
        .then(function (data) {
            // Objek JavaScript dari response.json() masuk lewat variabel data.
            console.log(data.result.post_content);
            const result = data.result;

            // Menyusun komponen card artikel secara dinamis
            var articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${result.cover}" />
              </div>
              <div class="card-content">
                <p>${result.post_date}</p>
                <span class="card-title">${result.post_title}</span>
                ${snarkdown(result.post_content)}
              </div>
            </div>
          `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;
        });
}