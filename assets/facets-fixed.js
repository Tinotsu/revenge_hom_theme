document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
  const targetDiv = document.querySelector(".facets_fixed_div");
  const color_productCount = document.querySelectorAll(".color_productCount");

  if (!targetDiv) return;

  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    if (lastScrollY < 490 && currentScrollY >= 490) {
      targetDiv.classList.add("fixed", "z-40", "w-[100vw]", "bg-revenge2");
      color_productCount.forEach (text => {
        text.classList.add("text-revenge3")
      })
      if (window.innerWidth >= 768) {
        targetDiv.classList.add("top-[78px]");
      } else if (window.innerWidth < 768) {
        targetDiv.classList.add("top-[69px]");
      }
    }

    if (lastScrollY > 490 && currentScrollY <= 490) {
      targetDiv.classList.remove("fixed", "z-40", "w-[100vw]", "bg-revenge2");
      color_productCount.forEach (text => {
        text.classList.remove("text-revenge3")
      })
      if (window.innerWidth >= 768) {
        targetDiv.classList.remove("top-[78px]");
      } else if (window.innerWidth < 768) {
        targetDiv.classList.remove("top-[69px]");
      }
    }

    lastScrollY = currentScrollY;
  });
});
