import express from 'express';
import peopleRepository from './src/repository/people.repository.js';

const app = express();
app.use(express.json());
app.use('/app', express.static('web'));

app.get('/', (req, res) => {
  return res.redirect('/app');
});

app.get('/api/people', async(req, res) => {
  try {
    const repository = new peopleRepository();
    const peoples = await repository.findAll();
    res.json(peoples, 200);
  } catch(err) {
    console.log(err.message);
    res.json('erro', 500);
  }
});

app.post('/api/people', async(req, res) => {
  
  console.log(req.body);
  const name = req.body.name;

  if(String(name).length) {
    const repository = new peopleRepository();
    const rs = await repository.save(name);
  }

  return res.json(null, 204);
});

app.listen(5000, () => {
  console.log('running...');
});
