export enum allRoutes {
  HOME = "/",
  LOGIN = "/login",
  PROCESS = "/process",
}

export enum screenRoutes {
  SCANNER_SCREEN = "/scanner",
  SCANNED_ITEM_SCREEN = "/scanned-item",
  SUMMARY_SCREEN = "/summary",
  PAYMENT_SCREEN = "/payment",
  SHOW_QR_SCREEN = "/show-qr",
}

export enum processScreenRoutes {
  PROCESS_SCANNER_SCREEN = allRoutes.PROCESS + screenRoutes.SCANNER_SCREEN,
  PROCESS_SCANNED_ITEM_SCREEN = allRoutes.PROCESS +
    screenRoutes.SCANNED_ITEM_SCREEN,
  PROCESS_SUMMARY_SCREEN = allRoutes.PROCESS + screenRoutes.SUMMARY_SCREEN,
  PROCESS_PAYMENT_SCREEN = allRoutes.PROCESS + screenRoutes.PAYMENT_SCREEN,
  PROCESS_SHOW_QR_SCREEN = allRoutes.PROCESS + screenRoutes.SHOW_QR_SCREEN,
}
