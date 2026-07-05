/*const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const runWait = async () => {
  console.log("Before Wait");
  await wait(2000);
  console.log("After Wait");
};

runWait();*/

/*const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      console.log("Error fetching ");
    }
    const products = await response.json();
    console.log("Total no.of products =", products.length);

    const titles = products.map((p) => p.title);
    console.log("Titles:", titles);

    const productsUnder50 = products.filter((p) => p.price < 50);
    console.log("Productss under 50:", productsUnder50);

    const mostExpensive = products.reduce((best, current) => {
      return current.price > best.price ? current : best;
    }, products[0]);
    console.log("The most expensive product", mostExpensive);
  } catch (err) {
    console.log("Error", err);
  }
};

fetchProducts();*/

/*const fetchWrong = async () => {
  try {
    const response = await fetch("http://validwrong.com/");
  } catch (err) {
    console.error(err);
  } finally {
    console.log("fetch complete");
  }
};

fetchWrong();

const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      console.log("Error fetching ");
    }
    const products = await response.json();
    return products;
  } catch (err) {
    console.log("Error", err);
  }
};

const fetchUsers = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/users");
    if (!response.ok) {
      console.log("Error fetching ");
    }
    const users = await response.json();
    return users;
  } catch (err) {
    console.log("Error", err);
  }
};

const [products, users] = await Promise.all([fetchProducts(), fetchUsers()]);

console.log(
  `total number of products: ${products.length} and total number of users : ${users.length}`,
);*/

const status = document.querySelector("#status");
const grid = document.querySelector("#products-grid");
const reloadBtn = document.querySelector("#reload-btn");

if (status && grid && reloadBtn) {
  const truncate = (text, maxlength) => {
    if (text.length <= maxlength) return text;
    return text.slice(0, maxlength) + "...";
  };

  const productCard = (product) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col";

    card.innerHTML = `
      <img 
        src="${product.image}" 
        alt="${product.title}"
        class="w-full h-48 object-contain mb-4"
      />
      <span class="bg-indigo-100 text-indigo-700 text-xs 
                   font-medium px-2 py-0.5 rounded-full 
                   self-start mb-2">
        ${product.category}
      </span>
      <h3 class="text-sm font-semibold text-gray-900 mb-2 flex-1">
        ${truncate(product.title, 50)}
      </h3>
      <p class="text-lg font-bold text-indigo-600">
        $${product.price}
      </p>
    `;
    return card;
  };

  const fetchProducts = async () => {
    grid.innerHTML = "";
    status.textContent = "Loading products...";
    status.className = "text-center text-gray-500 text-lg py-12";
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const products = await response.json();
      status.textContent = "";

      products.forEach((p) => {
        const card = productCard(p);
        grid.appendChild(card);
      });
    } catch (err) {
      status.textContent = "Failed to load products. Try again.";
      status.className = "text-center text-red-500 text-lg py-12";
      console.error("Fetch failed:", err.message);
    }
  };

  fetchProducts();
  reloadBtn.addEventListener("click", fetchProducts);
}
