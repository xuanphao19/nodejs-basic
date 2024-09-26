AOS.init();

const createAnchor = (() => {
  const anchor = document.createElement("a");
  anchor.href = "#top";
  anchor.className = "back-top";
  anchor.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
  </svg>`;
  document.body.appendChild(anchor);
})();
const backTop = document.querySelector(".back-top");
window.addEventListener("scroll", () => {
  backTop?.classList.toggle("active", window.scrollY > 200);
});

const accordions = document.querySelectorAll(".accordion1");

// accordions.forEach((accordion) => {
//   const titles = accordion.querySelectorAll(".title");
//   titles.forEach((title) => {
//     title.addEventListener("click", () => {
//       const parent = title.closest(".accordion-item");
//       const isActive = parent.classList.contains("active");

//       // Đóng tất cả các mục cùng cấp
//       const siblings = parent.parentElement.children;
//       Array.from(siblings).forEach((sibling) => {
//         if (sibling !== parent) {
//           sibling.classList.remove("active");
//         }
//       });
//       // Chuyển đổi trạng thái active của mục hiện tại
//       parent.classList.toggle("active", !isActive);
//     });
//   });
// });
