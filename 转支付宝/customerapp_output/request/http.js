const wx2my = require('../wx2my');
const Behavior = require('../Behavior');
const app = getApp();
const baseURL = app.globalData.requestUrl;
/**
 * GET请求
 */

export const get = function (url, {
  data
} = {}) {
  return new Promise(function (resolve, reject) {
    var config = {
      method: 'GET'
    };
    let token = wx2my.getStorageSync('token');
    config.url = baseURL + url;
    config.data = data;
    config.header = {
      Authorization: token
    };

    config.success = function (res) {
      if (res.statusCode == 401) {
        wx2my.reLaunch({
          url: 'pages/login/login'
        });
      }

      resolve(res);
    };

    config.fail = function (err) {
      wx2my.showToast({
        title: '请求超时！请检查网络或稍后重试',
        icon: 'none',
        duration: 2000
      });
      reject(err);
    };

    wx2my.request(config);
  });
};
/**
 * POST请求
 */

export const post = function (url, {
  data
} = {}) {
  return new Promise(function (resolve, reject) {
    const config = {
      method: 'POST'
    };
    let token = wx2my.getStorageSync('token');
    config.url = baseURL + url;
    config.data = data;
    config.header = {
      Authorization: token
    };

    config.success = function (res) {
      if (res.statusCode == 401) {
        wx2my.reLaunch({
          url: 'pages/login/login'
        });
      }

      resolve(res);
    };

    config.fail = function (err) {
      wx2my.showToast({
        title: '请求超时！请检查网络或稍后重试',
        icon: 'none'
      });
      reject(err);
    };

    wx2my.request(config);
  });
};
/**
 * PUT请求
 */

export const put = function (url, {
  data
} = {}) {
  return new Promise(function (resolve, reject) {
    const config = {
      method: 'PUT'
    };
    let token = wx2my.getStorageSync('token');
    config.url = baseURL + url;
    config.data = data;
    config.header = {
      Authorization: token
    };

    config.success = function (res) {
      if (res.statusCode == 401) {
        wx2my.reLaunch({
          url: 'pages/login/login'
        });
      }

      resolve(res);
    };

    config.fail = function (err) {
      wx2my.showToast({
        title: '请求超时！请检查网络或稍后重试',
        icon: 'none'
      });
      reject(err);
    };

    wx2my.request(config);
  });
};
/**
 * DELETE请求
 */

export const del = function (url, {
  data
} = {}) {
  return new Promise(function (resolve, reject) {
    const config = {
      method: 'DELETE'
    };
    let token = wx2my.getStorageSync('token');
    config.url = baseURL + url;
    config.data = data;
    config.header = {
      Authorization: token
    };

    config.success = function (res) {
      if (res.statusCode == 401) {
        wx2my.reLaunch({
          url: 'pages/login/login'
        });
      }

      resolve(res);
    };

    config.fail = function (err) {
      wx2my.showToast({
        title: '请求超时！请检查网络或稍后重试',
        icon: 'none'
      });
      reject(err);
    };

    wx2my.request(config);
  });
};