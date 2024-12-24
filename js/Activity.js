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
  const url = `https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity/${mappedCity}?$top=${limitNum}&$format=JSON`;

  axios.get(url, {
    headers: getAuthorizationHeader()
  })
  .then(function (response) {
    const thisData = response.data;
    let str = "";

    thisData.forEach(item => {
      // 設定圖片 URL，如果缺少則使用預設圖片
      const imageUrl = item.Picture?.PictureUrl1 || './image/noimage.png';

      str += `
        <div class="info d-flex flex-column d-sm-flex flex-sm-row animate__animated animate__fadeIn">
          <div class="detailImg justify-content-sm-center">
            <img src="${imageUrl}" alt="${item.Picture?.PictureDescription1 || 'No image available'}">
          </div>
          <div class="text">
            <p class="name">${item.ActivityName}</p>
            <div class="description">${item.Description || 'No description available.'}</div>
            <div class="location"><strong>Location:</strong> ${item.Location || 'No location provided.'}</div>
            <div class="phone"><strong>Phone:</strong> ${item.Phone || 'No phone available.'}</div>
            <div class="time">
              <strong>Start:</strong> ${item.StartTime || 'No start time available.'}<br>
              <strong>End:</strong> ${item.EndTime || 'No end time available.'}
            </div>
            <div class="organizer"><strong>Organizer:</strong> ${item.Organizer || 'No organizer information.'}</div>
            <div class="page">
              <a class="d-flex justify-content-end" href="${item.WebsiteUrl || '#'}" target="_blank">Website</a>
            </div>
          </div>
        </div>
      `;
    });

    list.innerHTML = str;
  })
  .catch(function (error) {
    console.error(error);
    list.innerHTML = `<p class="error">Failed to fetch data. Please try again later.</p>`;
  });
});



function getAuthorizationHeader() {
  let AppID = '3899ebde142c48fcb453057b582cf452';
  let AppKey = 'n1BrwKNLtEeJEa2UzxakmCbyE4M';

  //  填入自己 ID、KEY 結束
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