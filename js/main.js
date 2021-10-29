const userColumn = $_(".userColumn");
const usersCount = $_(".usersCount");
const postColumn = $_(".postColumn");
const postsCount = $_(".postsCount");
const cammentColumn = $_(".cammentColumn");
const commentCount = $_(".commentCount");
const userTemplate = $_("#userTemplate").content;
const postTemplate = $_("#postTemplate").content;
const commentTemplate = $_("#commentTemplate").content;

; (async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const result = await response.json()
    console.log(result);
    renderUser(result)
}) ()

let createUsers = item =>{
    let usersList = userTemplate.cloneNode(true);
    $_(".nameLink", usersList).textContent = item.name;
    $_(".nameLink", usersList).dataset.id = item.id;
    $_(".emailLink", usersList).textContent = item.email;
    $_(".emailLink", usersList).href = "mailto:" + item.email;
    $_(".country", usersList).textContent = item.address.city;
    $_(".elCampany", usersList).textContent = item.company.name;
    $_(".webLink", usersList).textContent = item.website;
    $_(".webLink", usersList).href = "https://" + item.website;
    return usersList;
}

let createPosts = itemPost => {
    let postsList = postTemplate.cloneNode(true);
    $_(".postTitle", postsList).textContent = itemPost.title;
    $_(".postTitle", postsList).dataset.id = itemPost.id;
    $_(".postBody", postsList).textContent = itemPost.body;
    return postsList;
}
 
let createComments = itemComment =>{
    let commentList = commentTemplate.cloneNode(true)
    $_(".commentTitle",commentList).textContent=itemComment.name;
    $_(".emailLink",commentList).textContent=itemComment.email;
    $_(".emailLink",commentList).href="mailto:"+itemComment.email;
    $_(".elComment",commentList).textContent=itemComment.body;
    return commentList
}

const renderUser = array => {
    usersCount.textContent =array.length;
    array.forEach(element => {
        userColumn.appendChild(createUsers(element));
    });
}

userColumn.addEventListener('click', async (event) => {
    if(event.target.matches(".nameLink")) {
        const id = event.target.dataset.id;
        const response = await fetch (`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        const result = await response.json()
        postsCount.textContent = result.length;
        postColumn.innerHTML = "";
        result.map(item => {
            postColumn.appendChild(createPosts(item)) 
        })
    }
})
 
postColumn.addEventListener('click',async (event) => {
    console.log(event);
    if(event.target.matches(".postTitle")) {
        const idComment = event.target.dataset.id;
        const response = await fetch (`https://jsonplaceholder.typicode.com/posts/${idComment}/comments`)
        const result = await response.json();
        commentCount.textContent = result.length;
        cammentColumn.innerHTML = "";
        result.map(item => {
            cammentColumn.appendChild(createComments(item))
        })
    }
})
