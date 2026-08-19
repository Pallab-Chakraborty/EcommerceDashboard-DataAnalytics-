const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_KEYS = ['2018-01','2018-02','2018-03','2018-04','2018-05','2018-06',
                    '2018-07','2018-08','2018-09','2018-10','2018-11','2018-12'];

function getMonthKey(date) {
  if (!date) return null;
  const parts = date.split('-');
  if (parts.length === 3) return parts[2]+'-'+parts[1];
  return null;
}

const TT = {
  backgroundColor: 'rgba(12,0,21,0.95)',
  borderColor: 'rgba(217,70,239,0.3)',
  borderWidth: 1,
  titleColor: '#f0e6ff',
  bodyColor: '#9b8eb0',
  padding: 12,
  cornerRadius: 10
};

function initCharts(data) {
  // Monthly
  const monthlyMap = {};
  MONTH_KEYS.forEach(k => monthlyMap[k] = {amount:0,profit:0});
  data.forEach(r => {
    const k = getMonthKey(r.date);
    if (k && monthlyMap[k]) {
      monthlyMap[k].amount += r.amount;
      monthlyMap[k].profit += r.profit;
    }
  });

  charts.monthly = new Chart(document.getElementById('monthlyChart'), {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Revenue', data: MONTH_KEYS.map(k=>monthlyMap[k].amount), borderColor:'#d946ef', backgroundColor:'rgba(217,70,239,0.1)', fill:true, tension:0.4, pointRadius:4, pointBackgroundColor:'#d946ef' },
        { label: 'Profit', data: MONTH_KEYS.map(k=>monthlyMap[k].profit), borderColor:'#34d399', backgroundColor:'rgba(52,211,153,0.08)', fill:true, tension:0.4, pointRadius:4, pointBackgroundColor:'#34d399' }
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ labels:{ color:'#9b8eb0', font:{family:'Outfit'} } }, tooltip:TT },
      scales:{
        x:{ grid:{color:'rgba(217,70,239,0.06)'}, ticks:{color:'#9b8eb0',font:{family:'Outfit'}} },
        y:{ grid:{color:'rgba(217,70,239,0.06)'}, ticks:{color:'#9b8eb0',font:{family:'Outfit'}, callback:v=>'₹'+v.toLocaleString()} }
      }
    }
  });

  // Payment donut
  const payMap = {};
  data.forEach(r => { payMap[r.payment] = (payMap[r.payment]||0)+r.amount; });
  const payEntries = Object.entries(payMap).sort((a,b)=>b[1]-a[1]);
  charts.pay = new Chart(document.getElementById('payChart'), {
    type: 'doughnut',
    data: {
      labels: payEntries.map(e=>e[0]),
      datasets: [{
        data: payEntries.map(e=>e[1]),
        backgroundColor: ['rgba(217,70,239,0.85)','rgba(129,140,248,0.85)','rgba(251,146,60,0.85)','rgba(52,211,153,0.85)','rgba(248,113,113,0.85)'],
        borderWidth: 0, hoverOffset:8
      }]
    },
    options: {
      cutout:'68%',
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ position:'bottom', labels:{color:'#9b8eb0',font:{family:'Outfit',size:10},padding:8,boxWidth:10} }, tooltip:TT }
    }
  });

  // Category bar
  const cats = ['Electronics','Furniture','Clothing'];
  const catMap = {};
  cats.forEach(c => catMap[c] = {amount:0,profit:0,qty:0});
  data.forEach(r => { if(catMap[r.category]) { catMap[r.category].amount+=r.amount; catMap[r.category].profit+=r.profit; catMap[r.category].qty+=r.qty; } });
  charts.cat = new Chart(document.getElementById('catChart'), {
    type:'bar',
    data:{
      labels:cats,
      datasets:[
        {label:'Revenue', data:cats.map(c=>catMap[c].amount), backgroundColor:'rgba(217,70,239,0.8)', borderRadius:6, borderSkipped:false},
        {label:'Profit', data:cats.map(c=>catMap[c].profit), backgroundColor:'rgba(52,211,153,0.8)', borderRadius:6, borderSkipped:false}
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{labels:{color:'#9b8eb0',font:{family:'Outfit'}}}, tooltip:TT },
      scales:{
        x:{grid:{color:'rgba(217,70,239,0.06)'},ticks:{color:'#9b8eb0',font:{family:'Outfit'}}},
        y:{grid:{color:'rgba(217,70,239,0.06)'},ticks:{color:'#9b8eb0',font:{family:'Outfit'},callback:v=>'₹'+v.toLocaleString()}}
      }
    }
  });

  // Cat profit compare
  charts.catProfit = new Chart(document.getElementById('catProfitChart'), {
    type:'bar',
    data:{
      labels:cats,
      datasets:[
        {label:'Revenue', data:cats.map(c=>catMap[c].amount), backgroundColor:'rgba(129,140,248,0.8)', borderRadius:6, borderSkipped:false},
        {label:'Quantity', data:cats.map(c=>catMap[c].qty*50), backgroundColor:'rgba(251,146,60,0.6)', borderRadius:6, borderSkipped:false}
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{labels:{color:'#9b8eb0',font:{family:'Outfit'}}}, tooltip:{...TT, callbacks:{label:ctx=>ctx.dataset.label==='Quantity'?'Qty: '+(ctx.raw/50).toLocaleString():'₹'+ctx.raw.toLocaleString()}} },
      scales:{
        x:{grid:{color:'rgba(217,70,239,0.06)'},ticks:{color:'#9b8eb0',font:{family:'Outfit'}}},
        y:{grid:{color:'rgba(217,70,239,0.06)'},ticks:{color:'#9b8eb0',font:{family:'Outfit'}}}
      }
    }
  });
}

function updateCharts(data) {
  if (!charts.monthly) { initCharts(data); return; }

  const monthlyMap = {};
  MONTH_KEYS.forEach(k => monthlyMap[k] = {amount:0,profit:0});
  data.forEach(r => {
    const k = getMonthKey(r.date);
    if (k && monthlyMap[k]) { monthlyMap[k].amount+=r.amount; monthlyMap[k].profit+=r.profit; }
  });
  charts.monthly.data.datasets[0].data = MONTH_KEYS.map(k=>monthlyMap[k].amount);
  charts.monthly.data.datasets[1].data = MONTH_KEYS.map(k=>monthlyMap[k].profit);
  charts.monthly.update();

  const payMap = {};
  data.forEach(r => { payMap[r.payment]=(payMap[r.payment]||0)+r.amount; });
  const payEntries = Object.entries(payMap).sort((a,b)=>b[1]-a[1]);
  charts.pay.data.labels = payEntries.map(e=>e[0]);
  charts.pay.data.datasets[0].data = payEntries.map(e=>e[1]);
  charts.pay.update();

  const cats = ['Electronics','Furniture','Clothing'];
  const catMap = {};
  cats.forEach(c=>catMap[c]={amount:0,profit:0,qty:0});
  data.forEach(r=>{if(catMap[r.category]){catMap[r.category].amount+=r.amount;catMap[r.category].profit+=r.profit;catMap[r.category].qty+=r.qty;}});
  charts.cat.data.datasets[0].data = cats.map(c=>catMap[c].amount);
  charts.cat.data.datasets[1].data = cats.map(c=>catMap[c].profit);
  charts.cat.update();
  charts.catProfit.data.datasets[0].data = cats.map(c=>catMap[c].amount);
  charts.catProfit.data.datasets[1].data = cats.map(c=>catMap[c].qty*50);
  charts.catProfit.update();
}

