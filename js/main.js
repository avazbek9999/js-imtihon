//users
const elUserList = document.querySelector(".user_list");
const elUserTemplate = document.querySelector(".user_template").content;
//post
const elPostList = document.querySelector(".post_list");
const elPostTemplate = document.querySelector(".post_template").content;
//comments
const elcommentList = document.querySelector(".comment_list");
const elcommentTemplate = document.querySelector(".comment_template").content;

//renderUsers
function renderUsers(arr, element) {
  element.innerHTML = null;
  const UserFragment = document.createDocumentFragment();
  arr.forEach((row) => {
    const userTemplat = elUserTemplate.cloneNode(true);
    userTemplat.querySelector(".user__id").textContent = row.id;
    userTemplat.querySelector(".user__name").textContent = row.name;
    userTemplat.querySelector(".user__email").textContent = row.email;
    userTemplat.querySelector(".user__adress").textContent =
      row.address.street +
      " " +
      row.address.suite +
      " " +
      row.address.city +
      " " +
      row.address.zipcode;

    userTemplat.querySelector(".user__adress__link").href =
      "https://www.google.com/maps/place/" +
      row.address.geo.lat +
      " " +
      row.address.geo.lng;

    userTemplat.querySelector(".user__phone").textContent = row.phone;
    userTemplat.querySelector(".user__website").textContent = row.website;
    userTemplat.querySelector(".user__company__name").textContent =
      row.company.name;
    userTemplat.querySelector(".user__company__catchPhrase").textContent =
      row.company.catchPhrase;
    userTemplat.querySelector(".user__company__bs").textContent =
      row.company.bs;

    const elusers = userTemplat.querySelector(".user");
    elusers.dataset.users_id  = row.id;
    

    
    elusers.addEventListener("click", (evt) => {
      const userid = evt.target.dataset.users_id;
        
      async function fetchPost() {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        
          const postArr = data;
        if (postArr.length) {
          renderPost(postArr, elPostList);
        }
          

          const foundPost = data.filter((post) => post.userId == userid);
          
        renderPost(foundPost, elPostList);
        console.log(foundPost);
      }
      fetchPost();
    });

    UserFragment.appendChild(userTemplat);
  });

  element.appendChild(UserFragment);
}


//fetchUsers
async function fetchUsers() {
  elUserList.innerHTML= "<img src='./images/spinner.svg' alt='spinner image'/>";
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
    const userArr = data;
  if (userArr.length) {
    renderUsers(userArr, elUserList);
  }
}

fetchUsers();

//renderPost

function renderPost(postArr, element) {
  element.innerHTML = null;
  const postFragment = document.createDocumentFragment();
  postArr.forEach((row) => {
    const postTemplate = elPostTemplate.cloneNode(true);
    postTemplate.querySelector(".post_user_id").textContent = row.userId;
    postTemplate.querySelector(".post__id").textContent = row.id;
    postTemplate.querySelector(".poat__title").textContent = row.title;
    postTemplate.querySelector(".post__body").textContent = row.body;
      
      const elPost = postTemplate.querySelector(".post");
      elPost.dataset.post_id = row.id;

      elPost.addEventListener('click', (evt) => {
          const postid = evt.target.dataset.post_id;
          
          async function fetchCommet() {
              const response = await fetch("https://jsonplaceholder.typicode.com/comments");
              const data = await response.json();
              const commentArr = data;
              if (commentArr.length) {
                  renderComment(commentArr, elcommentList);
              }
              

              const foundComments = data.filter((comment) => comment.postId == postid);
              renderComment(foundComments, elcommentList);
          }
          fetchCommet();
      });
    

    postFragment.appendChild(postTemplate);
  });

  element.appendChild(postFragment);
}

//fetchPost
async function fetchPost() {
    elPostList.innerHTML= "<img src='./images/spinner.svg' alt='spinner image'/>";
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    const postArr = data;
  if (postArr.length) {
    renderPost(postArr, elPostList);
  }
}

fetchPost();

//renderComment
function renderComment(commentArr, element) {
  element.innerHTML = null;
  const commentFragment = document.createDocumentFragment();
  commentArr.forEach((row) => {
    const commentTemplate = elcommentTemplate.cloneNode(true);
    commentTemplate.querySelector(".post_id").textContent = row.postId;
    commentTemplate.querySelector(".comment__name").textContent = row.name;
    commentTemplate.querySelector(".commet__gmail").textContent = row.email;
    commentTemplate.querySelector(".comment__body").textContent = row.body;

    commentFragment.appendChild(commentTemplate);
  });
  element.appendChild(commentFragment);
}

// frtchcommets
async function fetchCommet() {
  elcommentList.innerHTML= "<img src='./images/spinner.svg' alt='spinner image'/>";
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
    const data = await response.json();
    const commentArr = data;
    if (commentArr.length) {
        renderComment(commentArr, elcommentList);     
    }
}
fetchCommet();
