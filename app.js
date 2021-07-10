const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const refs = {
  gallery: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  modalImage: document.querySelector(".lightbox__image"),
  modalCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
  modalOverlay: document.querySelector(".lightbox__overlay"),
};

// ================  Markup ================ //

const galleryMarkup = galleryItems.reduce(
  (acc, { preview, original, description }) => {
    return (
      acc +
      `<li class="gallery__item" ><a class="gallery__link" href = ${original} ><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" /></a></li>`
    );
  },
  ""
);

refs.gallery.insertAdjacentHTML("afterbegin", galleryMarkup);

// ================  Open Modal ================ //

refs.gallery.addEventListener("click", onOpenModal);

function onOpenModal(evt) {
  if (evt.target.nodeName !== "IMG") {
    return;
  }

  evt.preventDefault();
  refs.modal.classList.add("is-open");
  refs.modalImage.src = evt.target.dataset.source;
  refs.modalImage.alt = evt.target.alt;

  window.addEventListener("keydown", onLeftArrKey);
  window.addEventListener("keydown", onRightArrKey);
  window.addEventListener("keydown", onEscBtnCloseModal);
}

// ================   Modal Close ================ //

refs.modalCloseBtn.addEventListener("click", onCloseModal);

function onCloseModal() {
  refs.modal.classList.remove("is-open");
  refs.modalImage.src = "";
  refs.modalImage.alt = "";

  window.removeEventListener("keydown", onLeftArrKey);
  window.removeEventListener("keydown", onRightArrKey);
  window.removeEventListener("keydown", onEscBtnCloseModal);
}

// ================   Modal Overlay Close ================ //

refs.modalOverlay.addEventListener("click", onCloseModal);

// ================   Modal Close ESC ================ //

function onEscBtnCloseModal(evt) {
  if (evt.code !== "Escape") {
    return;
  }
  onCloseModal();
}

// // ================  KeyB Left ================ //

function onLeftArrKey(evt) {
  if (evt.code !== "ArrowLeft") {
    return;
  }

  const images = galleryItems.map(({ original }) => original);
  let currentImageIdx = images.indexOf(refs.modalImage.src);

  if (currentImageIdx === 0) {
    currentImageIdx = images.length - 1;
  }

  refs.modalImage.src = images[currentImageIdx - 1];
}

// ================  KeyB Right ================ //

function onRightArrKey(evt) {
  if (evt.code !== "ArrowRight") {
    return;
  }

  const images = galleryItems.map(({ original }) => original);
  let currentImageIdx = images.indexOf(refs.modalImage.src);

  if (currentImageIdx === images.length - 1) {
    currentImageIdx = 0;
  }

  refs.modalImage.src = images[currentImageIdx + 1];
}
