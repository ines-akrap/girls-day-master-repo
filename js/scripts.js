import {profiles} from './data.js';

const profileBox = document.querySelector('.profile');
const tabPosts = document.querySelector('[data-selector-tab-posts]');
const tabUsers = document.querySelector('[data-selector-tab-users]');
const tabBar = document.querySelector('[data-active-tab]');
const tabLinks = document.querySelectorAll('[data-link-tab]');

const renderImages = (images) => {
  tabPosts.innerHTML='';
  images.forEach((image) => {
    const post = document.createElement('div');
    post.classList.add('post');
    
    const markupPost = `
      <img class="post-image" src=${image.imageUrl} alt="Profile picture"></img>
      <div class="post-content">
          <div class="post-likes">
            <i class="glyphicon glyphicon-heart post-likes-icon"></i>
            <span class="post-likes-number">${Math.floor(Math.random() * 100)}</span>
            <span class="post-likes-list">Liked by <b>${image.liked}</b></span>
          </div>
          <div class="post-time">${image.timestamp}</div>
      </div>
    `;

    post.innerHTML = markupPost;
    tabPosts.appendChild(post);
  });
}

const renderProfileBox = (profile) => {
  const markupProfile = `
    <img class="profile-image" src=${profile.profilePictureUrl} alt="Profile picture"></img>
    <div class="profile-wrapper">
        <h2 class="profile-name">${profile.name}</h2>
        <p class="profile-user">${profile.userName}</p>
        <p class="profile-bio">${profile.description}</p>
        <a class="profile-link" href="${profile.profileUrl}" target="_blank">${profile.profileUrl}</a>
    </div>
  `;
  
  profileBox.innerHTML = markupProfile;
}

const renderProfile = (profile) => {
  renderProfileBox(profile);
  renderImages(profile.images);
}

const renderUsers = (profiles) => {
  const usersList = document.createElement('ul');
  usersList.classList.add('usersList');
  
  profiles.forEach((profile) => {
    const userWrapper = document.createElement('li');
    userWrapper.classList.add('user');
    userWrapper.setAttribute('data-user', profile.userName);
    
    const markupUser = `
        <img class="user-image" src=${profile.profilePictureUrl} alt="Profile picture"></img>
        <div class="user-data">
          <div class="user-name">${profile.name}</div>
          <div class="user-username">${profile.userName}</div>
        </div>
    `;
    
    userWrapper.innerHTML = markupUser;
    usersList.appendChild(userWrapper);
  });

  tabUsers.appendChild(usersList);
}

const switchTab = (e) => {
  let element = e.target;
  if (element.localName === 'i') { element = element.parentNode; }
  const clickedLink = element.getAttribute('data-link-tab');
  const activeTab = tabBar.getAttribute('data-active-tab');
  if (clickedLink === activeTab) {return;}

  tabLinks.forEach((link) => link.classList.remove('active'));
  element.classList.add('active');

  tabBar.setAttribute('data-active-tab', clickedLink);
  if (clickedLink === 'users' || activeTab === 'users') {
    tabPosts.classList.toggle('active');
    tabUsers.classList.toggle('active');
    return;
  }

  tabPosts.classList.toggle('grid');
  tabPosts.classList.toggle('list');
}

const switchUser = (e) => {
  const userClicked = e.target.getAttribute('data-user');
  profiles.profiles.forEach((profile) => {
    if (profile.userName === userClicked) {
      renderProfile(profile);
    }
  });
  userSwitch();
  changeLike();
}

const initTabs = () => {
  tabLinks.forEach((link) => link.addEventListener('click', switchTab));
}

const userSwitch = () => {
  const userProfile = document.getElementsByClassName('user');
  [].forEach.call(userProfile, (el) => el.addEventListener('click', switchUser));
}

const changeLike = () => {
  const likeImage = document.getElementsByClassName('post-likes-icon');
  [].forEach.call(likeImage, (el) => el.addEventListener('click', changeColor));
}

const changeColor = (e) => {
  const red = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  e.target.style.color = "rgb(" + red + "," + green + "," + blue + ")";
}

const init = () => {
  const initProfile = profiles.profiles[0];
  renderProfile(initProfile);
  renderUsers(profiles.profiles);
  initTabs();
  userSwitch();
  changeLike();
}

init();