// ==UserScript==
// @name         Duolingo DuoFarmer
// @namespace    https://www.duolingo.com/
// @version      1.1
// @description  Cày xp cực kỳ nhanh cho duolingo
// @author       lamduck
// @match        https://*.duolingo.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=duolingo.com
// @grant        none
// ==/UserScript==
 
(function () {
 const language = "vi";
const server = "https://duo-farmer.vercel.app";
 
const initInterface = () => {
  const containerHTML = `<div id="loading" class="loading-box">DuoFarmer đang tải...</div>
    <div id="success" class="loading-box">DuoFarmer đã tải xong</div>`;
 
  const style = document.createElement('style');
  style.innerHTML = `.loading-box {
        position: fixed;
        top: 10%;
        right: 2%;
        width: 40%;
        padding: 12px;
        background: rgba(255, 255, 255, 1);
        border-radius: 12px;
        box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3),
          0px 4px 8px rgba(0, 0, 0, 0.1);
        font-weight: bold;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        animation: fadeIn 0.5s ease-in-out forwards;
      }
 
      #loading {
        border: 2px solid #28a745;
        color: #28a745;
      }
 
      #success {
        border: 2px solid #dc3545;
        color: #dc3545;
        display: none;
      }
 
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
 
      .fadeOut {
        animation: fadeOut 0.5s ease-in-out forwards !important;
      }
 
      @keyframes fadeOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-20px);
        }
      }`;
  document.head.appendChild(style);
 
  const container = document.createElement('div');
  container.innerHTML = containerHTML;
  document.body.appendChild(container);
}
 
const hideNotification = (element) => {
  element.classList.add("fadeOut");
  element.addEventListener("animationend", () => {
    element.style.display = "none";
  });
}
const initDuoFarmer = () => {
  const loadingBox = document.getElementById("loading");
  const successBox = document.getElementById("success");
 
 
  fetch(server + "/script?language=" + language)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Lỗi khi tải script");
      }
    })
    .then((scriptContent) => {
      hideNotification(loadingBox);
 
      const script = document.createElement("script");
      script.textContent = scriptContent;
      document.body.appendChild(script);
 
      successBox.style.display = "flex";
      successBox.style.animation = "fadeIn 0.5s ease-in-out forwards";
 
      setTimeout(() => {
        hideNotification(successBox);
      }, 3000);
    })
    .catch((error) => {
      console.error(error);
      alert("Đã có lỗi xảy ra, vui lòng báo cáo lỗi cho admin!");
      hideNotification(loadingBox);
    });
}
 
initInterface();
initDuoFarmer();
})();
