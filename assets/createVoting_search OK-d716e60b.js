import"./main-5947151f.js";import{a as g}from"./axios-3a76d256.js";const u="https://teatimeapi-test.onrender.com";moment().format("YYYY/MM/DD");let i={category:"全部",sort:"",search:""};const S={newestStore:"&_sort=id&_order=desc",bestStore:"&_sort=stars&_order=desc",worstStore:"&_sort=stars&_order=asc"};function b(e,t,n){let o="",s="",a="";e!=="全部"&&e&&(o=`category=${e}`),t&&(s=t),n&&(a=`&storeName_like=${n}`);let c=`${u}/restaurants?${o}${s}${a}`;C(c)}b();const k=document.querySelectorAll(".btnSortStore");k.forEach(e=>{e.addEventListener("click",function(){const t=this.getAttribute("data-sort-value");m("sort",t)})});const D=document.querySelectorAll(".btnCategoryStore");D.forEach(e=>{e.addEventListener("click",function(){const t=this.getAttribute("data-category-value");m("category",t)})});function m(e,t){switch(e){case"category":i[e]=t;break;case"search":i[e]=t.trim();break;default:i[e]=S[t];break}b(i.category,i.sort,i.search)}function C(e){$(function(){(function(t){let n=$("#pagination"+t);$.ajax({url:e,success:function(o){w(o,n)},error:function(o){console.error(o)}})})("Pages")})}function w(e,t){t.pagination({dataSource:e,totalNumber:e.length,pageSize:8,showPageNumbers:!0,showPrevious:!0,showNext:!0,callback:function(n,o){I(n),x()}})}function I(e){const t={飲料:"icon-park-outline:drink",速食:"mdi:food-outline",素食:"tabler:leaf",小吃:"ph:bowl-food",甜點:"material-symbols:icecream-outline-rounded",咖啡:"icon-park-outline:tea-drink"};let n='<ul class="row row-cols-2 gap-12 gap-xxl-24 findStore-ul">';$.each(e,function(o,s){const a=r.hasOwnProperty(s.UID);n+=`<li class="findStore-img position-relative" style="background-image: url(${s.storeCover});"> 
                        <!-- select-store-checkbox --> 
                        <label class="select-store">
                            <input type="checkbox" class="position-absolute select-store-checkbox" name="selectStoreCheck${s.UID}" data-uid="${s.UID}" ${a?"checked":""}>
                            <span class="position-absolute cursor-pointer select-store-checkmark"></span></label>
                            <a href="store-order.html?UID=${s.UID}" class="d-flex justify-content-center w-100 h-100 ">
                                <!-- restaurant info -->
                                <div class="position-absolute d-flex justify-content-between findStore-card">
                                    <div class="d-flex flex-column justify-content-center overflow-hidden">
                                        <p class="mb-8 fs-md-20 fs-16 lh-sm text-white" style="white-space:nowrap">${s.storeName}</p>
                                        <!-- 星評 -->
                                        <div class="d-flex ">
                                            ${L(s.stars)}
                                        </div>
                                    </div>
                                    <!-- restaurant sort -->
                                    <iconify-icon icon="${t[s.category]}"
                                        style="color: #8b8b8a;" width="24" height="24"
                                        class="ms-4 findStore-card-img"></iconify-icon>
                                </div>
                            </a>
                        </li>`}),n+="</ul>",$("#paginationContainer").html(n)}function L(e){const n={isGoodStar:`<iconify-icon icon="ic:round-star" style="color: #ffd43a;"
                                                width="16"></iconify-icon>`,notGoodStar:`<iconify-icon icon="ic:round-star" style="color: #c2c1bd;"
                                                width="16"></iconify-icon>`};return n.isGoodStar.repeat(e)+n.notGoodStar.repeat(5-e)}const r={};function x(){const e=document.querySelectorAll("input[type='checkbox']"),t=3;e.forEach(n=>{n.addEventListener("change",function(){const o=this.getAttribute("data-uid"),s=r.hasOwnProperty(o);Object.keys(r).length===t&&!s?this.checked=!1:s?(delete r[o],f()):g.get(`${u}/restaurants?UID=${o}`).then(function(c){r[o]=T(c.data[0]),f()}).catch(c=>{console.log("錯誤:",c)})})})}function T(e){return{UID:e.UID,restaurantId:e.id,restaurantName:e.storeName,restaurantCover:e.storeCover,summary:e.summary,minGroupSize:e.minGroupSize}}function E(){const e=document.querySelector(".checkedStoreContainer");Object.keys(r).length>0?e.classList.remove("d-none"):e.classList.add("d-none")}function f(){const e=document.querySelector(".showCheckedList");let t="";Object.values(r).forEach(n=>{t+=`<li class="d-flex align-items-center py-10 px-20 py-md-12 px-md-24 gap-8 rounded-pill bg-gray-04">
                                <span class="fs-12 fs-md-16 fw-medium">${n.restaurantName}</span>
                                <button type="button" class="btn-close cancelCheckedStore" data-uid=${n.UID}></button>
                            </li>`}),e.innerHTML=t,N(),E(),q()}function N(){document.querySelectorAll(".cancelCheckedStore").forEach(t=>{t.addEventListener("click",function(){const n=this.getAttribute("data-uid"),o=document.querySelector(`input[data-uid=${n}]`);o.checked=!1,delete r[n],f()})})}function q(){const e=document.querySelector(".checkCheckedStoreAbove"),t=document.querySelector(".checkCheckedStoreBelow");Object.keys(r).length>1?(e.classList.add("d-sm-block"),t.classList.remove("d-none"),t.classList.add("d-block","d-sm-none")):(e.classList.remove("d-sm-block"),t.classList.add("d-none"))}const y=document.getElementById("modal-createVoting"),j=y.querySelector(".modal-title"),l=document.getElementById("eventDateTime"),d=document.getElementById("deadlineDateTime"),v=document.getElementById("votingInvitees"),A=document.querySelector(".votingCard"),U=document.querySelector(".btnCreateVoting");y.addEventListener("show.bs.modal",function(e){const t=Object.values(r);V(t),Y(t)});function V(e){const t=e.map(h=>h.restaurantName);j.textContent=t.join("、");const n=l._flatpickr,o=d._flatpickr,s=sessionStorage.getItem("eventDateTime"),a=sessionStorage.getItem("deadlineDateTime"),c=sessionStorage.getItem("votingInvitees");n.setDate(s,!0),o.setDate(a,!0),v.value=c}function Y(e){let t="";e.forEach(n=>{t+=`
                            <li class="d-flex gap-12 p-12 mb-12 border border-brand-03 border-radius-40401616">
                                <img class="border-radius-32321616 votingcard-photo" src="${n.restaurantCover}">
                                <div>
                                <h4 class="mb-8 fs-16 fs-md-20 lh-sm text-brand-03">${n.restaurantName}</h4>
                                <p class="mb-8 mb-md-16 text-gray-02 trippleline-ellipsis">${n.summary}</p>
                                <div>
                                <span class="me-16 text-gray-02 text-nowrap">成團目標</span>
                                <span class="text-gray-02">${n.minGroupSize} 人</span>
                                </div>                                 
                            </li>`}),A.innerHTML=t}U.addEventListener("click",M);async function M(){if(B()){$("#modal-createdSuccess").modal("hide"),$("#modal-createVoting").modal("show");return}try{const t=await _();H(t),$("#modal-createdSuccess").modal("show")}catch(t){console.log("錯誤:",t)}}async function _(){try{const t=(await g.get(`${u}/votings`)).data,o=t[t.length-1].UID.match(/(\D+)(\d+)/);if(o){const s=o[1];let a=parseInt(o[2]);return a++,s+a.toString().padStart(o[2].length,"0")}}catch(e){throw console.log("錯誤:",e),e}}function H(e){Object.values(r).map(n=>{const o={...n};delete o.restaurantCover,delete o.summary,delete o.minGroupSize,o.UID=e,o.deadlineDateTime=d.value,o.eventDateTime=l.value,o.initiator="黃莉玲",o.invitees=v.value==="has-invitees"?"黃莉玲":"",o.currentVoters=[],P(o)})}function P(e){g.post(`${u}/votings`,e).then(function(t){console.log("success")}).catch(t=>{console.log("錯誤:",t)})}function B(){let e=!1;const t=document.querySelector(".eventDateTimeAlert"),n=document.querySelector(".deadlineDateTimeAlert"),o=document.querySelector(".votingInviteesAlert");let s="",a="";const c=l.value.trim(),h=d.value.trim();return c&&(s=moment(l.value,"YYYY/MM/DD HH:mm")),h&&(a=moment(d.value,"YYYY/MM/DD HH:mm")),s===""?(t.classList.remove("d-none"),e=!0):t.classList.add("d-none"),a===""?(n.classList.remove("d-none"),n.textContent="必填",e=!0):n.classList.add("d-none"),v.value===""?(o.classList.remove("d-none"),e=!0):o.classList.add("d-none"),s&&a&&(s.diff(a,"hours")<24?(n.classList.remove("d-none"),n.textContent="截止時間須至少提前於享用日期 24 時",e=!0):n.classList.add("d-none")),e}const G=document.getElementById("modal-createdSuccess");G.addEventListener("show.bs.modal",function(e){const t=l.value,n=d.value;document.querySelector(".eventDateTime-Date").textContent=t.substring(5,10),document.querySelector(".eventDateTime-Time").textContent=t.split(" ")[1],document.querySelector(".deadlineDateTime-Date").textContent=n.substring(5,10),document.querySelector(".deadlineDateTime-Time").textContent=n.split(" ")[1]});const O=document.querySelector(".btnLinkToCalendar");O.addEventListener("click",function(){window.location.href="./calendar.html"});const p=new autoComplete({data:{src:async e=>{try{return await(await fetch(`${u}/restaurants`)).json()}catch(t){return t}},keys:["storeName"]},searchEngine:"loose",resultItem:{highlight:!0},resultsList:{element:(e,t)=>{if(!t.results.length){const n=document.createElement("div");n.setAttribute("class","no_result px-8"),n.innerHTML=`<span>Found No Results for "${t.query}"</span>`,e.prepend(n)}},noResults:!0},events:{input:{selection:e=>{const t=e.detail.selection.value;p.input.value=t.storeName,m("search",t.storeName)},keydown:e=>{if(e.keyCode===13){const t=p.input.value;m("search",t)}}}}});