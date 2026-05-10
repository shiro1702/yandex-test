let stagesSwiper = null;

const mqStagesMobile = window.matchMedia("(max-width: 767px)");

function updateStagesSwiper() {
  if (mqStagesMobile.matches) {
    if (stagesSwiper) return;
    stagesSwiper = new Swiper("#stages-swiper", {
      slidesPerView: 1,
      spaceBetween: 16,
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

const participantsCurrent = document.querySelector(".participants__current");
const participantsTotal = document.querySelector(".participants__total");
const participantsSlides = document.querySelectorAll(".participants__card");

function getVisibleParticipants() {
  return window.matchMedia("(min-width: 768px)").matches ? 3 : 1;
}

function updateParticipantsCounter(swiper) {
  const total = participantsSlides.length;
  const visible = getVisibleParticipants();
  const current = Math.min(total, swiper.activeIndex + visible);
  participantsTotal.textContent = String(total);
  participantsCurrent.textContent = String(current);
}

const participantsSwiper = new Swiper("#participants-swiper", {
  slidesPerView: 1,
  spaceBetween: 24,
  speed: 450,
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
