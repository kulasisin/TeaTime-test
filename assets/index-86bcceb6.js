import{b as D}from"./main-5947151f.js";import{i as p,a as b}from"./isLoggedIn-e0d2bb93.js";const f="U004";let l=[];function x(){const e=moment().add(2,"month").format("YYYY/MM"),n=moment().subtract(1,"month").format("YYYY/MM"),t=axios.get(`${_url}/groupings?_expand=restaurant&deadlineDateTime_gte=${n}&deadlineDateTime_lte=${e}`),o=axios.get(`${_url}/votings?_expand=restaurant&deadlineDateTime_gte=${n}&deadlineDateTime_lte=${e}`);Promise.all([t,o]).then(function(s){l=l.concat(s[0].data),l=l.concat(s[1].data),y()}).catch(function(s){console.error(s.message)})}x();const r={};function y(){l.sort((e,n)=>{const t=new Date(e.deadlineDateTime),o=new Date(n.deadlineDateTime);return t-o}),l.forEach(e=>{r[e.UID]||(r[e.UID]={UID:e.UID,restaurantId:e.restaurantId,deadlineDateTime:e.deadlineDateTime,eventDateTime:e.eventDateTime,initiator:e.initiator,invitees:e.invitees,restaurantList:e.UID.startsWith("V")?[]:[e.restaurantName],restaurantPhoto:e.restaurant.storeCover,minGroupSize:e.restaurant.minGroupSize,currentGroupCondition:e.currentGroupCondition}),e.UID.startsWith("V")&&(r[e.UID].restaurantList.push(e.restaurantName),delete r[e.UID].currentGroupCondition,delete r[e.UID].minGroupSize)}),v()}const T=document.querySelectorAll(".btnfilterEvent"),V=document.querySelector(".calendarBlock");T.forEach(e=>{e.addEventListener("click",function(){const n=this.getAttribute("data-event");v(n)})});function v(e="groupings"){const n=Object.values(r).filter(s=>s.UID.startsWith(e[0].toUpperCase())),t=n.filter(s=>{const d=moment(s.deadlineDateTime,"YYYY/MM/DD HH:mm");return moment().isBefore(d)});let o;t.length>=4?o=t.slice(0,4):o=n.slice(n.length-4,n.length),w(o)}function w(e){let n="";e.forEach(t=>{n+=`<div class="col-md-6 col-xl-4 col-xxxl-3">
                <a ${E(t.UID)}
                    class="event-rounded h-100 w-100 d-flex flex-lg-column p-12 p-lg-16 align-items-center justify-content-center bg-white border-hover-line"
                    data-aos="flip-left" data-aos="flip-left" data-aos-delay="400">
                    <img class="event-pic me-12 me-lg-0 mb-lg-20"
                        src="${t.restaurantPhoto}"
                        alt="calendar-img">
                    <div class="d-flex flex-column justify-content-between w-60 w-lg-100 flex-grow-1">
                        <p class="mb-8 mb-lg-16 fs-20 fs-lg-24 fw-bold lh-sm text-brand-03 single-ellipsis">${t.restaurantList.join("、")}</p>
                        <div class="d-flex justify-content-between align-items-center mb-8 mb-lg-16">
                            <p class="fs-16 fs-lg-20 text-gray-05">${t.UID.startsWith("V")?"投票中":"開團中"}</p>
                            ${I(t.deadlineDateTime)}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="fs-16 fs-lg-20 text-gray-05">請客人</p>
                            <span class="fs-16 fs-lg-20 lh-sm fw-medium">${t.invitees?t.invitees:"無"}</span>
                        </div>
                    </div>
                </a>
            </div>`}),V.innerHTML=n}function I(e){let n;return p(e)?n="<div class='fw-medium lh-sm fs-16 fs-lg-20'>已結束</div>":n=`<div class="d-flex align-items-center ms-8 gap-md-8 gap-4">
                                    <iconify-icon icon="solar:calendar-linear" style="color: #1e1e1e;" width="26"
                                        height="26"></iconify-icon>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${c(e)[0]}</time>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${c(e)[1]}</time>
                                </div>`,n}function E(e){return e.startsWith("V")?`href="#modal-VotingModal" data-bs-toggle="modal" data-bs-votingUID="${e}"`:`href="store-order.html?UID=${e}"`}const a=document.getElementById("modal-VotingModal");function h(e){let n=[];axios.get(`${_url}/votings?UID=${e}&_expand=restaurant`).then(function(t){n=t.data,S(n)}).catch(function(t){console.error(t)})}a.addEventListener("show.bs.modal",function(e){const t=e.relatedTarget.getAttribute("data-bs-votingUID");M(t),h(t)});function M(e){const n=a.querySelector(".modal-title");n.textContent=r[e].restaurantList.join("、");const t=a.querySelector(".deadlineDateTime"),o=a.querySelector(".eventDateTime"),s=a.querySelector(".initiator"),d=a.querySelector(".invitees"),i=r[e];t.innerHTML=`<span class="me-16">截止日期</span>
    <span class="me-8 ">${c(i.deadlineDateTime)[0]}</span>
    <span>${c(i.deadlineDateTime)[1]}</span>`,o.innerHTML=`<span class="me-16">享用時間</span>
    <span class="me-8">${c(i.eventDateTime)[0]}</span>
    <span>${c(i.eventDateTime)[1]}</span>`,s.textContent=i.initiator,d.textContent=i.invitees===""?"無":i.invitees}function c(e){const n=e.substring(5,10),t=e.split(" ")[1];return[n,t]}function S(e){const n=a.querySelector(".votingCard"),t=p(e[0].deadlineDateTime);let o="";e.forEach(s=>{const d=s.currentVoters.includes(f),i=s.currentVoters.length,u=s.restaurant.minGroupSize;o+=`
    <li class="d-flex gap-12 p-12 mb-12 border border-brand-03 border-radius-40401616">
        <img class="border-radius-32321616 votingcard-photo" src="${s.restaurant.storeCover}">
            <div class="flex-grow-1 d-flex flex-column">
                <h4 class="mb-8 fs-16 fs-md-20 lh-sm text-brand-03">${s.restaurantName}</h4>
                <p class="flex-grow-1 mb-8 mb-md-16 text-gray-02 trippleline-ellipsis">${s.restaurant.summary}</p>
                <div class="d-flex justify-content-between flex-column flex-lg-row">
                    <div class="d-flex align-items-center mb-8 mb-lg-0 ">
                        <span class="me-4 me-lg-16 text-gray-02 text-nowrap">成團目標</span>
                        <div class="ts-progress is-tiny bg-gray-04 voting-progress" data-num="${s.id}">
                            <div class="bar bg-brand-02" style="--value: ${m(i,u)}">
                                <div class="text-white">${m(i,u)>100?100:m(i,u)}%</div>
                            </div>
                        </div>
                    </div>
                    ${U(s.id,t,d)}
                </div>
            </li>`}),n.innerHTML=o,L()}function m(e,n){return Math.floor(e/n*100)}function U(e,n,t){return n?'<button class="py-4 px-16 btn-disable border-0 rounded-pill btnVoteThis" disabled type="button">已結束</button>':b()?`<button
                class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis ${t?" btn-active-brand-02":""}"
            type="button" data-num=${e}>${t?"已投票":"投票"}</button>`:`<button
                      class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis"
                      type="button" data-num=${e} data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="請先登入帳號">投票</button>`}function L(){const e=a.querySelectorAll(".btnVoteThis"),n=document.querySelectorAll('[data-bs-toggle="popover"]');e.forEach(t=>{t.addEventListener("click",function(){if(!b()){[...n].map(s=>{new D.Popover(s)});return}t.classList.contains("btn-active-brand-02")?g(t.dataset.num,"deleteVote"):g(t.dataset.num,"addVote")})})}async function g(e,n){try{const t=document.querySelector(`.ts-progress[data-num="${e}"]`);t.classList.add("is-processing");const o=l.filter(s=>s.UID.startsWith("V")&&s.id==e)[0].currentVoters;if(n==="addVote")o.push(`${f}`);else{const s=o.indexOf(`${f}`);o.splice(s,1)}axios.patch(`${_url}/votings/${e}`,{currentVoters:o}).then(function(s){h(s.data.UID),t.classList.remove("is-processing")}).catch(function(s){console.error(s.message)})}catch(t){throw console.log("錯誤:",t),t}}$(".btnfilterEvent").click(function(e){$(".btnfilterEvent").toggleClass("btn-active-brand-02")});
