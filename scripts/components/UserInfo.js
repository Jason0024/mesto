export default class UserInfo {
  constructor({ username, job, avatar, api }) {
    this._username = document.querySelector(username);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
    this._api = api;
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
        const user = {};
        user.username = this._username.textContent;
        user.job = this._job.textContent;
        return user;
    }

  setUserAvatar({avatar}) {
    this._avatar.src = avatar;
 }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({name: username, about: job, avatar: avatar,_id: userId}) {
    this._username.textContent = username;
    this._job.textContent = job;
    this.userId = userId;
    this.setUserAvatar({avatar});
 }
}
