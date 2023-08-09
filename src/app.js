const app = require('./index');

const {sequelize} = require('./db');

app.listen(3001,()=>{
  sequelize.sync({alter:true})
  console.log('Server on port 3001')
});