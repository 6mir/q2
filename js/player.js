// ایجاد شیء Audio برای پخش فایل‌های صوتی
const audio = new Audio();
let isPlaying = false; // وضعیت پخش آهنگ
let progressAnimation; // متغیر برای ذخیره انیمیشن نوار پیشرفت

const StopSvgMain = "svg/s.svg"; // آیکون توقف
const PlaySvgMain = "svg/p.svg"; // آیکون پخش
const PlayBtn = ".play-btn"; // انتخاب دکمه‌های پخش

// تابع برای پخش آهنگ و تنظیم مشخصات پلیر
function playMusic(file, title, artist, image, playButton) {
  // بازنشانی تمامی دکمه‌های پخش به آیکون پیش‌فرض
  document.querySelectorAll(PlayBtn).forEach((btn) => (btn.src = PlaySvgMain));

  // تغییر آیکون دکمه پخش به آیکون توقف
  playButton.src = StopSvgMain;

  // نمایش پلیر و تنظیم مشخصات آهنگ
  const player = document.getElementById("player");
  player.style.display = "flex";
  const playerImage = document.getElementById("player-img");
  playerImage.src = image;
  playerImage.classList.add("rotate"); // افزودن کلاس چرخش
  document.getElementById("player-title").textContent = title;
  document.getElementById("player-singer").textContent = artist;

  // تنظیم منبع فایل صوتی و شروع پخش
  audio.src = file;
  audio.onerror = () => handleAudioError(playButton); // مدیریت خطای عدم وجود فایل

  audio
    .play()
    .then(() => {
      isPlaying = true; // تغییر وضعیت پخش به true
      updateProgress(); // شروع به‌روزرسانی نوار پیشرفت
    })
    .catch((error) => {
      console.error("Error playing audio:", error);
      handleAudioError(playButton); // نمایش خطا در صورت مشکل در پخش
    });

  // افزودن شنونده برای پایان پخش آهنگ
  audio.onended = () => {
    audio.currentTime = 0; // بازنشانی زمان پخش به 0
    audio.play(); // پخش مجدد آهنگ
  };
}

// تابع برای مدیریت خطا در صورت عدم وجود آهنگ
function handleAudioError(playButton) {
  showErrorModal("این آهنگ وجود ندارد!"); // نمایش پیام خطا
  resetPlayer(playButton); // بازنشانی پلیر
}

// بازنشانی پلیر و توقف آهنگ
function resetPlayer(playButton) {
  audio.pause(); // توقف پخش آهنگ
  isPlaying = false; // تغییر وضعیت پخش به false
  cancelAnimationFrame(progressAnimation); // لغو انیمیشن نوار پیشرفت
  document.getElementById("player").style.display = "none"; // مخفی کردن پلیر
  playButton.src = PlaySvgMain; // تغییر آیکون دکمه به حالت پیش‌فرض
  document.getElementById("progress-range").value = 0; // بازنشانی نوار پیشرفت

  // حذف کلاس چرخش از تصویر
  const playerImage = document.getElementById("player-img");
  playerImage.classList.remove("rotate"); // حذف کلاس چرخش
}

// بروزرسانی نوار پیشرفت پلیر و زمان‌ها
function updateProgress() {
  const progressRange = document.getElementById("progress-range");
  const currentTimeDisplay = document.getElementById("current-time");
  const totalTimeDisplay = document.getElementById("total-time");

  if (audio.duration) {
    const currentTime = Math.floor(audio.currentTime);
    const duration = Math.floor(audio.duration);
    progressRange.value = (audio.currentTime / audio.duration) * 100; // درصد نوار پیشرفت
    currentTimeDisplay.textContent = formatTime(currentTime); // نمایش زمان فعلی
    totalTimeDisplay.textContent = formatTime(duration); // نمایش کل زمان آهنگ
  }

  // درخواست به‌روزرسانی در فریم بعدی
  if (isPlaying) {
    progressAnimation = requestAnimationFrame(updateProgress);
  }
}

// قالب‌بندی زمان به دقیقه و ثانیه
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
  }`;
}

// بروزرسانی زمان پخش هنگام تغییر نوار پیشرفت
document
  .getElementById("progress-range")
  .addEventListener("input", function () {
    audio.currentTime = (this.value / 100) * audio.duration; // تنظیم زمان فعلی بر اساس نوار پیشرفت
  });

// دانلود فایل آهنگ
function downloadMusic(file) {
  fetch(file).then((response) => {
    if (response.ok) {
      const link = document.createElement("a");
      link.href = file;
      link.download = file.split("/").pop(); // نام فایل
      document.body.appendChild(link);
      link.click(); // شروع دانلود
      document.body.removeChild(link); // حذف لینک بعد از دانلود
    } else {
      showErrorModal("آهنگی برای دانلود وجود ندارد!"); // نمایش پیام خطا
    }
  });
}

// نمایش مودال خطا
function showErrorModal(message) {
  document.getElementById("error-message").textContent = message; // تنظیم پیام خطا
  document.getElementById("error-modal").style.display = "block"; // نمایش مودال خطا
  setTimeout(closeModal, 1000); // بستن مودال بعد از یک ثانیه
}

// بستن مودال خطا
function closeModal() {
  document.getElementById("error-modal").style.display = "none"; // مخفی کردن مودال خطا
}

// نمایش و مخفی‌کردن دکمه‌های پخش و توقف
const p = document.querySelector(".play-1");
const s = document.querySelector(".stop-1");

p.addEventListener("click", function () {
  togglePlayStop(); // تغییر وضعیت پخش/توقف
  p.style.display = "none"; // مخفی کردن دکمه پخش
  s.style.display = "block"; // نمایش دکمه توقف
});

s.addEventListener("click", function () {
  togglePlayStop(); // تغییر وضعیت پخش/توقف
  s.style.display = "none"; // مخفی کردن دکمه توقف
  p.style.display = "block"; // نمایش دکمه پخش
});

// تغییر وضعیت پخش/توقف آهنگ
function togglePlayStop() {
  const playerImage = document.getElementById("player-img");
  if (isPlaying) {
    audio.pause(); // توقف آهنگ
    isPlaying = false; // تغییر وضعیت پخش به false
    playerImage.classList.remove("rotate"); // حذف کلاس چرخش
    cancelAnimationFrame(progressAnimation); // توقف به‌روزرسانی نوار پیشرفت
  } else {
    audio
      .play()
      .then(() => {
        isPlaying = true; // تغییر وضعیت پخش به true
        playerImage.classList.add("rotate"); // افزودن کلاس چرخش
        updateProgress(); // شروع به‌روزرسانی نوار پیشرفت
      })
      .catch(() => {}); // در صورت بروز خطا، هیچ کاری انجام ندهید
  }
}

// توقف پخش و مخفی‌سازی پخش‌کننده هنگام تغییر به تب دیگر
document.addEventListener("visibilitychange", () => {
  if (document.hidden && isPlaying) {
    const activePlayButton = document.querySelector(
      `${PlayBtn}[src="${StopSvgMain}"]`
    );
    resetPlayer(activePlayButton); // توقف و بازنشانی پلیر
  }
});

// تابع برای نمایش تصویر پیش‌فرض در صورت خطا
function setFallbackImage(img) {
  img.src = OnerrordefaultImage; // مسیر تصویر پیش‌فرض را اینجا تنظیم کنید
}
