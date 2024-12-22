document.addEventListener("DOMContentLoaded", () => {
  console.log("salut");
  console.log("JavaScript loaded successfully!");


  // Function to get favorites from localStorage
  function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  }

  // Function to save favorites to localStorage
  function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  // Function to update the favorites drawer
  async function updateFavoritesDrawer() {
    const favorites = getFavorites(); // Get favorites from localStorage
    const favoritesContainer = document.getElementById("favorites_items_container");

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

  // Function to handle adding items to favorites
  document.querySelectorAll(".add-to-favorites").forEach((button) => {
    button.addEventListener("click", (e) => {
      const item = {
        title: e.target.getAttribute("data-title"),
        image: e.target.getAttribute("data-image"),
        url: e.target.getAttribute("data-url"),
      };

      const favorites = getFavorites();
      const alreadyAdded = favorites.some((fav) => fav.url === item.url);

      if (!alreadyAdded) {
        favorites.push(item); // Add new item
        saveFavorites(favorites); // Save to localStorage
        updateFavoritesDrawer(); // Update drawer
        alert("Article ajouté à vos favoris!");
      } else {
        alert("Cet article est déjà dans vos favoris.");
      }
    });
  });

  // Favorites drawer open/close logic
  const favoritesDrawerSection = document.getElementById("favorites-drawer-section");
  const closeButton = document.getElementById("close-favorites-drawer");

  // Open favorites drawer
  document.querySelectorAll(".open-favorites-drawer").forEach((button) => {
    button.addEventListener("click", () => {
      favoritesDrawerSection.classList.remove("translate-x-full");
      favoritesDrawerSection.classList.add("translate-x-0");
      updateFavoritesDrawer(); // Refresh drawer content
    });
  });

  // Close favorites drawer
  closeButton.addEventListener("click", () => {
    favoritesDrawerSection.classList.remove("translate-x-0");
    favoritesDrawerSection.classList.add("translate-x-full");
  });

  // Initialize the favorites drawer on page load
  updateFavoritesDrawer();
});

