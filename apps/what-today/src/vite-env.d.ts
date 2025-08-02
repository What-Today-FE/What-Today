/// <reference types="vite/client" />

// Google Translate 타입 선언 (any로 단순화)
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: any;
  }
}
