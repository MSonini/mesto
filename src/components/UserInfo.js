export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._id = null;
  }

  getUserInfo() {
    let avatarUrl = this._avatar.style.backgroundImage.split("'")[1];
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: avatarUrl,
    };
  }

  getUserId() {
    return this._id;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.style.backgroundImage = `url('${avatar}')`;
    this._id = _id;
  }
}
