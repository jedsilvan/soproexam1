export const setCookie = (name, value, maxAgeSeconds) => {
  var maxAgeSegment = "; max-age=" + maxAgeSeconds;
  document.cookie = encodeURI(name) + "=" + encodeURI(value) + maxAgeSegment;
};

export const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const removeCookie = (name) => {
  document.cookie = name + "=; Max-Age=0";
};
