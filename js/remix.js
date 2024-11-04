document.addEventListener("DOMContentLoaded", async function () {
  const container = document.getElementById("remixes-list");
  const articContainer = document.getElementById("artic-card");
  const song = document.getElementById("song-list")

  // ریمیکس
  try {
    const itemsPerPage = 10; // تعداد آیتم‌ها در هر صفحه
    let currentPage = 1; // صفحه فعلی
    let remixesData = []; // داده‌های ریمیکس‌ها

    // تابع برای نمایش ریمیکس‌ها در صفحه فعلی
    function displayRemixes(page) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedItems = remixesData.slice(start, end);

      container.innerHTML = ""; // پاک کردن محتوا قبل از اضافه کردن آیتم‌های جدید
      paginatedItems.forEach((item) => {
        container.insertAdjacentHTML(
          "beforeend",
          createRemixCardTemplate(item)
        );
      });

      updatePaginationControls(page);
    }

    // تابع برای به‌روزرسانی کنترل‌های صفحه‌بندی
    function updatePaginationControls(page) {
      const totalPages = Math.ceil(remixesData.length / itemsPerPage);
      const paginationContainer = document.getElementById(
        "pagination-controls"
      );
      paginationContainer.innerHTML = ""; // پاک کردن محتوا

      // ایجاد دکمه قبلی
      const prevButton = document.createElement("button");
      prevButton.className = "pagination-button";
      prevButton.innerText = "قبلی";
      prevButton.disabled = page === 1;
      prevButton.onclick = () => changePage(page - 1);
      paginationContainer.appendChild(prevButton);

      // نمایش شماره صفحه
      const pageNumber = document.createElement("span");
      pageNumber.className = "page-number";
      pageNumber.innerText = `صفحه ${page} از ${totalPages}`;
      paginationContainer.appendChild(pageNumber);

      // ایجاد دکمه بعدی
      const nextButton = document.createElement("button");
      nextButton.className = "pagination-button";
      nextButton.innerText = "بعدی";
      nextButton.disabled = page === totalPages;
      nextButton.onclick = () => changePage(page + 1);
      paginationContainer.appendChild(nextButton);
    }

    // تابع برای تغییر صفحه
    function changePage(page) {
      currentPage = page;
      displayRemixes(currentPage);
    }

    // بارگذاری ریمیکس‌ها و راه‌اندازی صفحه‌بندی
    fetch(JsonRemix) // مسیر فایل JSON ریمیکس
      .then((response) => response.json())
      .then((data) => {
        remixesData = data.remixes; // ذخیره ریمیکس‌ها
        displayRemixes(currentPage); // نمایش صفحه اول
      })
      .catch((error) => console.error("Error loading remix data:", error));
  } catch (error) {
    console.error("Error loading artic data:", error);
  }

  // خواننده
  try {
    const articResponse = await fetch(JsonArtic);
    const articData = await articResponse.json();

    // آیدی‌های انتخاب شده
    const selectedIds = [
      "tomaj",
      "hichkas",
      "fadaei",
      "shervin"
    ];

    // ایجاد کارت‌های آرٹیک بر اساس ترتیب selectedIds
    const filteredData = selectedIds
      .map((id) => articData.artic.find((item) => item.id === id))
      .filter(Boolean); // فیلتر کردن مقادیر undefined

    // ایجاد کارت‌های آرٹیک
    articContainer.innerHTML = filteredData.map(createCardTemplate).join("");
  } catch (error) {
    console.error("Error loading artic data:", error);
  }

  // اهنگ
  try {
    const songResponse = await fetch(JsonSong);
    const songData = await songResponse.json();

    // آیدی‌های انتخاب شده برای آهنگ‌ها
    const selectedSongIds = [1, 10, 5, 9]; // تغییر دهید به آیدی‌های مورد نظر

    // ایجاد آرایه‌ای از آهنگ‌های انتخاب شده بر اساس آیدی‌ها
    const filteredSongs = selectedSongIds
      .map((id) => {
        // جستجو در تمامی آهنگ‌ها
        return Object.values(songData)
          .flatMap((artist) => artist.songs) // جمع آوری تمام آهنگ‌ها
          .find((song) => song.id === id); // پیدا کردن آهنگ بر اساس ID
      })
      .filter(Boolean); // فیلتر کردن مقادیر undefined

    // ایجاد کارت‌های آهنگ
    const songCards = filteredSongs.map(createRemixCardTemplate).join(""); // استفاده از createRemixCardTemplate
    song.innerHTML = songCards; // نمایش کارت‌ها در عنصر HTML
  } catch (error) {
    console.error("Error loading Song data:", error);
  }
});
