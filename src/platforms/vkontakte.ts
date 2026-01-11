import generateUrl from "../utils/generateUrl"

type VkontakteAuth = {
  /**
   * ID приложения VK (Client ID)
   * Получается при создании приложения в VK
   * Обязательный параметр
   */
  client_id: number

  /**
   * URI для возврата после авторизации
   * Должен совпадать с указанным в настройках приложения VK
   * Обязательный параметр
   */
  redirect_uri: string

  /**
   * Тип отображения окна авторизации
   * - 'page' - полная страница (по умолчанию)
   * - 'popup' - всплывающее окно
   * - 'mobile' - мобильная версия
   * - 'wap' - версия для WAP-браузеров
   * Опциональный параметр, по умолчанию 'page'
   */
  display?: "page" | "popup" | "mobile" | "wap"

  /**
   * Запрашиваемые права доступа (permissions)
   * Массив строк с правами, которые будет запрашивать приложение
   * Основные права:
   * - 'friends' - доступ к списку друзей
   * - 'photos' - доступ к фотографиям
   * - 'wall' - доступ к записям на стене
   * - 'offline' - бессрочный доступ (токен без срока действия)
   * - 'email' - получение email пользователя
   * - 'groups' - доступ к группам пользователя
   * - 'notify' - доступ к уведомлениям
   * - 'stats' - доступ к статистике
   * - 'market' - доступ к товарам
   * - 'docs' - доступ к документам
   * Полный список: https://dev.vk.com/reference/access-rights
   * Опциональный параметр
   */
  scope?: string[]

  /**
   * Тип ответа OAuth
   * - 'code' - код авторизации для обмена на токен (Authorization Code Flow)
   * - 'token' - токен доступа (Implicit Flow, для фронтенда)
   * - 'code token' - и код, и токен
   * Опциональный параметр, по умолчанию 'code'
   */
  response_type?: "code" | "token" | "code token"

  /**
   * Строка состояния для защиты от CSRF-атак
   * Будет возвращена в ответе OAuth для проверки
   * Рекомендуется использовать для безопасности
   * Опциональный параметр
   */
  state?: string

  /**
   * Флаг принудительного запроса разрешений
   * - true: всегда показывать диалог запроса прав
   * - false: не показывать, если права уже предоставлены
   * Опциональный параметр, по умолчанию true
   */
  revoke?: boolean

  /**
   * Версия API VK
   * Рекомендуется использовать актуальную версию
   * Опциональный параметр, по умолчанию 5.199
   */
  v?: number

  /**
   * Язык интерфейса авторизации
   * - 'ru' - русский
   * - 'en' - английский
   * - 'uk' - украинский
   * - 'be' - белорусский
   * - 'es' - испанский
   * - 'fi' - финский
   * - 'de' - немецкий
   * - 'it' - итальянский
   * - 'kz' - казахский
   * - 'pt' - португальский
   * - 'tr' - турецкий
   * Опциональный параметр
   */
  lang?:
    | "ru"
    | "en"
    | "uk"
    | "be"
    | "es"
    | "fi"
    | "de"
    | "it"
    | "kz"
    | "pt"
    | "tr"

  /**
   * Базовый URL для OAuth авторизации
   * Можно изменить для тестирования или использования альтернативных серверов
   * - Основной: 'https://oauth.vk.com/authorize'
   * - Тестовый: 'https://test.oauth.vk.com/authorize'
   * Опциональный параметр, по умолчанию основной URL
   */
  oauthBaseUrl?: string
}

function generateVkontakteAuthUrl({
  oauthBaseUrl = "https://oauth.vk.ru/authorize",
  ...otherProps
}: VkontakteAuth): URL {
  if (!otherProps.client_id) {
    throw new Error("client_id is required")
  }

  if (!otherProps.redirect_uri) {
    throw new Error("redirect_uri is required")
  }

  return generateUrl({
    origin: oauthBaseUrl,
    searchParams: {
      ...{ display: "page", response_type: "code", revoke: true, v: 5.99 },
      ...otherProps,
    },
  })
}

export default generateVkontakteAuthUrl
