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



send.addEventListener('click', function (e) {
  // 假資料 (模擬 API 回傳成功)
const mockHotelData = [
  {
    "HotelName": "臺北君悅酒店 (Grand Hyatt Taipei)",
    "Description": "五星級飯店，坐落於信義區，緊鄰台北 101。",
    "Address": "臺北市信義區松壽路 2 號",
    "Phone": "02-27201234",
    "WebsiteUrl": "https://www.hyatt.com/zh-TW/hotel/taiwan/grand-hyatt-taipei/taipe",
    "Picture": {
    }
  },
   {
    "HotelName": "臺北君悅酒店 (Grand Hyatt Taipei)",
    "Description": "五星級飯店，坐落於信義區，緊鄰台北 101。",
    "Address": "臺北市信義區松壽路 2 號",
    "Phone": "02-27201234",
    "WebsiteUrl": "https://www.hyatt.com/zh-TW/hotel/taiwan/grand-hyatt-taipei/taipe",
    "Picture": {
      "PictureUrl1": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/337871236.jpg?k=80873e569cc8b6c96878bb9540428bf38df4af4f991b8ce78ec1ee9410dafd18&o=&hp=1",
      "PictureDescription1": "Grand Hyatt Taipei Exterior"
    }
  },
  {
    "HotelName": "臺南晶英酒店 (Silks Place Tainan)",
    "Description": "結合文化與藝術的設計酒店，位於台南市中心。",
    "Address": "臺南市中西區和意路 1 號",
    "Phone": "06-3903000",
    "WebsiteUrl": "https://www.silksplace-tainan.com.tw/",
    "Picture": {
      "PictureUrl1": "https://m.ahstatic.com/is/image/accorhotels/HCM_P_8147067:4by3?fmt=jpg&op_usm=1.75,0.3,2,0&resMode=sharp2&iccEmbed=true&icc=sRGB&dpr=on,1.5&wid=335&hei=251&qlt=80",
      "PictureDescription1": "Silks Place Tainan Lobby"
    }
  },
  {
    "HotelName": "高雄漢來大飯店 (Grand Hi-Lai Hotel)",
    "Description": "位於高雄市中心，可俯瞰高雄港海景。vfsfdgvsvb大時代擦擦大晚上的擦位於高雄市中心，可俯瞰高雄港海景。vfsfdgvsvb大時代擦擦大晚上的擦位於高雄市中心，可俯瞰高雄港海景。vfsfdgvsvb大時代擦擦大晚上的擦位於高雄市中心，可俯瞰高雄港海景。vfsfdgvsvb大時代擦擦大晚上的擦我的",
    "Address": "",
    "Phone": "",
    "WebsiteUrl": "",
    "Picture": {
      "PictureUrl1": "https://m.ahstatic.com/is/image/accorhotels/HCM_P_8147067:4by3?fmt=jpg&op_usm=1.75,0.3,2,0&resMode=sharp2&iccEmbed=true&icc=sRGB&dpr=on,1.5&wid=335&hei=251&qlt=80",
      "PictureDescription1": "Grand Hi-Lai Hotel View"
    }
  },
  {
    "HotelName": "臺南晶英酒店 (Silks Place Tainan)",
    "Description": "結合文化與藝術的設計酒店，位於台南市中心。",
    "Address": "臺南市中西區和意路 1 號",
    "Phone": "06-3903000",
    "WebsiteUrl": "https://www.silksplace-tainan.com.tw/",
    "Picture": {
      "PictureUrl1": "https://m.ahstatic.com/is/image/accorhotels/HCM_P_8147067:4by3?fmt=jpg&op_usm=1.75,0.3,2,0&resMode=sharp2&iccEmbed=true&icc=sRGB&dpr=on,1.5&wid=335&hei=251&qlt=80",
      "PictureDescription1": "Silks Place Tainan Lobby"
    }
  },
  {
    "HotelName": "高雄漢來大飯店 (Grand Hi-Lai Hotel)",
    "Description": "位於高雄市中心，可俯瞰高雄港海景。vfsfdgvsvb大時代擦擦大晚上的擦位於高雄市中心，可俯瞰高雄港海景。vfsfdgvsvb大時代擦擦大晚上的擦位於高雄市中心，可俯瞰高雄港海景。vfsfdgvsvb大時代擦擦大晚上的擦位於高雄市中心，可俯瞰高雄港海景。vfsfdgvsvb大時代擦擦大晚上的擦我的",
    "Address": "高雄市前金區成功一路 266 號",
    "Phone": "07-2161766",
    "WebsiteUrl": "https://www.grand-hilai.com.tw/",
    "Picture": {
      "PictureUrl1": "https://m.ahstatic.com/is/image/accorhotels/HCM_P_8147067:4by3?fmt=jpg&op_usm=1.75,0.3,2,0&resMode=sharp2&iccEmbed=true&icc=sRGB&dpr=on,1.5&wid=335&hei=251&qlt=80",
      "PictureDescription1": "Grand Hi-Lai Hotel View"
    }
  }
];

// 用來模擬 API 取得資料的函數，實際使用時需移除
function mockApiCall(mappedCity, limitNum) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // 模擬無數據回傳 (您可以在此處切換測試)
            // if (mappedCity === 'NewTaipei') return resolve({ data: [] });
            
            // 模擬正常回傳
            const data = mockHotelData.slice(0, limitNum === '100' ? mockHotelData.length : parseInt(limitNum));
            resolve({ data: data });
        }, 500);
    });
}


