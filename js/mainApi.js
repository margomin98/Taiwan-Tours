// 地點名稱映射 (從您的 api.js 複製過來，不變)
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

const generateCityOptions = () => {
    let optionsStr = "";
    
    // 遍歷 cityMapping 物件，生成 <option> 標籤
    // 這裡我們直接使用物件的 key (中文城市名稱) 作為選項內容
    for (const city in cityMapping) {
        
        optionsStr += `<option>${city}</option>`;
    }
    return optionsStr;
};


// 步驟 2: 填充城市選項到所有的下拉選單
document.addEventListener('DOMContentLoaded', () => {
    const optionsHTML = generateCityOptions();
    
    // 獲取所有具有 'keyword' class 的下拉選單
    const keywordSelects = document.querySelectorAll('.keyword');

    keywordSelects.forEach(select => {
        // 填充生成的選項 HTML
        select.innerHTML = optionsHTML; 
    });
});


// API 路徑映射
const apiPathMapping = {
    'Spot': 'Tourism/ScenicSpot',
    'Restaurant': 'Tourism/Restaurant',
    'Hotel': 'Tourism/Hotel',
    'Activity': 'Tourism/Activity'
};

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

// 模擬假資料的函數 (您可以根據需要調整，這裡僅用於演示)
// function mockApiCall(type, mappedCity, limitNum) {
//     const defaultImg = "https://fakeimg.pl/400x300/CCCCCC/909090/?text=假數據";
    
