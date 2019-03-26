(function() {
  var PRODUCTS = {};

  const index = {
    menuMobile: () => {
      let btnOpenNav = document.getElementById("btn-open-nav"),
        nav = document.getElementById("nav"),
        btnCloseNav = document.getElementById("btn-close-nav"),
        overlay = document.getElementById("overlay");

      btnOpenNav.addEventListener("click", () => {
        nav.classList.add("isOpen");
        overlay.classList.remove("hidden");
      });

      btnCloseNav.addEventListener("click", () => {
        nav.classList.remove("isOpen");
        overlay.classList.add("hidden");
      });
    },

    templateProduct: item => {
      return `
			<li>
				<figure>
					<img src="${item.image}" alt="${item.name}">
				</figure>
				<strong class="tt-product">${item.name}</strong>
				<b class="tt-price">R$ ${item.price}</b>
			</li>
			`;
    },

    getProducts: () => {
      let xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
        if (this.status == 200) {
          let response = JSON.parse(xhttp.responseText);
          PRODUCTS = response.products;
          index.insertProducts(PRODUCTS);
        }
      };

      xhttp.responseType = "text";
      xhttp.open("GET", "../../api/mock-products.json", true);
      xhttp.send();
    },

    filterByNameAsc: () => {
      let productsFiltered = PRODUCTS.sort(
        (a, b) => (a.name > b.name) - (a.name < b.name)
      );
      index.insertProducts(productsFiltered);
    },

    filterByNameDesc: () => {
      let productsFiltered = PRODUCTS.sort(
        (a, b) => (a.name > b.name) - (a.name < b.name)
      );
      index.insertProducts(productsFiltered.reverse());
    },

    filterByPriceAsc: () => {
      let productsFiltered = PRODUCTS.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
      index.insertProducts(productsFiltered);
    },

    filterByPriceDesc: () => {
      let productsFiltered = PRODUCTS.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
      index.insertProducts(productsFiltered.reverse());
    },

    filterProduct: () => {
      let selProduct = document.getElementById("selFilter");

      selProduct.addEventListener("change", () => {
        switch (selProduct.value) {
          case "1":
            index.filterByPriceDesc();
            break;
          case "2":
            index.filterByPriceAsc();
            break;
          case "3":
            index.filterByNameAsc();
            break;
          default:
            index.filterByNameDesc();
        }
      });
    },

    insertProducts: listProducts => {
      let boxProducts = document.getElementsByClassName("list-products"),
        productBuilder = [];

      listProducts.forEach(product => {
        productBuilder.push(index.templateProduct(product));
      });

      boxProducts[0].innerHTML = productBuilder.join("");
    },

    init: () => {
      index.menuMobile();
      index.getProducts();
      index.filterProduct();
    }
  };

  index.init();
})();
