document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("active");
  document.getElementById("main-content").classList.toggle("shifted");
});

document.getElementById('btn-delivery').addEventListener('click', function () {
  this.classList.add('active');
  document.getElementById('btn-pickup').classList.remove('active');
});

document.getElementById('btn-pickup').addEventListener('click', function () {
  this.classList.add('active');
  document.getElementById('btn-delivery').classList.remove('active');
});


document.getElementById("theme-toggle").addEventListener("click", function () {
  document.body.classList.toggle("night-mode");
  document.body.classList.toggle("day-mode");
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const productItems = document.querySelectorAll(".product-item");

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();

    productItems.forEach(function (item) {
      const title = item.querySelector(".card-title").textContent.toLowerCase();

      if (title.includes(query)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