send.addEventListener('click', function () {
  const limitNum = limit.value;
  const keywordTxt = keyword.value;
  const mappedCity = cityMapping[keywordTxt]; // 轉換成 API 支援的地點名稱

  if (!mappedCity) {
    alert("Invalid city name!");
    return;
  }
  
  list.innerHTML = `<p class="loading text-center">**資料載入中...**</p>`; // 顯示載入中
  
  // 1. **實際 API 呼叫 (請取消註解，並將 mockApiCall 移除)**
  // const url = `https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel/${mappedCity}?$top=${limitNum}&$format=JSON`;
  // const apiPromise = axios.get(url, { headers: getAuthorizationHeader() });
  
  // 2. **使用假資料呼叫 (請在測試完畢後移除)**
  const apiPromise = mockApiCall(mappedCity, limitNum);


  apiPromise
  .then(function (response) {
    const thisData = response.data;
    let str = "";

    // 檢查是否無資料
    if (thisData.length === 0) {
      list.innerHTML = `<p class="no-data text-center">**目前查無資料。**</p>`; // 無數據文字
      return;
    }

    thisData.forEach(item => {
      // 設定圖片 URL，如果缺少則使用預設圖片
      const imageUrl = item.Picture?.PictureUrl1 || './image/noimage.png'; // 預設圖片路徑建議改回 local 檔案
       // 處理網址
      const websiteUrl = item.WebsiteUrl || '';
      const linkText = websiteUrl ? '查看網站' : '無網站';
      const linkHref = websiteUrl ? websiteUrl : '#';
      // 若無網址，則改為不可點擊的按鈕樣式
      const linkClass = websiteUrl ? 'link-btn' : 'link-btn disabled';
      const linkTarget = websiteUrl ? '_blank' : '_self';

      // 處理地址和電話
      const address = item.Address || '無數據';
      const phone = item.Phone || '無數據';
      const description = item.Description || '無提供介紹。';
      
      // 截斷長描述
      const shortDescription = description.length > 50 ? description.substring(0, 50) + '...' : description;

      str += `
        <div class="col animate__animated animate__fadeIn">
          <div class="card h-100">
            <img src="${imageUrl}" class="rounded card-img-top card-img-fixed" alt="${item.Picture?.PictureDescription1 || item.HotelName}">
          <div class="card-body">
              <h5 class="card-title">${item.HotelName}</h5>
              <p class="card-text description">${shortDescription}</p> 
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">地址: ${address}</li>
              <li class="list-group-item">電話: ${phone}</li>
            </ul>
          <div class="card-footer d-flex justify-content-end">
              <a href="${linkHref}" target="${linkTarget}" class="${linkClass}">${linkText}</a>
            </div>
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
      list.innerHTML = `<p class="error text-center">**目前查詢人數過多，請稍後再試。**</p>`; // 429 錯誤訊息
    } else {
      // 其他錯誤
      list.innerHTML = `<p class="error text-center">**載入資料失敗。請稍後再試。**</p>`;
    }
  });
});
})




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
