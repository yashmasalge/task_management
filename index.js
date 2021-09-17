let globalTaskData = []
taskContents = document.getElementById('taskContents');

const addCard = () => {
    const newTaskDetails = {
        id: `${Date.now()}`,
        url: document.getElementById("imageurl").value,
        title: document.getElementById("tasktitle").value,
        type: document.getElementById("tasktype").value,
        description: document.getElementById("description").value
    }
    
    taskContents.insertAdjacentHTML('beforeend',generateTaskCard(newTaskDetails))

    globalTaskData.push(newTaskDetails);
    saveToLocalStorage();
}



const generateTaskCard = ({id, url, title, type, description}) => 
    `<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card">
            <div class="card-header">
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-info" onclick = "editTask(this)" name = ${id}>
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger" onclick = "deleteTask(this)" name = ${id}>
                        <i class="far fa-trash-alt" name = ${id}></i>
                    </button>
                </div>
            </div>
            <img src=${url} class="card-img-top" alt="image" name = ${url}/>
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <span class="badge bg-primary">${type}</span>
            </div>
            <div class="card-footer">
                <button class="btn btn-outline-primary float-end"  onclick ="showTaskCard(this)" name = ${id}>OPEN TASK</button>
            </div>
        </div>
    </div>`

    const saveToLocalStorage = () => {
        localStorage.setItem("tasks", JSON.stringify({yash: globalTaskData}));
    }
    
    const reloadTaskCard = () => {
        const localStorageCopy = JSON.parse(localStorage.getItem("tasks"));
        console.log(localStorageCopy);
    if(localStorageCopy) {
        globalTaskData = localStorageCopy["yash"];
    }
    globalTaskData.map((cardData) => {
        taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
    })
}

const deleteTask = (e) => {
    const targetID = e.getAttribute("name");
    globalTaskData = globalTaskData.filter((e) => e.id!= targetID)
    saveToLocalStorage();
    window.location.reload();
}

const editTask = (e) => {
    const targetID = e.getAttribute("name");
    // console.log(e)
    // console.log(e.parentNode)
    // console.log(e.parentNode.parentNode.parentNode.childNodes)
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1])
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3])
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5])


    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","true")

    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].style.setProperty("border","1px solid black")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].style.setProperty("border","1px solid black")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].style.setProperty("border","1px solid black")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].style.setProperty("border-radius","10px")

    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick","saveEditTask(this)")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "Save Changes"
   
}

const saveEditTask = (e) => {
    const targetID = e.getAttribute("name");
    const newTaskDetails = {
        id: e.parentNode.parentNode.parentNode.getAttribute("id"),
        url: e.parentNode.parentNode.childNodes[3].getAttribute("name"),
        title: e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML,
        type: e.parentNode.parentNode.childNodes[5].childNodes[5].innerHTML,
        description: e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML
    }
    const refid = e.parentNode.parentNode.parentNode.getAttribute("id")
    console.log(refid)
    objIndex = globalTaskData.findIndex((obj => obj.id == refid ));
    console.log(objIndex)
    globalTaskData[objIndex] = newTaskDetails
    // globalTaskData.push(newTaskDetails);
    saveToLocalStorage()
    window.location.reload();
}

const showTaskCard = (e) => {
    objIndex = globalTaskData.findIndex((obj => obj.id == e.getAttribute("name") ));
    // const img = globalTaskData[objIndex].url
    // const title1 = globalTaskData[objIndex].title
    // const desc1 = globalTaskData[objIndex].description

    ` <div class="modal fade" id="newcardmodal1" tabindex="-1" aria-labelledby="newCardModalLabel1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        CLOSE
                    </button>
                </div>

            </div>
        </div>
    </div>
</div>`
}