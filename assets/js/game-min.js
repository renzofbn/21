const gameCore=(()=>{"use strict";let d=[],e=["C","D","H","S"],f=["A","J","Q","K"],g=[],a=document.querySelector("#btnGetCard"),b=document.querySelector("#btnStop"),h=document.querySelector("#btnNewGame"),i=document.querySelectorAll(".divCartas"),j=document.querySelectorAll("small");function c(){d=k(),l(),a.disabled=!1,b.disabled=!1,h.disabled=!0,m()}function k(){d=[];for(let a=2;a<=10;a++)for(let b of e)d.push(a+b);for(let c of e)for(let g of f)d.push(g+c);return _.shuffle(d)}function l(b=2){g=[];for(let a=0;a<b;a++)g.push({points:0,aceCount:0});j.forEach(a=>a.innerText=0),i.forEach(a=>a.innerHTML="")}function m(){let b=n(),a=p(0,b);q(0,b);let c=n();a=p(0,c),q(0,c);let d=n();p(1,d),q(1,d),q(1),!0===t(a)&&r(a)}function n(){if(0===d.length)throw"There is no cards in deck, somenthing went wrong";return d.pop()}function o(b){let a=b.substring(0,b.length-1);return isNaN(a)?"A"===a?11:10:1*a}function p(a,c){let b=o(c);return 11===b&&(g[a].aceCount+=1),g[a].points+=b,g[a].points>21&&g[a].aceCount>0&&(g[a].points-=10,g[a].aceCount-=1),j[a].innerText=g[a].points,g[a].points}function q(b,c="grey_back"){let a=document.createElement("img");a.src=`assets/cartas/${c}.png`,a.classList.add("pockerCard"),i[b].append(a)}function r(a){let b=0;i[1].removeChild(i[1].children[1]);do{let c=n();b=p(1,c),q(1,c)}while(b<a&&a<=21)s()}function s(){let a=g[1].points,b=g[0].points;setTimeout(()=>{a===b?alert("Nadie gana :("):b>21?alert("Dealer gana"):a>21?alert("Jugador Gana"):alert("Computadora Gana")},1e3),h.disabled=!1}function t(c){return c>=21&&(a.disabled=!0,b.disabled=!0,!0)}return a.addEventListener("click",()=>{let a=n(),b=p(0,a);q(0,a),t(b)&&r(b)}),b.addEventListener("click",()=>{a.disabled=!0,b.disabled=!0,r(g[0].points)}),{newGame:c}})()