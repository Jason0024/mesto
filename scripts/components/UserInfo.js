export default class UserInfo {
  constructor({ username, job }) {
    this._username = document.querySelector(username);
    this._job = document.querySelector(job);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      username: this._username.textContent,
      job: this._job.textContent
    }

    return userInfo;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userdata) {
    this._username.textContent = userdata.username;
    this._job.textContent = userdata.job;
  }
}
