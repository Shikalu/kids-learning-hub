import * as L from 'leaflet';
import { maplibreGL } from 'https://unpkg.com/@maplibre/maplibre-gl-leaflet@0.1.4/dist/leaflet-maplibre-gl.mjs';
import { historicalRoute, places } from './data.js';

// 采用 OpenFreeMap 公共矢量底图：免费、开源、免注册、无需 API Key。
const map = L.map('map',{zoomControl:true,preferCanvas:true,minZoom:2,maxZoom:14}).setView([36.8,79.5],3);
const attribution = 'OpenFreeMap · © OpenMapTiles · Data from © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>';
const basemaps = {
 'OpenFreeMap 标准街道图': maplibreGL({style:'https://tiles.openfreemap.org/styles/liberty',attribution}),
 'OpenFreeMap 浅色地图': maplibreGL({style:'https://tiles.openfreemap.org/styles/positron',attribution}),
 'OpenFreeMap 明亮地图': maplibreGL({style:'https://tiles.openfreemap.org/styles/bright',attribution}),
 'OpenFreeMap 深色地图': maplibreGL({style:'https://tiles.openfreemap.org/styles/dark',attribution}),
 'OpenFreeMap Fiord': maplibreGL({style:'https://tiles.openfreemap.org/styles/fiord',attribution})
};
const firstBase=basemaps['OpenFreeMap 标准街道图'];
firstBase.addTo(map);
L.control.layers(basemaps,null,{collapsed:true,position:'topright'}).addTo(map);

const routeLayer=L.layerGroup().addTo(map), demonLayer=L.layerGroup().addTo(map), historyLayer=L.layerGroup();
const markers={};
const coords=places.map(p=>[p.lat,p.lon]);
L.polyline(coords,{color:'#245b86',weight:3,opacity:.72,dashArray:'7 8'}).addTo(routeLayer);
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function levelLabel(l){return l==='A'?'现实原型较明确':l==='B'?'地理推定':'文学示意';}
function popup(p){
 const monsterHtml=p.demons.length?`<div class="pop-monsters"><div class="pop-label">该地点妖怪／精怪</div>${p.demons.map(d=>`<div class="monster"><b>${esc(d.name)}</b> <span style="color:#6b7280">${esc(d.alias||'')}</span><small>${esc(d.kind)} · ${esc(d.detail)}</small></div>`).join('')}</div>`:'<div class="pop-monsters"><span style="font-size:12px;color:#64748b">此处无独立妖怪主线，或原著未明确记载妖怪。</span></div>';
 return `<div class="pop-title">${esc(p.name)}</div><div class="pop-sub">${esc(p.ch)} · 定位 ${p.level}（${levelLabel(p.level)}）</div><div class="pop-row"><span class="pop-label">小说／古称：</span>${esc(p.old)}</div><div class="pop-row"><span class="pop-label">现代地名：</span>${esc(p.now)}</div><div class="pop-row">${esc(p.note)}</div>${monsterHtml}`;
}
places.forEach((p,i)=>{
 const routeMarker=L.circleMarker([p.lat,p.lon],{radius:5.5,color:'#245b86',weight:1.5,fillColor:'#eaf2f8',fillOpacity:.95}).bindPopup(popup(p),{maxWidth:360});
 routeMarker.addTo(routeLayer); markers[p.id]=routeMarker;
 if(p.demons.length){
   const isCompanion=p.demons.every(x=>String(x.kind).includes('归队角色'));
   const d=L.circleMarker([p.lat,p.lon],{radius:9,color:'#fff',weight:1.5,fillColor:isCompanion?'#26734d':'#b42318',fillOpacity:.92}).bindPopup(popup(p),{maxWidth:360});
   d.addTo(demonLayer);
 }
});
const histCoords=historicalRoute.map(x=>[x[0],x[1]]);
L.polyline(histCoords,{color:'#a66a16',weight:3,opacity:.9,dashArray:'3 7'}).addTo(historyLayer);
historicalRoute.forEach(x=>L.circleMarker([x[0],x[1]],{radius:4,color:'#8a5b17',weight:1,fillColor:'#e8bd62',fillOpacity:1}).bindPopup(`<b>玄奘史实路线（简化对照）</b><br>${esc(x[2])}`).addTo(historyLayer));

const list=document.getElementById('places');
function renderList(query=''){
 list.innerHTML='';let shown=0;
 places.forEach((p,i)=>{
  const hay=[p.name,p.old,p.now,p.ch,p.note,...p.demons.flatMap(d=>[d.name,d.alias,d.kind,d.detail])].join(' ').toLowerCase();
  if(query && !hay.includes(query.toLowerCase())) return;
  shown++;
  const el=document.createElement('div');el.className='place';el.dataset.id=p.id;
  const demonNames=p.demons.map(d=>d.name).join('、');
  const tags=`<span class="tag ${p.level==='A'?'high':p.level==='B'?'mid':'low'}">${p.level} · ${levelLabel(p.level)}</span>${p.demons.length?`<span class="tag">${p.demons.length}类标注</span>`:''}`;
  el.innerHTML=`<div class="place-top"><div class="place-name">${i+1}. ${esc(p.name)}</div><div class="place-chapter">${esc(p.ch)}</div></div><div class="place-now">${esc(p.now)}</div><div>${tags}</div>${demonNames?`<div class="monster-line">${esc(demonNames)}</div>`:''}`;
  el.addEventListener('click',()=>{document.querySelectorAll('.place.selected').forEach(x=>x.classList.remove('selected'));el.classList.add('selected');map.flyTo([p.lat,p.lon],Math.max(map.getZoom(),5),{duration:.7});markers[p.id].openPopup();});
  list.appendChild(el);
 });
 document.getElementById('count').textContent=`显示 ${shown} / ${places.length} 组地点`;
}
renderList();
document.getElementById('search').addEventListener('input',e=>renderList(e.target.value.trim()));
function bindToggle(id,layer){const b=document.getElementById(id);b.addEventListener('click',()=>{if(map.hasLayer(layer)){map.removeLayer(layer);b.classList.remove('active')}else{map.addLayer(layer);b.classList.add('active')}})}
bindToggle('showRoute',routeLayer);bindToggle('showDemons',demonLayer);bindToggle('showHistory',historyLayer);
document.getElementById('reset').addEventListener('click',()=>{map.fitBounds(L.latLngBounds(coords).pad(.08));});
map.fitBounds(L.latLngBounds(coords).pad(.08));
