const setSplit = (value1: string, value2: string) => {
  const splitby = "%*-)";
  return `${value1}${splitby}${value2}`;
};
const getSplit = (value: string) => {
  const splitby = "%*-)";
  const [value1, value2] = value.split(splitby);
  return {
    value1,
    value2,
  };
};

const checkEmtyObj = (obj: any) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // @ts-ignore
      if (typeof obj[key] === "boolean") {
        continue;
      }
      // @ts-ignore
      if (!obj[key]) {
        return true;
      }
    }
  }
  return false;
};

const setCookie = (name: string, value: string, days?: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const getCookie = (name: string) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
};

const downloadCsvFile = (fileData: any, name: string) => {
  const blob = new Blob([fileData], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `res_${name}`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};

export {
  getSplit,
  setSplit,
  checkEmtyObj,
  setCookie,
  getCookie,
  downloadCsvFile,
};
