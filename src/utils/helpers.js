class CookieManager {
   static getCookie(name) {
      if (typeof document === "undefined") {
         return null;
      }
      const cookieValue = document.cookie
         .split("; ")
         .find((row) => row.startsWith(name))
         ?.split("=")[1];
      return cookieValue ? decodeURIComponent(cookieValue) : null;
   }

   static setCookie(name, value, days = 7) {
      if (typeof document === "undefined") {
         return;
      }
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${encodeURIComponent(
         value
      )}; expires=${expires.toUTCString()}; path=/`;
   }

   static deleteCookie(name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
   }
}

class Utility {
   static formatName(str) {
      return str
         ?.replace(/[_-]/g, " ")
         .split(" ")
         .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
         .join(" ");
}

   static handleBack() {
      window.history.back();
   }
}

export { CookieManager, Utility };
