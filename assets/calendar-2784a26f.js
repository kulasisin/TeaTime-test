import{b as x}from"./main-45b4769e.js";import{i as b}from"./nav-d13f13de.js";import{a as p}from"./axios-3a76d256.js";import{i as D}from"./isPastEvent-33573b9d.js";const g="https://teatimeapi-test.onrender.com",v="U004",T=moment().format("YYYY/MM/DD");let c=[];const i={};function I(){const e=p.get(`${g}/groupings?_expand=restaurant`),s=p.get(`${g}/votings?_expand=restaurant`);Promise.all([e,s]).then(function(n){c=c.concat(n[0].data),c=c.concat(n[1].data),V()}).catch(function(n){console.error(n)})}I();function V(){c.forEach(e=>{i[e.UID]||(i[e.UID]={UID:e.UID,restaurantId:e.restaurantId,deadlineDateTime:e.deadlineDateTime,eventDateTime:e.eventDateTime,initiator:e.initiator,invitees:e.invitees,restaurantList:e.UID.startsWith("V")?[]:[e.restaurantName],restaurantPhoto:e.restaurant.storeCover,minGroupSize:e.restaurant.minGroupSize,currentGroupCondition:e.currentGroupCondition}),e.UID.startsWith("V")&&(i[e.UID].restaurantList.push(e.restaurantName),delete i[e.UID].currentGroupCondition,delete i[e.UID].minGroupSize)}),S(),h()}function S(){const e=[];for(const s in i)if(i.hasOwnProperty(s)){const n=i[s];e.push({id:n.UID,name:n.restaurantList.join("、"),date:n.deadlineDateTime,type:"event",color:n.UID[0]==="V"?"#F0BD68":"#FD909F"})}E(e)}function E(e){$("#calendar").evoCalendar({sidebarDisplayDefault:!1,sidebarToggler:!0,eventDisplayDefault:!1,eventListToggler:!1,todayHighlight:!0,calendarEvents:e})}$("#calendar").on("click",function(e){const s=$("#calendar").evoCalendar("getActiveDate"),n=moment(s,"MM/DD/YYYY").format("YYYY/MM/DD");h(n)});const w=document.querySelector(".calendarEvent");function h(e=T){let s="";const a=Object.values(i).filter(t=>t.deadlineDateTime.split(" ")[0]===e);a.length?a.forEach(t=>{s+=`<li ${t.UID.startsWith("V")?`class="cursor-pointer" data-bs-votingUID=${t.UID} data-bs-toggle="modal" data-bs-target="#modal-VotingModal"`:`data-groupingUID=${t.UID}`}>
                    ${t.UID.startsWith("V")?"":`<a href="store-order.html?UID=${t.UID}">`}
                <div
                  class="position-relative row mx-0 flex-column gy-12 gy-md-16 p-16 p-md-24 pt-56 pb-8 pb-md-16 pt-md-8 border border-brand-03 border-radius-16">
                  <!-- 月曆卡片 title -->
                  <div
                    class="position-absolute d-flex align-items-end top-0 start-0 px-16 px-md-24 w-100 w-sm-75 calendar-title-translateY">
                    <img class="me-12 me-lg-16 calendar-photo border border-2 border-brand-03 bg-white"
                      src=${t.restaurantPhoto} alt="store-logo">
                    <h3 class="fs-20 fs-md-24 fw-medium fw-md-bold lh-sm text-brand-03 doubleline-ellipsis">${t.restaurantList.join("、")}
                    </h3>
                  </div>
                  <!-- 卡片活動類別 -->
                  ${U(t.deadlineDateTime,t.UID)}
                  <!-- 月曆卡片內容 -->
                  <ul class="row flex-column flex-xl-row g-4 g-md-8 p-0 fs-16 fs-md-20">
                    <li class="col col-xl-7">
                      <ul class="d-flex flex-column gap-4 gap-md-8">
                        <li>
                          <span class="me-16">享用日期</span>
                          <span class="me-8">${d(t.eventDateTime)[0]}</span>
                          <span>${d(t.eventDateTime)[1]}</span>
                        </li>
                        <li>
                          <span class="me-16">截止時間</span>
                          <span class="me-8">${d(t.deadlineDateTime)[0]}</span>
                          <span>${d(t.deadlineDateTime)[1]}</span>
                        </li>
                      </ul>
                    </li>
                    ${t.UID.startsWith("V")?"":`<li class="d-flex align-items-center order-1 order-md-end">
                      <span class="me-16">成團目標</span>                      
                      <div class="ts-progress is-tiny bg-gray-04" style="width: 120px;">
                        <div class="bar bg-brand-02" style="--value: ${m(t.minGroupSize,t.currentGroupCondition)}">
                            <div class="text-white">${m(t.minGroupSize,t.currentGroupCondition)>100?100:m(t.minGroupSize,t.currentGroupCondition)}%</div>
                        </div>
                    </div></li>`}
                    <li class="col col-xl-5">
                      <ul class="d-flex flex-column gap-4 gap-md-8">
                        <li>
                          <span class="me-16">付款人</span>
                          <span class="me-8">${t.invitees?t.invitees:"無"}</span>
                        </li>
                        <li>
                          <span class="me-16">發起人</span>
                          <span class="me-8">${t.initiator}</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                ${t.UID.startsWith("V")?"":"</a>"}
              </li>`}):s+='<li class="fs-16 fs-md-20 text-center">目前沒有下午茶活動</li>',w.innerHTML=s}function U(e,s){let n;return D(e)?n=`<div class="align-self-end py-4 py-md-8 order-last order-md-first rounded-pill text-center btn-disable" style="width:110px;">${s.startsWith("V")?"投票":"開團"}已結束</div>`:n=`<div class="align-self-end py-4 py-md-8 order-last order-md-first ${s.startsWith("V")?"bg-brand-01":"bg-brand-02"} rounded-pill text-white text-center" style="width:80px">${s.startsWith("V")?"投票中":"開團中"}</div>`,n}function m(e,s){return Math.floor(e/s*100)}const l=document.getElementById("modal-VotingModal");function y(e){let s=[];p.get(`${g}/votings?UID=${e}&_expand=restaurant`).then(function(n){s=n.data,C(s)}).catch(function(n){console.error(n)})}l.addEventListener("show.bs.modal",function(e){const n=e.relatedTarget.getAttribute("data-bs-votingUID");L(n),y(n)});function L(e){const s=l.querySelector(".modal-title");s.textContent=i[e].restaurantList.join("、");const n=l.querySelector(".deadlineDateTime"),a=l.querySelector(".eventDateTime"),t=l.querySelector(".initiator"),o=l.querySelector(".invitees"),r=i[e];n.innerHTML=`<span class="me-16">截止日期</span>
                        <span class="me-8 ">${d(r.deadlineDateTime)[0]}</span>
                        <span>${d(r.deadlineDateTime)[1]}</span>`,a.innerHTML=`<span class="me-16">享用時間</span>
                          <span class="me-8">${d(r.eventDateTime)[0]}</span>
                          <span>${d(r.eventDateTime)[1]}</span>`,t.textContent=r.initiator,o.textContent=r.invitees===""?"無":r.invitees}function d(e){const s=e.substring(5,10),n=e.split(" ")[1];return[s,n]}function C(e){const s=l.querySelector(".votingCard"),n=D(e[0].deadlineDateTime);let a="";e.forEach(t=>{const o=t.currentVoters.includes(v),r=t.currentVoters.length,u=t.restaurant.minGroupSize;a+=`
                      <li class="d-flex gap-12 p-12 mb-12 border border-brand-03 border-radius-40401616">
                        <img class="border-radius-32321616 votingcard-photo" src="${t.restaurant.storeCover}">
                        <div class="flex-grow-1 d-flex flex-column">
                          <h4 class="mb-8 fs-16 fs-md-20 lh-sm text-brand-03">${t.restaurantName}</h4>
                          <p class="flex-grow-1 mb-8 mb-md-16 text-gray-02 trippleline-ellipsis">${t.restaurant.summary}</p>
                          <div class="d-flex justify-content-between flex-column flex-lg-row">
                            <div class="d-flex align-items-center mb-8 mb-lg-0 ">
                              <span class="me-4 me-lg-16 text-gray-02 text-nowrap">成團目標</span>
                              <div class="ts-progress is-tiny bg-gray-04 voting-progress" data-num=${t.id}>
                                <div class="bar bg-brand-02" style="--value: ${m(r,u)}">
                                  <div class="text-white">${m(r,u)>100?100:m(r,u)}%</div>
                                </div>
                              </div>
                            </div>                                                    
                              ${M(t.id,n,o)}
                          </div>
                      </li>`}),s.innerHTML=a,Y()}function M(e,s,n){return s?'<button class="py-4 px-16 btn-disable border-0 rounded-pill btnVoteThis" disabled type="button">已結束</button>':b()?`<button
                              class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis ${n?"btn-active-brand-02":""}"
                              type="button" data-num=${e}>${n?"已投票":"投票"}</button>`:`<button
                              class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis"
                              type="button" data-num=${e} data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="請先登入帳號">投票</button>`}function Y(){const e=l.querySelectorAll(".btnVoteThis"),s=document.querySelectorAll('[data-bs-toggle="popover"]');e.forEach(n=>{n.addEventListener("click",function(){if(!b()){[...s].map(t=>{new x.Popover(t)});return}n.classList.contains("btn-active-brand-02")?f(n.dataset.num,"deleteVote"):f(n.dataset.num,"addVote")})})}async function f(e,s){try{const n=document.querySelector(`.ts-progress[data-num="${e}"]`);n.classList.add("is-processing");const a=c.filter(t=>t.UID.startsWith("V")&&t.id==e)[0].currentVoters;if(s==="addVote")a.push(`${v}`);else{const t=a.indexOf(`${v}`);a.splice(t,1)}p.patch(`${g}/votings/${e}`,{currentVoters:a}).then(function(t){y(t.data.UID),n.classList.remove("is-processing")}).catch(function(t){console.error(t.message)})}catch(n){throw console.log("錯誤:",n),n}}const G=document.getElementById("modal-CreateVoting");G.addEventListener("click",()=>{const e=document.getElementById("eventDateTime"),s=document.getElementById("deadlineDateTime"),n=document.getElementById("votingInvitees"),a=e.value.trim(),t=s.value.trim();let o="",r="";a&&(o=moment(e.value,"YYYY/MM/DD HH:mm")),t&&(r=moment(s.value,"YYYY/MM/DD HH:mm")),o&&r&&(o.diff(r,"hours")<24?document.querySelector(".deadlineDateTimeAlert").classList.remove("d-none"):document.querySelector(".deadlineDateTimeAlert").classList.add("d-none")),sessionStorage.setItem("deadlineDateTime",t),sessionStorage.setItem("eventDateTime",a),sessionStorage.setItem("votingInvitees",n.value)});const q=document.querySelector(".btnLinkToCreateVoting");q.addEventListener("click",function(){window.location.href="./createVoting.html"});
