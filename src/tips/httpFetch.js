import axios from "./request";

const httpFetch = {
  // 默认post请求
  defaultHttpPost: function (url, data, callback, error) {
    axios({
      url: url,
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (callback) callback(res);
      })
      .catch((err) => {
        if (error) error(err);
      });
  },
  // 默认get请求
  defaultHttpGet: function (url, data, callback, error) {
    axios({
      url: url,
      params: Object.assign(data, { t: new Date().getTime() }),
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        if (callback) callback(res);
      })
      .catch((err) => {
        if (error) error(err);
      });
  },
  //没有针对结果进行处理
  httpPostWithNoHandle: function (url, data, config) {
    let headers = Object.assign({ "Content-Type": "application/json" }, config);
    return axios({
      url: url,
      data: data,
      method: "post",
      headers,
    });
  },
  // 默认form请求
  defaultHttpForm4Excel: function (url, data, callback, error) {
    axios({
      url: url,
      data: data,
      method: "post",
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        if (callback) callback(res);
      })
      .catch((err) => {
        if (error) error(err);
      });
  },
  //没有针对结果进行处理
  httpGetWithNoHandle: function (url, data, config = {}) {
    let headers = Object.assign(
      { "Content-Type": "application/x-www-form-urlencoded" },
      config
    );
    return axios({
      url: url,
      params: Object.assign(data, { t: new Date().getTime() }),
      method: "get",
      headers,
    });
  },
  // 自定义请求头信息
  httpCustomHeadersPost: function (
    url,
    config,
    data,
    callback,
    error,
    onUploadProgress
  ) {
    axios({
      url: url,
      data: data,
      method: "post",
      timeout: config.timeout ? config.timeout : 15000,
      onUploadProgress, //文件上传进度条显示使用
      headers: config,
    })
      .then((res) => {
        if (callback) callback(res);
      })
      .catch((err) => {
        if (error) error(err);
      });
  },
  //文件下载处理的
  defaultDownloadPost: function (url, params, fileName, callback, error) {
    axios({
      url: url,
      data: params,
      method: "post",
      timeout: 1000 * 60 * 60, //改为1小时超时
      responseType: "blob",
    })
      .then((res) => {
        let data = res.data;
        fileName ? fileName : (fileName = "download");
        if (!data) {
          return;
        }
        let blob;
        if (fileName.indexOf("pdf") !== -1 || fileName.indexOf("PDF") !== -1) {
          blob = new Blob([data], { type: "application/pdf" });
        } else if (
          fileName.indexOf("docx") !== -1 ||
          fileName.indexOf("DOCX") !== -1
        ) {
          blob = new Blob([data], { type: "application/docx" });
        } else if (
          fileName.indexOf("zip") !== -1 ||
          fileName.indexOf("ZIP") !== -1
        ) {
          blob = new Blob([data], { type: "application/zip" });
        } else if (
          fileName.indexOf("jpg") !== -1 ||
          fileName.indexOf("JPG") !== -1
        ) {
          blob = new Blob([data], { type: "application/jpg" });
        } else if (
          fileName.indexOf("jpeg") !== -1 ||
          fileName.indexOf("JPEG") !== -1
        ) {
          blob = new Blob([data], { type: "application/jpeg" });
        } else if (
          fileName.indexOf("png") !== -1 ||
          fileName.indexOf("PNG") !== -1
        ) {
          blob = new Blob([data], { type: "application/png" });
        } else if (
          fileName.indexOf("gif") !== -1 ||
          fileName.indexOf("GIF") !== -1
        ) {
          blob = new Blob([data], { type: "application/gif" });
        } else if (
          fileName.indexOf("tiff") !== -1 ||
          fileName.indexOf("TIFF") !== -1
        ) {
          blob = new Blob([data], { type: "application/tiff" });
        } else if (
          fileName.indexOf("bmp") !== -1 ||
          fileName.indexOf("BMP") !== -1
        ) {
          blob = new Blob([data], { type: "application/bmp" });
        } else if (
          fileName.indexOf("xls") !== -1 ||
          fileName.indexOf("XLS") !== -1
        ) {
          blob = new Blob([data], { type: "application/xls" });
        } else if (
          fileName.indexOf("xlsx") !== -1 ||
          fileName.indexOf("XLSX") !== -1
        ) {
          blob = new Blob([data], { type: "application/xlsx" });
        } else {
          blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8",
          });
        }

        let url = window.URL.createObjectURL(blob);

        if ("download" in document.createElement("a")) {
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(a.href);
          document.body.removeChild(a);
        } else {
          navigator.msSaveBlob(blob);
        }
        if (callback) callback(res);
      })
      .catch((err) => {
        if (error) error(err);
      });
  },
};

export default httpFetch;
