const keyword = document.querySelector('.keyword');
const limit = document.querySelector('.limit');
const send = document.querySelector('.send');
const list = document.querySelector('.list');

// 地點名稱映射
const cityMapping = {
  "臺北市": "Taipei",
  "新北市": "NewTaipei",
  "桃園市": "Taoyuan",
  "臺中市": "Taichung",
  "臺南市": "Tainan",
  "高雄市": "Kaohsiung",
  "基隆市": "Keelung",
  "新竹市": "Hsinchu",
  "新竹縣": "HsinchuCounty",
  "苗栗縣": "MiaoliCounty",
  "彰化縣": "ChanghuaCounty",
  "南投縣": "NantouCounty",
  "雲林縣": "YunlinCounty",
  "嘉義縣": "ChiayiCounty",
  "嘉義市": "Chiayi",
  "屏東縣": "PingtungCounty",
  "宜蘭縣": "YilanCounty",
  "花蓮縣": "HualienCounty",
  "臺東縣": "Taitung County",
  "金門縣": "KinmenCounty",
  "澎湖縣": "PenghuCounty",
  "連江縣": "LienchiangCounty"
};

send.addEventListener('click', function () {
  const limitNum = limit.value;
  const keywordTxt = keyword.value;
  const mappedCity = cityMapping[keywordTxt]; // 轉換成 API 支援的地點名稱

  if (!mappedCity) {
    alert("Invalid city name!");
    return;
  }

  // 拼接 API URL
  const url = `https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/${mappedCity}?$top=${limitNum}&$format=JSON`;

  axios.get(url, {
    headers: getAuthorizationHeader()
  })
  .then(function (response) {
    const thisData = response.data;
    let str = "";

      // 檢查是否無資料
    if (thisData.length === 0) {
      list.innerHTML = `<p class="no-data">目前查無資料。</p>`; // 無數據文字
      return;
    }

    thisData.forEach(item => {
      // 設定圖片 URL，如果缺少則使用預設圖片
      const imageUrl = item.Picture?.PictureUrl1 || './image/noimage.png';

      str += `
        <div class="info d-flex flex-column d-sm-flex flex-sm-row animate__animated animate__fadeIn">
          <div class="detailImg justify-content-sm-center">
            <img src="${imageUrl}" alt="${item.Picture?.PictureDescription1 || 'No image available'}">
          </div>
          <div class="text">
            <p class="name">${item.RestaurantName}</p>
            <div class="description">${item.Description || 'No description available.'}</div>
            <div class="address"><strong>Address:</strong> ${item.Address || 'No address available.'}</div>
            <div class="phone"><strong>Phone:</strong> ${item.Phone || 'No phone available.'}</div>
            <div class="open-time"><strong>Open Time:</strong> ${item.OpenTime || 'No opening hours available.'}</div>
            <div class="website">
              <a href="${item.WebsiteUrl || '#'}" target="_blank">Visit Website</a>
            </div>
            <div class="map-url">
              <a href="${item.MapUrl || '#'}" target="_blank">View on Map</a>
            </div>
            <div class="parking-info"><strong>Parking Info:</strong> ${item.ParkingInfo || 'No parking information.'}</div>
          </div>
        </div>
      `;
    });

    list.innerHTML = str;
  })
   .catch(function (error) {
    console.error(error);
    
    // 檢查錯誤回應是否為 429 狀態碼
    if (error.response && error.response.status === 429) {
      list.innerHTML = `<p class="error">**目前查詢人數過多，請稍後再試。**</p>`; // 429 錯誤訊息
    } else {
      // 其他錯誤（例如網路問題、API 錯誤等），顯示一般中文錯誤訊息
      list.innerHTML = `<p class="error">**載入資料失敗。請稍後再試。**</p>`;
    }
  });
})

// 驗證與授權 Header
function getAuthorizationHeader() {
  let AppID = 'minmm98-1a34959e-8761-41ba';
  let AppKey = '6e839c61-e3e1-42ea-a832-7185cdad1ab0';

  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  let HMAC = ShaObj.getHMAC('B64');
  let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return {
    'Authorization': Authorization,
    'X-Date': GMTString
  };
}
