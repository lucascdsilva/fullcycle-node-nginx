
const app = App(document.getElementById('form'), document.getElementById('lista-pessoa'))

app.start();

function App (target, list) {
  let payload = null;

  return {start};

  function start() {
    refreshData();
    target.addEventListener('submit', function(e) {

      (async function() {
        const name = target.name.value;
        payload = {name};
        await sendData(payload);
        target.reset();
        refreshData();

        console.log('payload: ', payload);
      })();

      e.preventDefault();
    });
  }

  async function refreshData() {
    const items = await getData() || [];
    loadData(items);
  }

  function loadData(items) {
    list.innerHTML = '';
    for(const item of items) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.appendChild(document.createTextNode(item.name));
      tr.appendChild(td);
      list.appendChild(tr);
    }
  }

  async function getData() {
    try {
      const response = await fetch ('/api/people');
      const data = await response.json();
      return data;
    } catch(e) {
      console.log('exception getData: ', e.message);
    }
  }

  async function sendData(payload) {
    try {
      const response = await fetch('/api/people', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
    } catch(e) {
      console.log('exception: ', e.message);
    }
  }
}