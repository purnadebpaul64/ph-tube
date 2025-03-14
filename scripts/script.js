// remove active class for category button
function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

// fetching categories data
function fetchCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

// fetching video data
function fetchVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById("all-active");
      clickedButton.classList.add("active");
      displayVideos(data.videos);
    });
}

// fetcing category videos
function categoryVideos(id) {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
}

// fetcing video details
function fetchVideoDetails(videoId) {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetalis(data.video));
}

// Display Category
function displayCategories(permCategories) {
  const categorySection = document.getElementById("category-section");
  for (let cat of permCategories) {
    const categoryButtonDiv = document.createElement("div");
    categoryButtonDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="categoryVideos(${cat.category_id})" class="btn hover:text-white hover:bg-[#FF1F3D]">${cat.category}</button>
        `;
    categorySection.append(categoryButtonDiv);
  }
}

// Display Videos
const displayVideos = (permVideos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = ``;
  if (permVideos.length == 0) {
    videoContainer.innerHTML = `
    <div class="col-span-full flex flex-col items-center py-20">
        <img src="./assets/Icon.png" alt="" />
        <h2 class="text-3xl font-bold text-center mt-4">
          Oops!! Sorry, There is no <br />content here
        </h2>
      </div>
    `;
    return;
  }
  for (const video of permVideos) {
    //time calculation
    function convertSeconds(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours} hrs ${minutes} min`;
    }
    //
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
<div class="card bg-base-100">
        <figure class="relative">
          <img
            class="w-full h-[180px] object-cover"
            src="${video.thumbnail}"
            alt="thumbnail"
          />
          <span
            class="absolute bottom-2 right-2 text-[12px] text-white bg-slate-700 px-2 py-0.5 rounded"
            >${
              video.others.posted_date == ""
                ? ``
                : `${convertSeconds(video.others.posted_date)} ago`
            }</span
          >
        </figure>
        <div class="pt-4 flex gap-2">
          <div>
            <div class="avatar">
              <div class="w-8 rounded-full">
                <img
                  src="${video.authors[0].profile_picture}"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 class="font-bold text-[14px]">
              ${video.title}
            </h3>
            <div class="flex gap-2 items-end">
              <p class="text-slate-500 text-sm">${
                video.authors[0].profile_name
              }</p>
              ${
                video.authors[0].verified == true
                  ? `<img
                class="w-4 h-4"
                src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"
                alt=""
              />`
                  : ``
              }
              
            </div>
            <p class="text-slate-500 text-sm">${video.others.views} views</p>
          </div>
        </div>
        <button onclick=fetchVideoDetails('${
          video.video_id
        }') class="btn btn-block mt-4 py-0.5">Show Details</button>
      </div>
`;
    videoContainer.append(videoCard);
  }
};

// Display Video Details
function displayVideoDetalis(video) {
  document.getElementById("video_details").showModal();
  const detailContiner = document.getElementById("detail-continer");
  detailContiner.innerHTML = `
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="thumbnail" />
  </figure>
  <div class="card-body flex flex-col justify-center items-center">
    <h2 class="text-xl font-semibold">${video.title}</h2>
    <p class="text-center">${video.description}</p>
  </div>
</div>
  `;
}
fetchCategories();
fetchVideos();
