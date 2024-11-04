document.addEventListener("DOMContentLoaded", async function () {
  const articContainer = document.getElementById("artic-card");
  const song = document.getElementById("song-list");
  const container = document.getElementById("remixes-list");

  // خواننده
  try {
    const response = await fetch(JsonArtic);
    const data = await response.json();

    document = articContainer.innerHTML = data.artic
      .map(createCardTemplate)
      .join("");
  } catch (error) {
    console.error("Error loading JSON data:", error);
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

  // ریمیکس
  try {
    const remixResponse = await fetch(JsonRemix);
    const remixData = await remixResponse.json();

    // آیدی‌های انتخاب شده برای ریمیکس (اعداد)
    const selectedRemixIds = [1, 3, 5, 2]; // تغییر دهید به آیدی‌های مورد نظر

    // ایجاد کارت‌های ریمیکس بر اساس ترتیب selectedRemixIds
    const filteredRemixData = selectedRemixIds
      .map((id) => remixData.remixes.find((item) => item.id === id))
      .filter(Boolean); // فیلتر کردن مقادیر undefined

    // ایجاد کارت‌های ریمیکس
    const remixCards = filteredRemixData.map(createRemixCardTemplate).join("");
    container.innerHTML = remixCards;
  } catch (error) {
    console.error("Error loading remix data:", error);
  }
});
