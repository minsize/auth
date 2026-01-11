import generateUrl from "../utils/generateUrl"

type TelegramAuth = {
  bot_id: string
  request_access?: string
  lang?: string
  origin?: string
  return_to?: string
  widgetsOrigin?: string
}

function generateTelegramAuthUrl({
  widgetsOrigin = "https://oauth.telegram.org/auth",
  ...otherProps
}: TelegramAuth): URL {
  if (!otherProps.bot_id) {
    throw new Error("bot_id is required")
  }

  if (!otherProps.origin) {
    otherProps.origin =
      window.location.origin ||
      window.location.protocol + "//" + window.location.hostname
  }

  if (!otherProps.return_to) {
    otherProps.return_to = window.location.href
  }

  return generateUrl({
    origin: widgetsOrigin,
    searchParams: otherProps,
  })
}

export default generateTelegramAuthUrl
