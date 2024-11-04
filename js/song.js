document.addEventListener("DOMContentLoaded", async function () {
  const singer = new URLSearchParams(window.location.search).get("singer");
  const articContainer = document.getElementById("artic-card");
  const container = document.getElementById("remixes-list");

  // آهنگ
  try {
    fetch(JsonSong)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        const singerData = data[singer];
        if (singerData) {
          displayTitle(singerData.title);
          createCards(singerData.songs);
        } else {
          console.error("Singer not found in data");
        }
      })
      .catch((error) => console.error("Error loading song data:", error));

    // تابع برای نمایش عنوان در بالای صفحه
    function displayTitle(title) {
      document.getElementById("page-title").textContent = `آهنگ های ${title}`;
    }

    // تابع برای ایجاد کارت‌های آهنگ‌ها
    function createCards(songs) {
      const container = document.getElementById("song-list");
      container.innerHTML = songs.map(createRemixCardTemplate).join("");
    }
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
