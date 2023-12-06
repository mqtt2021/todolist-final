var apipost = 'https://retoolapi.dev/Yk6E6F/todol'

function render(todolist){
    var htmlremaining = document.querySelector('.remaining-text')
    var sophantutronglist = 0;
    var renderhtmls = document.querySelector('.list-to-do')
    var renderhtml = todolist.map(function(todo){

        sophantutronglist+=1;
        return `<div class="todo-item">
                    <div class="todo-item-content">${todo.content}</div>
                    <div class="${todo.id} todo-item-delete">
                        <button onclick="deletetask(${todo.id})" class="button-delete"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>`
    })
    document.querySelector('input[name="task"]').value = ''
    htmlremaining.innerHTML = `You have ${sophantutronglist} pendding tasks`
    renderhtmls.innerHTML = renderhtml.join('')
}

function  gettodolist(render){
    fetch(apipost)
        .then(function(respond){
            return respond.json()
        })
        
        .then(render)
}
  
  // Hàm thêm phần tử
  async function addItem(gettodolist,render) {
    try {
      var taskinput = document.querySelector('input[name="task"]').value
      if(taskinput === '')
      {
          alert('No task!!!')
          return;
      }
      var newItem = {
        content:taskinput
    }
      const response = await fetch(apipost, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Chú ý: Đặt kiểu dữ liệu là JSON
          // Thêm các headers khác nếu cần thiết
        },
        body: JSON.stringify(newItem), // Chuyển đổi đối tượng thành chuỗi JSON
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const addedItem = await response.json();
      console.log('Item added successfully:', addedItem);
      gettodolist(render)
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }

function deletetask(id){
        var option = {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json",
                          }
                     }

        fetch(apipost +'/'+ id,option)
        .then(function(){
            gettodolist(render)
        })
                    
}

async function deleteAllItems(gettodolist,render) {
  
    // Gửi yêu cầu GET để lấy danh sách phần tử từ API
    const response = await fetch(apipost);

    // Chuyển đổi dữ liệu từ định dạng JSON
    const data = await response.json();

    var sophantutronglist = data.length

    // Lặp qua mỗi phần tử và gửi yêu cầu DELETE
    for (const item of data) {
        const deleteResponse = await fetch(`${apipost}/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',  
        },
      });
      
      sophantutronglist-=1
      if(sophantutronglist ==1){
        gettodolist(render)
        return
      }           
     } 
    
    
}
 

    
function start(){
    gettodolist(render)
}

start()