//     // 完整的假資料陣列
//     const allMockData = {
//         'Hotel': [
//             { "HotelName": "臺北君悅酒店 (Taipei)", "Description": "五星級飯店，坐落於信義區，緊鄰台北 101，地理位置優越，提供一流的住宿與服務。是商務和休閒旅客的理想選擇。", "Picture": { "PictureUrl1": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/337871236.jpg?k=80873e569cc8b6c96878bb9540428bf38df4af4f991b8ce78ec1ee9410dafd18&o=&hp=1" }, "Address": "臺北市信義區松壽路 2 號", "Phone": "02-27201234", "WebsiteUrl": "https://www.hyatt.com/taipei" },
//             { "HotelName": "臺南晶英酒店", "Description": "結合文化與藝術的設計酒店，位於台南市中心，提供精緻的餐飲體驗。", "Picture": { "PictureUrl1": "https://www.orchidhotel.com/static/website/img/hotels/panchgani/homepage_slider/homepage_slider.webp" }, "Address": "臺南市中西區和意路 1 號", "Phone": "06-3903000", "WebsiteUrl": "https://www.silksplace-tainan.com.tw/" },
//             { "HotelName": "花蓮理想大地渡假飯店", "Description": "依山傍水，風景優美，適合全家大小的豪華渡假村。", "Picture": { "PictureUrl1": defaultImg }, "Address": "花蓮縣壽豐鄉理想路 1 號", "Phone": "03-8656688", "WebsiteUrl": "" }, // 測試無網址
//             { "HotelName": "日月潭涵碧樓", "Description": "靜謐奢華的設計，享受日月潭湖光山色。", "Picture": { "PictureUrl1": null }, "Address": "", "Phone": "049-2856888", "WebsiteUrl": "https://www.thelalu.com.tw/" }, // 測試無圖片、無地址
//             { "HotelName": "高雄漢來大飯店", "Description": "位於高雄市中心，可俯瞰高雄港海景，是重要的商務地標。", "Picture": { "PictureUrl1": "https://fakeimg.pl/400x300/4286f4/EFEFEF/?text=高雄漢來" }, "Address": "高雄市前金區成功一路 266 號", "Phone": "", "WebsiteUrl": "https://www.grand-hilai.com.tw/" } // 測試無電話
//         ],
//         'Restaurant': [
//             { "RestaurantName": "鼎泰豐 (信義店)", "Description": "米其林推薦小籠包，世界知名的台灣美食代表。", "Picture": { "PictureUrl1": "https://fakeimg.pl/400x300/4CAF50/EFEFEF/?text=鼎泰豐" }, "Address": "臺北市信義路二段 194 號", "Phone": "02-23218928", "WebsiteUrl": "https://www.dintaifung.com.tw/" },
//             { "RestaurantName": "欣葉台菜", "Description": "經典台灣味，提供最道地的家常菜。", "Picture": { "PictureUrl1": null }, "Address": "臺北市中山區雙城街 34 號", "Phone": "02-25963255", "WebsiteUrl": "" }, // 測試無圖片、無網址
//             { "RestaurantName": "度小月擔仔麵", "Description": "百年傳承的台南小吃，肉燥香氣濃郁，是必吃美食。", "Picture": { "PictureUrl1": "https://fakeimg.pl/400x300/FF5722/EFEFEF/?text=度小月" }, "Address": "臺南市中西區中正路 101 號", "Phone": "", "WebsiteUrl": "http://www.slackseason.com.tw/" } // 測試無電話
//         ],
//         'Spot': [
//             { "Name": "臺北 101 景觀台", "Description": "世界級的高樓，俯瞰整個大台北都會區的絕佳地點。", "Picture": { "PictureUrl1": "https://fakeimg.pl/400x300/00BCD4/EFEFEF/?text=台北101" }, "Address": "臺北市信義區信義路五段 7 號", "Phone": "02-81018898", "WebsiteUrl": "https://www.taipei-101.com.tw/" },
//             { "Name": "阿里山國家森林遊樂區", "Description": "以日出、雲海、晚霞、森林及高山鐵路聞名於世。", "Picture": { "PictureUrl1": null }, "Address": "嘉義縣阿里山鄉中正村 59 號", "Phone": "05-2679917", "WebsiteUrl": "https://www.ali-nsa.net/" }, // 測試無圖片
//             { "Name": "奇美博物館", "Description": "收藏豐富的西洋藝術品和樂器，建築風格宏偉。", "Picture": { "PictureUrl1": defaultImg }, "Address": "", "Phone": "06-2660808", "WebsiteUrl": "" } // 測試無網址、無地址
//         ],
//         'Activity': [
//             { "Name": "太魯閣峽谷健行", "Description": "欣賞鬼斧神工的峽谷地貌，體驗大自然的壯麗。", "Picture": { "PictureUrl1": "https://fakeimg.pl/400x300/9C27B0/EFEFEF/?text=太魯閣" }, "Address": "花蓮縣秀林鄉富世 291 號", "Phone": "03-8621100", "WebsiteUrl": "https://www.taroko.gov.tw/" },
//             { "Name": "夜市美食探索之旅", "Description": "探索台灣特有的夜市文化，品嚐各種街頭小吃和特色美食。", "Picture": { "PictureUrl1": "https://fakeimg.pl/400x300/FFC107/EFEFEF/?text=夜市美食" }, "Address": "各地夜市", "Phone": "無", "WebsiteUrl": "https://tour.ntpc.gov.tw/" },
//             { "Name": "平溪放天燈", "Description": "在寧靜的夜空中，寫下心願，放飛天燈，祈求好運。", "Picture": { "PictureUrl1": null }, "Address": "新北市平溪區靜安路二段 141 號", "Phone": "無數據", "WebsiteUrl": "" } // 測試無圖片、無網址
//         ]
//     };
    
//     // 根據 type 取得對應的資料
//     const mockData = allMockData[type] || [];

//     return new Promise((resolve) => {
//         setTimeout(() => {
//             // 根據 limitNum 限制回傳數量
//             const data = mockData.slice(0, limitNum === '100' ? mockData.length : parseInt(limitNum));
//             resolve({ data: data });
//         }, 500);
//     });
// }

