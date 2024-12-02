// Initialisation de LocalStorage pour les favoris
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Fonction pour ajouter un produit aux favoris
function addToWishlist(productId) {
  if (!wishlist.includes(productId)) {
    wishlist.push(productId); // Ajouter le produit à la liste
    localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Mettre à jour LocalStorage
    console.log(`Produit ${productId} ajouté aux favoris.`);
  } else {
    console.log(`Produit ${productId} est déjà dans les favoris.`);
  }
}

// Fonction pour retirer un produit des favoris
function removeFromWishlist(productId) {
  const index = wishlist.indexOf(productId);
  if (index !== -1) {
    wishlist.splice(index, 1); // Supprimer le produit de la liste
    localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Mettre à jour LocalStorage
    console.log(`Produit ${productId} retiré des favoris.`);
  } else {
    console.log(`Produit ${productId} n'est pas dans les favoris.`);
  }
}

// Fonction pour vérifier si un produit est dans les favoris
function isInWishlist(productId) {
  return wishlist.includes(productId);
}

// Gestion des boutons "Ajouter aux favoris"
document.querySelectorAll('.wishlist-btn').forEach((button) => {
  const productId = button.getAttribute('data-product-id');

  // Vérification de l'état du produit au chargement de la page
  if (isInWishlist(productId)) {
    button.textContent = 'Retirer des favoris';
    button.classList.add('bg-green-500'); // Indique que le produit est favori
  }

  // Ajout d'un gestionnaire d'événement au clic
  button.addEventListener('click', () => {
    if (isInWishlist(productId)) {
      // Si le produit est déjà dans les favoris, on le retire
      removeFromWishlist(productId);
      button.textContent = 'Ajouter aux favoris';
      button.classList.remove('bg-green-500'); // Réinitialise l'état visuel
    } else {
      // Sinon, on l'ajoute
      addToWishlist(productId);
      button.textContent = 'Retirer des favoris';
      button.classList.add('bg-green-500'); // Indique que le produit est favori
    }
  });
});

// Fonction pour afficher les produits favoris sur une page dédiée
function displayWishlist(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Conteneur avec l'ID "${containerId}" introuvable.`);
    return;
  }

  if (wishlist.length === 0) {
    container.innerHTML = '<p>Votre liste de favoris est vide.</p>';
    return;
  }

  // Parcourir la liste des favoris et générer du HTML
  wishlist.forEach((productId) => {
    // Exemple de structure de produit (vous pouvez personnaliser selon vos besoins)
    const productHTML = `
      <div class="wishlist-item border p-4 rounded">
        <p>Produit ID : ${productId}</p>
        <button class="remove-from-wishlist bg-red-500 text-black px-4 py-2 rounded" data-product-id="${productId}">
          Retirer des favoris
        </button>
      </div>
    `;
    container.innerHTML += productHTML;
  });

  // Ajouter des gestionnaires d'événements pour les boutons "Retirer"
  document.querySelectorAll('.remove-from-wishlist').forEach((button) => {
    button.addEventListener('click', (e) => {
      const productId = e.target.getAttribute('data-product-id');
      removeFromWishlist(productId);
      displayWishlist(containerId); // Rafraîchir la liste des favoris
    });
  });
}

// Exemple : Appeler `displayWishlist` sur une page avec un conteneur spécifique
document.addEventListener('DOMContentLoaded', () => {
  const wishlistContainer = document.getElementById('wishlist-container');
  if (wishlistContainer) {
    displayWishlist('wishlist-container');
  }
});
