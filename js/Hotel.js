const keyword = document.querySelector('.keyword');
const limit = document.querySelector('.limit');
const send = document.querySelector('.send');
const list = document.querySelector('.list');
send.addEventListener('click', function (e) {
  const limitNum = limit.value;
  const keywordTxt = keyword.value;
  axios.get(
      `https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel?%24filter=contains(Address,'${keywordTxt}') 
and Picture/PictureUrl1 ne null and WebsiteUrl ne null
&
$top=${limitNum}&$format=JSON
`, {
        headers: getAuthorizationHeader()
      }
    )
    .then(function (response) {
      const thisData = response.data;
      let str = "";
      thisData.forEach(item => {
        str += `   <div class="info d-flex flex-column d-sm-flex flex-sm-row animate__animated animate__fadeIn">
      <div class="detailImg">
     <img src=${item.Picture.PictureUrl1} >
    </div>
     <div class="text">
    <p class="name ">${item.HotelName} </p>
  <div class="description">${item.Description}</div>
                   <p class="phone">Phone: +${item.Phone}</p>
                   <div class="page">
                   <a class="d-flex justify-content-end" href="${item.WebsiteUrl}">Website</a>
                </div>
                   </div>               
              
                   </div>
       
        `;
      })
      list.innerHTML = str;
    })
    .catch(function (error) {
      console.log(error);
    });
})




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