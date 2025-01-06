document.addEventListener("DOMContentLoaded", () => {
  console.log("a-featured-product loaded successfully!");

  // Function to get favorites from localStorage
  function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  }

  // Function to save favorites to localStorage
  function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
  
  //Function to get the url's fav
  function getFavoritesUrl() {
    const favorites = getFavorites();
    return favorites.map((item) => item.url);
  }

  // Function to check if a product URL is in favorites
  const isInFavorites = (productUrl) => {
    const favoritesUrl = getFavoritesUrl();
    return favoritesUrl.includes(productUrl); // Check if URL is present
  };

  // Function to update the favorites drawer
  async function updateFavoritesDrawer() {
    const favorites = getFavorites(); // Get favorites from localStorage
    const favoritesContainer = document.getElementById(
      "favorites_items_container"
    );

    // Clear current items in the drawer
    favoritesContainer.innerHTML = "";

    if (favorites.length === 0) {
      favoritesContainer.innerHTML = `<p class="text-center text-gray-500">Votre liste de favoris est vide.</p>`;
      return;
    }

    // Populate favorites in the drawer
    favorites.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add(
        "z-30",
        "bg-revenge1",
        "w-[100%]",
        "h-auto",
        "flex",
        "items-center",
        "space-x-16",
        "p-4",
        "border-b",
        "border-gray-300"
      );
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="w-[100px] h-auto">
        <div class="flex flex-col w-[100%]">
          <a href="${item.url}" class="font-semibold hover:underline">${item.title}</a>
          <button class="remove-favorite-btn bg-red-500 text-white px-4 py-2 rounded mt-2" data-index="${index}">
            Retirer
          </button>
        </div>
      `;
      favoritesContainer.appendChild(itemElement);
    });

    // Add event listeners to remove favorite items
    document.querySelectorAll(".remove-favorite-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        const updatedFavorites = getFavorites();
        updatedFavorites.splice(index, 1); // Remove the item by index
        saveFavorites(updatedFavorites); // Save updated list
        updateFavoritesDrawer(); // Re-render the drawer
      });
    });
  }

  // Function to change the SVG for a specific product
  function changeSVG(productId) {
    document.querySelectorAll(`#svg_id_${productId}`).forEach((svg) => {
      const path = svg.querySelector("path");
      if (path) {
        path.setAttribute(
          "d",
          "M13.5 0H1.5C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V21L7.5 17.2095L15 21V1.5C15 1.10218 14.842 0.720644 14.5607 0.43934C14.2794 0.158035 13.8978 0 13.5 0Z"
        );
        svg.classList.add("wishlist-active"); // Optional: Add a class to style
      } else {
        console.error(`Path not found in SVG for product ID: ${productId}`);
      }
    });
  }

// Loop for change the SVG when the page is loaded
document.querySelectorAll(".featured-product").forEach((productElement) => {
  const productUrl = productElement.querySelector(".add-to-favorites").getAttribute("data-url");
  const productId = productElement.querySelector(".add-to-favorites").getAttribute("data-product-id");
  
  if (isInFavorites(productUrl)) {
      console.log(`${productUrl} is in the favorites!`);
      changeSVG(productId)
  } else {
      console.log(`${productUrl} is NOT in the favorites!`);
  }
});
  
  // Function to handle adding items to favorites
  document.querySelectorAll(".add-to-favorites").forEach((button) => {
    button.addEventListener("click", (e) => {
      const buttonElement = e.currentTarget;

      const item = {
        title: buttonElement.getAttribute("data-title"),
        image: buttonElement.getAttribute("data-image"),
        url: buttonElement.getAttribute("data-url"),
      };

      const productId = buttonElement.getAttribute("data-product-id");
      const favorites = getFavorites();
      const alreadyAdded = favorites.some((fav) => fav.url === item.url);

      if (!alreadyAdded) {
        favorites.push(item); // Add new item
        saveFavorites(favorites); // Save to localStorage
        updateFavoritesDrawer(); // Update drawer
        changeSVG(productId); // Update SVG for the specific product
        alert("Article ajouté à vos favoris!");
      } else {
        alert("Cet article est déjà dans vos favoris.");
      }
    });
  });

  // Favorites drawer open/close logic
  const favoritesDrawerSection = document.getElementById(
    "favorites-drawer-section"
  );
  const closeButton = document.getElementById("close-favorites-drawer");

  // Open favorites drawer
  document.querySelectorAll(".open-favorites-drawer").forEach((button) => {
    button.addEventListener("click", () => {
      favoritesDrawerSection.classList.remove("translate-x-full");
      favoritesDrawerSection.classList.add(
        "translate-x-0",
        "md:right-5",
        "shadow-2xl"
      );
      updateFavoritesDrawer(); // Refresh drawer content
    });
  });

  // Close favorites drawer
  closeButton.addEventListener("click", () => {
    favoritesDrawerSection.classList.remove(
      "translate-x-0",
      "md:right-5",
      "shadow-2xl"
    );
    favoritesDrawerSection.classList.add("translate-x-full");
  });

  // Initialize the favorites drawer on page load
  updateFavoritesDrawer();
});