// 渲染 Card 的函式 (根據類型取得對應的 Name 欄位)
function renderData(thisData, listElement, type) {
    let str = "";
    
    // 檢查是否無資料
    if (thisData.length === 0) {
        listElement.innerHTML = `<p class="no-data text-center w-100">**目前查無資料。**</p>`;
        return;
    }

    thisData.forEach(item => {
        // 根據類型決定名稱欄位
        const itemName = item[`${type}Name`] || item.Name || '未知名稱';
        
        // 處理圖片、網址、地址、電話、描述的預設值和處理邏輯
        const imageUrl = item.Picture?.PictureUrl1 || './image/noimage.png';
        const websiteUrl = item.WebsiteUrl || '';
        const linkText = websiteUrl ? '查看網站' : '無網站';
        const linkHref = websiteUrl ? websiteUrl : '#';
        const linkClass = websiteUrl ? 'link-btn' : 'link-btn disabled';
        const linkTarget = websiteUrl ? '_blank' : '_self';
        const address = item.Address || '無數據';
        const phone = item.Phone || '無數據';
        const description = item.Description || '無提供介紹。';
        const shortDescription = description.length > 50 ? description.substring(0, 50) + '...' : description;

        str += `
            <div class="col animate__animated animate__fadeIn">
                <div class="card h-100">
                    <img src="${imageUrl}" class="card-img-top card-img-fixed" alt="${item.Picture?.PictureDescription1 || itemName}">
                    <div class="card-body">
                        <h5 class="card-title">${itemName}</h5>
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

    listElement.innerHTML = str;
}


// 處理 API 呼叫和錯誤邏輯
function fetchData(type, mappedCity, limitNum, listElement) {
    if (!mappedCity) {
        listElement.innerHTML = `<p class="error text-center w-100">**請選擇有效的城市名稱！**</p>`;
        return;
    }

    listElement.innerHTML = `<p class="loading text-center w-100">**資料載入中...**</p>`; 
    
    const apiSegment = apiPathMapping[type];
    
    // **** 啟用實際 API 呼叫 ****
    const url = `https://tdx.transportdata.tw/api/basic/v2/${apiSegment}/${mappedCity}?$top=${limitNum}&$format=JSON`;
    const apiPromise = axios.get(url, { headers: getAuthorizationHeader() });

    // 測試時使用假資料，請在實際部署時切換回 apiPromise (此處為註解)
    // const apiPromise = mockApiCall(type, mappedCity, limitNum);


    apiPromise
    .then(function (response) {
        renderData(response.data, listElement, type);
    })
    .catch(function (error) {
        console.error(error);
        
        // 檢查錯誤回應是否為 429 狀態碼 (Too Many Requests)
        if (error.response && error.response.status === 429) {
            listElement.innerHTML = `<p class="error text-center w-100">**目前查詢人數過多，請稍後再試。**</p>`;
        } else {
            // 其他錯誤
            listElement.innerHTML = `<p class="error text-center w-100">**載入資料失敗。請稍後再試。**</p>`;
        }
    });
}

// 監聽所有 Search 按鈕
document.querySelectorAll('.send').forEach(button => {
    button.addEventListener('click', function (e) {
        const type = e.currentTarget.dataset.target; // 取得點擊按鈕所在的 Tab 類型
        
        // 取得該類型 Tab 內的輸入框值
        const container = document.getElementById(`${type.toLowerCase()}-pane`);
        const keywordSelect = container.querySelector('.keyword');
        const limitSelect = container.querySelector('.limit');
        const listElement = document.getElementById(`${type}-list`);
        
        const limitNum = limitSelect.value;
        const keywordTxt = keywordSelect.value;
        const mappedCity = cityMapping[keywordTxt]; 
        
        // 檢查限制選擇
        if (limitSelect.selectedIndex === 0) {
            alert("請選擇呈現數量！");
            return;
        }

        fetchData(type, mappedCity, limitNum, listElement);
    });
});

// 可選：當 Tab 被切換時，自動觸發一次查詢 (或清空列表)
document.getElementById('mainTabContent').addEventListener('shown.bs.tab', function (e) {
    const newTabId = e.target.getAttribute('data-bs-target'); // 例如: #restaurant-pane
    const newType = e.target.dataset.type; // 例如: Restaurant
    
    const listElement = document.getElementById(`${newType}-list`);
    
    // 如果 Tab 內容為空，可以考慮自動執行一次查詢
    if (listElement.innerHTML.trim() === '') {
        // 這裡可以選擇自動調用一次查詢，使用預設值
        // 為了避免不必要的 API 呼叫，建議手動點擊 Search
        // listElement.innerHTML = `<p class="info text-center w-100">請點擊 **Search** 按鈕開始查詢。</p>`;
    }
});