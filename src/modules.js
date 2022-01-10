// API 驗證
import jsSHA from "jssha/dist/sha1";
import axios from "axios";
const getAuthHeader = () => {
  // const AppID = process.env.VUE_APP_AppID;
  // const AppKey = process.env.VUE_APP_AppKey;
  // const AppID = '1ca772b34d0e4674a447570254e17c7f';
  // const AppKey = 'MsAueFPxwHKTwi9X166g2T9N4f0';
    // var AppID = '1ca772b34d0e4674a447570254e17c7f';
    // var AppKey = 'MsAueFPxwHKTwi9X166g2T9N4f0';

  var AppID = "87115fa4197645d591dc6280a3be89a0";
  var AppKey = "17xoWssRJ7HDiACPh89qKLE-NXs";

  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  var HMAC = ShaObj.getHMAC("B64");
  var Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';

  return {
    Authorization: Authorization,
    "X-Date": GMTString,
  }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
};
// const catchNum = 18; // 每頁顯示筆數
// mode => ScenicSpot/Restaurant/Hotel/Activity
// $count=true 查看 API 剩餘次數

// 抓取 景點/餐飲/旅宿/活動 相關資料
const getTravelInfo = (mode, city, page = 1, catchNum = 18, keyword = null) => {
  city = city === "Taiwan" ? "" : city;
  let url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${mode}/${city}?`;
  url += `$top=${catchNum}&$skip=${(page - 1) * catchNum}&$format=JSON`;
  // url += `&$select=ID,Name,Address,Picture`;
  if (mode === "ScenicSpot") url += ",Class1,Class2,Class3,OpenTime,TicketInfo";
  if (mode === "Restaurant") url += ",Class,OpenTime,Phone";
  if (mode === "Hotel") url += ",Class";
  if (mode === "Activity") url += ",Class1,Class2";
  url += `&$filter=Picture/PictureUrl1 ne null`;
  if (keyword && keyword !== 0) {
    let filter = "";
    keyword.split(",").forEach(k => {
      // filter += ` or contains(Name,'${k}')`;
      filter += ` or contains(Description,'${k}')`;
      filter += ` or contains(Address,'${k}')`;
      if (mode === "Restaurant" || mode === "Hotel")
        filter += ` or contains(Class,'${k}')`;
      if (mode === "ScenicSpot" || mode === "Activity")
        filter += ` or contains(Class1,'${k}') or contains(Class2,'${k}')`;
      if (mode === "ScenicSpot") filter += ` or contains(Class3,'${k}')`;
    });
    filter = filter.replace(" or ", "");
    url += ` and (${filter})`;
  }
  return axios.get(url, { headers: getAuthHeader() }).then(res => res.data);
};

// 抓取 景點/餐飲/旅宿/活動 鄰近相關資料
const getNearbyInfo = (mode, lat, lon, page = 1) => {
  let url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${mode}?`;
  url += `$top=${catchNum}&$skip=${(page - 1) * catchNum}&$format=JSON`;
  // url += `&$select=ID,Name,Address,Picture`;
  if (mode === "ScenicSpot") url += ",Class1,Class2,Class3,OpenTime,TicketInfo";
  if (mode === "Restaurant") url += ",Class,OpenTime";
  if (mode === "Hotel") url += ",Class";
  if (mode === "Activity") url += ",Class1,Class2";
  url += `&$spatialFilter=nearby(${lat},${lon},50000)`;
  url += `&$filter=Picture/PictureUrl1 ne null`;
  return fetch(url, { headers: getAuthHeader() }).then(res => res.json());
};

// 取得單筆資料
const getDetail = ID => {
  let url = "https://ptx.transportdata.tw/MOTC/v2/Tourism/";
  url += `${getMode(ID)}/?$filter= contains(${getMode(ID)}ID,'${ID}')&$format=JSON`;
  return fetch(url, { headers: getAuthHeader() })
    .then((res) => res.json())
    .then((res) => {
      return res[0];
    });
};

// 偵測顯示模式;
const getMode = (ID) => {
  const tag = ID.split("_")[0];
  if (tag === "C1") return  "ScenicSpot";
  if (tag === "C2") return  "Activity" ;
  if (tag === "C3") return "Restaurant" ;
  if (tag === "C4") return  "Hotel";
};

// 資料篩選功能
const dataFilter = (arr, count = 4) => {
  return new Promise(resolve => {
    const result = [];
    for (let i = 0; i < count; i++) {
      if (!arr.length) return;
      const idx = Math.floor(Math.random() * arr.length);
      result.push(arr[idx]);
      arr.splice(idx, 1);
    }
    resolve(result);
  });
};

//  整理雜亂資料
const dataRegular = arr => {
  return new Promise(resolve => {
    arr.forEach(item => {
      if (item.StartTime) item.StartTime = item.StartTime.split("T")[0];
      if (item.EndTime) item.EndTime = item.EndTime.split("T")[0];
      if (item.StartTime === item.EndTime) item.Date = item.EndTime;
    });
    resolve(arr);
  });
};

export {
  getTravelInfo,
  getNearbyInfo,
  getDetail,
  getMode,
  dataFilter,
  dataRegular
};
