document.querySelectorAll('.wishlist-btn').forEach((button) => {
  button.addEventListener('click', async (e) => {
    const productId = e.target.getAttribute('data-product-id');
    const url = '/account/metafields';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          namespace: 'wishlist',
          key: 'products',
          type: 'list',
          value: [productId],
        }),
      });

      if (response.ok) {
        alert('Produit ajouté aux favoris.');
        e.target.classList.add('bg-green-500');
        e.target.textContent = 'Ajouté !';
      } else {
        console.error('Erreur lors de l’ajout aux favoris.', await response.json());
      }
    } catch (error) {
      console.error('Erreur réseau.', error);
    }
  });
});

