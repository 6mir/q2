OnerrordefaultImage = "https://raw.githubusercontent.com/6mir/q2/refs/heads/main/eror-img.png";

const createCardTemplate = (item) => `
  <div class="item">
    <a href="song.html?singer=${item.id}">
      <div class="img">
        <div class="skeleton-loader"></div>
        <img src="${item.image}" alt="${item.title}" onload="imageLoaded(this)" onerror="this.onerror=null; this.src=OnerrordefaultImage;">
      </div>
        <h3>${item.title}</h3>
      </a>
    </div>
    `;

const createRemixCardTemplate = (item) => `
  <div class="item">
    <div class="right">
      <div class="img">
        <div class="skeleton-loader"></div>
        <img src="${item.image}" alt="${item.title}" onload="imageLoaded(this)" onerror="this.onerror=null; this.src=OnerrordefaultImage;">
      </div>
      <div class="text">
        <p class="n-music">${item.title}</p>
        <p class="name">${item.artist}</p>
      </div>
    </div>
    <div class="left">
      <img src="svg/p.svg" class="play-btn" onclick="playMusic('${item.file}', '${item.title}', '${item.artist}', '${item.image}', this)">
      <img src="svg/d.svg" id="download-btn" onclick="downloadMusic('${item.file}')">
    </div>
  </div>
`;

function imageLoaded(img) {
  const loader = img.previousElementSibling;
  loader.style.display = "none";
  img.style.display = "block";
}

JsonArtic = "data/artic.json";
JsonSong = "data/song.json";
JsonRemix = "data/remix.json";
