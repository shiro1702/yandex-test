let stagesSwiper = null;

const mqStagesMobile = window.matchMedia("(max-width: 767px)");

function updateStagesSwiper() {
  if (mqStagesMobile.matches) {
    if (stagesSwiper) return;
    stagesSwiper = new Swiper("#stages-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 450,
      navigation: {
        prevEl: ".stages__arrow--prev",
        nextEl: ".stages__arrow--next",
      },
      pagination: {
        el: ".stages__pagination",
        clickable: true,
      },
    });
    return;
  }
  if (stagesSwiper) {
    stagesSwiper.destroy(true, true);
    stagesSwiper = null;
  }
}

updateStagesSwiper();
mqStagesMobile.addEventListener("change", updateStagesSwiper);

const participantsCurrent = document.querySelectorAll(".participants__current");
const participantsTotal = document.querySelector(".participants__total");
const participantsSlides = document.querySelectorAll(".participants__card");

function getVisibleParticipants() {
  return window.matchMedia("(min-width: 768px)").matches ? 3 : 1;
}

function updateParticipantsCounter(swiper) {
  const total = participantsSlides.length;
  const visible = getVisibleParticipants();
  const idx = typeof swiper.realIndex === "number" ? swiper.realIndex : swiper.activeIndex;
  const current = Math.min(total, idx + visible);
  participantsTotal.textContent = String(total);
  participantsCurrent.forEach(item => item.textContent = String(current));
}

const participantsSwiper = new Swiper("#participants-swiper", {
  slidesPerView: 1,
  spaceBetween: 24,
  speed: 450,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    prevEl: ".participants__arrow--prev",
    nextEl: ".participants__arrow--next",
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
  on: {
    init(swiper) {
      updateParticipantsCounter(swiper);
    },
    slideChange(swiper) {
      updateParticipantsCounter(swiper);
    },
  },
});

window.addEventListener("resize", () => {
  updateParticipantsCounter(participantsSwiper);
});

const mqRevealReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setRevealCascadeCardIndices() {
  document.querySelectorAll("section.stages .stages__card").forEach((el, i) => {
    el.style.setProperty("--reveal-card-index", String(i));
  });
  document.querySelectorAll("section.participants .participants__card").forEach((el, i) => {
    el.style.setProperty("--reveal-card-index", String(i));
  });
}

function initRevealOnScroll() {
  const nodes = document.querySelectorAll("[data-reveal]");
  if (!nodes.length) return;

  setRevealCascadeCardIndices();

  const reveal = (el) => {
    el.classList.add("is-revealed");
  };

  if (mqRevealReducedMotion.matches) {
    nodes.forEach(reveal);
    return;
  }

  const onIntersect = (entries, obs) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      reveal(entry.target);
      obs.unobserve(entry.target);
    }
  };

  const observer = new IntersectionObserver(onIntersect, {
    root: null,
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.06,
  });

  nodes.forEach((node) => {
    node.classList.add("reveal-initialized");
    observer.observe(node);
  });

  onIntersect(observer.takeRecords(), observer);
}

initRevealOnScroll();
