let filters = { cat: 'All', pay: 'All' };
let charts = {};
let DATA = [];

function filtered() {
  return DATA.filter(r => {
    if (filters.cat !== 'All' && r.category !== filters.cat) return false;
    if (filters.pay !== 'All' && r.payment !== filters.pay) return false;
    return true;
  });
}

function updateKPIs(data) {
  const rev = data.reduce((s,r)=>s+r.amount,0);
  const profit = data.reduce((s,r)=>s+r.profit,0);
  const qty = data.reduce((s,r)=>s+r.qty,0);
  const margin = rev ? (profit/rev*100).toFixed(1) : 0;
  document.getElementById('kpi-rev').textContent = '₹'+rev.toLocaleString();
  document.getElementById('kpi-profit').textContent = '₹'+profit.toLocaleString();
  document.getElementById('kpi-qty').textContent = qty.toLocaleString();
  document.getElementById('kpi-aov').textContent = '₹'+Math.round(rev/Math.max(data.length,1)).toLocaleString();
  document.getElementById('kpi-profit-hint').textContent = margin+'% profit margin';
  document.getElementById('kpi-rev-hint').textContent = data.length+' order lines';
  document.getElementById('kpi-qty-hint').textContent = 'Total units';
}

function updateStateBars(data) {
  const stateMap = {};
  data.forEach(r=>{ stateMap[r.state]=(stateMap[r.state]||0)+r.amount; });
  const sorted = Object.entries(stateMap).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const max = sorted[0]?.[1]||1;
  document.getElementById('stateList').innerHTML = sorted.map(([s,v])=>`
    <div class="bar-item">
      <div class="bar-top"><span class="bar-name">${s}</span><span class="bar-val">₹${v.toLocaleString()}</span></div>
      <div class="bar-bg"><div class="bar-fill" style="width:${v/max*100}%"></div></div>
    </div>`).join('');
}

function updateSubCatTable(data) {
  const subMap = {};
  data.forEach(r=>{ if(!subMap[r.subCat]) subMap[r.subCat]={amount:0,profit:0}; subMap[r.subCat].amount+=r.amount; subMap[r.subCat].profit+=r.profit; });
  const sorted = Object.entries(subMap).sort((a,b)=>b[1].amount-a[1].amount);
  document.getElementById('subCatTable').innerHTML = sorted.map(([s,v])=>`
    <tr><td>${s}</td><td>₹${v.amount.toLocaleString()}</td><td class="${v.profit>=0?'positive':'negative'}">₹${v.profit.toLocaleString()}</td></tr>`).join('');
}

function updateCustTable(data) {
  const custMap = {};
  data.forEach(r=>{ const key=r.customer+'|'+r.state; if(!custMap[key]) custMap[key]={name:r.customer,state:r.state,total:0}; custMap[key].total+=r.amount; });
  const sorted = Object.values(custMap).sort((a,b)=>b.total-a.total).slice(0,10);
  document.getElementById('custTable').innerHTML = sorted.map((c,i)=>`
    <tr><td>${i===0?'🥇 ':i===1?'🥈 ':i===2?'🥉 ':''}${c.name}</td><td style="color:var(--muted)">${c.state}</td><td>₹${c.total.toLocaleString()}</td></tr>`).join('');
}

function refresh() {
  const data = filtered();
  updateKPIs(data);
  updateCharts(data);
  updateStateBars(data);
  updateSubCatTable(data);
  updateCustTable(data);
}

document.querySelectorAll('.fbtn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const ft = btn.dataset.f;
    document.querySelectorAll(`[data-f="${ft}"]`).forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    filters[ft] = btn.dataset.v;
    refresh();
  });
});


// ─── DATA LOADING & INIT ───────────────────────────────────────────────
async function loadData() {
  const res = await fetch('data/orders.json');
  if (!res.ok) throw new Error('Failed to load data/orders.json (' + res.status + ')');
  return res.json();
}

async function init() {
  try {
    DATA = await loadData();
    initCharts(DATA);
    refresh();
  } catch (err) {
    console.error(err);
    document.querySelector('.grid').innerHTML =
      '<div class="card">Could not load dashboard data. Check that data/orders.json is present and you are serving the site over HTTP (not opening index.html directly as a file).</div>';
  }
}

init();
