class Database {
  constructor({
    name, displayName, size, version
  }){
    this.db = null
    this.name = name
    this.displayName = displayName
    this.size = size 
    this.version = version
    this.initiate()
  }
  initiate(){
    try {
      this.db = openDatabase(
        this.name,
        this.version,
        this.displayName,
        this.size
      )
    } catch(e){
      console.error(e)
      alert('Sqlite not supported on this browser')
    }
  }
  
  sql(cmd, values = []){
    return new Promise((resolve, reject) => {
      this.db.transaction(function (tx) { 
        tx.executeSql(cmd, values, 
        function(tx, result){
          console.table(result.rows)
          resolve({tx, result})
        }, 
        function(tx, error){
          console.error(tx, error)
          reject({tx, error})
        }); 
      }); 
    })
  }
  
  success(){
    console.log(`Database: ${this.displayName} has been initiated`)
  }
  
  dateTime(d){
    const date = new Date()
    if(d == 'yesterday') 
      date.setDate(date.getDate() - 1)
    return date.toDateString()
  }
}

async function financing(){
  const db = new Database({
    name: "finance",
    displayName: "Financing",
    size: 3 * 1024 * 1024,
    version: 1.0
  })
  const finance = document.querySelector(".finance-container")
  const table = finance.querySelector('table')
  const tbody = table.querySelector('tbody')
  const tfoot = table.querySelector('tfoot')
  const submit = tfoot.querySelector("#submit")
  const today = tfoot.querySelector("#totalToday")
  
  submit.addEventListener('click', async function(){
    const desc = tfoot.querySelector('#desc')
    const cost = tfoot.querySelector('#cost')
    const type = tfoot.querySelector("#type")
    
    if(desc.value && cost.value != "" && type.value) {
      const query = await db.sql(
        'insert into finance (Desc, Cost, Date, Type) values (?,?,?,?)',
        [
          desc.value,
          cost.value,
          db.dateTime(),
          type.value
        ]
      )
      
      tbody.append(displayRecord([
        query.result.insertId,
        desc.value,
        cost.value,
        type.value]
      ))
      desc.value = cost.value = ""
      
      const totalToday = await db.sql(
      `select sum(case when type = 'income' then cost else -cost end) total from finance where Date="${db.dateTime()}"`
      )
      today.innerText = totalToday.result.rows[0].total
    }
  })
  const createTable = await db.sql('CREATE TABLE IF NOT EXISTS finance (Id integer PRIMARY KEY AUTOINCREMENT, Desc text not null, Cost number not null, Type text not null, Date text not null)')
  
  //Display Today
  const display = await db.sql(`select * from finance where Date="${db.dateTime()}"`)
  //Display Total Today
  const totalToday = await db.sql(
    `select sum(case when type = 'income' then cost else -cost end) total from finance where Date="${db.dateTime()}"`
  )
  today.innerText = totalToday.result.rows[0].total
  
  //Display Total Yesterday
  const totalYesterday = await db.sql(
    `select sum(case when type = 'income' then cost else -cost end) total from finance where Date="${db.dateTime('yesterday')}"`
  )
  
  
  if (display.result.rows.length == 0) {
    const query = await db.sql(
      'insert into finance (Desc, Cost, Date, Type) values (?,?,?,?)',
          [
            'Yesterday Total',
            totalYesterday.result.rows[0].total,
            db.dateTime(),
            'income'
          ]
    )
    location.reload()
  }
  //db.sql('drop table finance')
  
  for(let i in display.result.rows){
    const row = display.result.rows[i]
    if(typeof row.Id === 'number') {  
      tbody.append(
        displayRecord(
          [row.Id, row.Desc, row.Cost, row.Type]
        )
      )
    }
  }
}

function displayRecord(_data) {
  const tr = document.createElement('tr')
  _data.forEach(d => {
    const td = document.createElement('td')
    if(['income', 'outcome'].indexOf(d)>=0)
    tr.classList.add(d)
    td.innerText = d
    tr.append(td)
  })
  return tr
}

window.addEventListener('load', financing)
