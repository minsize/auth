import generateUrl from "../utils/generateUrl"

type YandexAuth = {
  /**
   * ID приложения Яндекс OAuth (Client ID)
   * Получается при создании приложения в Яндекс OAuth: https://oauth.yandex.ru/
   * Обязательный параметр
   */
  client_id: string

  /**
   * URI для возврата после авторизации
   * Должен совпадать с указанным в настройках приложения Яндекс OAuth
   * Должен быть зарегистрирован в Яндекс.OAuth
   * Обязательный параметр
   */
  redirect_uri: string

  /**
   * Запрашиваемые права доступа (OAuth scopes)
   * Массив строк с правами для доступа к данным пользователя
   * Основные scopes:
   *
   * Базовая информация:
   * - 'login:info' - доступ к логину (обязательный минимум)
   * - 'login:email' - доступ к email адресу
   * - 'login:avatar' - доступ к аватару
   *
   * Данные Яндекс ID:
   * - 'login:birthday' - дата рождения
   * - 'login:gender' - пол
   * - 'login:name' - имя и фамилия
   * - 'login:phone' - номер телефона
   *
   * Яндекс.Диск:
   * - 'cloud_api:disk.app_folder' - доступ к папке приложения на Диске
   * - 'cloud_api:disk.read' - чтение файлов на Диске
   * - 'cloud_api:disk.write' - запись файлов на Диске
   *
   * Яндекс.Паспорт:
   * - 'passport:birthday' - доступ к дате рождения
   * - 'passport:email' - доступ к email
   * - 'passport:login' - доступ к логину
   *
   * Яндекс.Деньги:
   * - 'money-source.read' - чтение источников денег
   * - 'money-source.write' - запись источников денег
   * - 'payment-p2p' - переводы между пользователями
   *
   * Дополнительно:
   * - 'social:profile' - доступ к профилю в соцсетях
   * - 'social:friends' - доступ к друзьям
   * - 'social:photos' - доступ к фотографиям
   *
   * Полный список: https://yandex.ru/dev/id/doc/dg/oauth/concepts/scope.html
   * Опциональный параметр
   */
  scope?: string[]

  /**
   * Тип ответа OAuth (response_type)
   * - 'code' - код авторизации для обмена на токен (Authorization Code Flow)
   * - 'token' - токен доступа (Implicit Flow, для фронтенда)
   * В Яндекс OAuth также поддерживаются гибридные режимы:
   * - 'code token' - и код, и токен
   * - 'code id_token' - код и ID токен
   * Опциональный параметр, по умолчанию 'code'
   */
  response_type?: "code" | "token" | "code token" | "code id_token"

  /**
   * Строка состояния для защиты от CSRF-атак
   * Будет возвращена в ответе OAuth для проверки
   * Рекомендуется использовать для безопасности
   * Опциональный параметр
   */
  state?: string

  /**
   * Параметр для Proof Key for Code Exchange (PKCE)
   * Используется для защиты от атак подмены кода авторизации
   * Должен использоваться с code_challenge_method
   * Опциональный параметр, рекомендуется для SPA
   */
  code_challenge?: string

  /**
   * Метод для code_challenge в PKCE
   * - 'plain' - простой текст
   * - 'S256' - SHA256 хэш
   * Опциональный параметр
   */
  code_challenge_method?: "plain" | "S256"

  /**
   * Язык интерфейса авторизации
   * - 'ru' - русский (по умолчанию)
   * - 'en' - английский
   * - 'uk' - украинский
   * - 'be' - белорусский
   * - 'kk' - казахский
   * - 'tr' - турецкий
   * Опциональный параметр
   */
  lang?: "ru" | "en" | "uk" | "be" | "kk" | "tr"

  /**
   * Режим отображения формы авторизации
   * - '' - обычная форма
   * - 'lite' - облегченная форма (без логотипа и описания)
   * Опциональный параметр
   */
  display?: "" | "lite"

  /**
   * Формат ответа
   * - 'json' - JSON формат
   * - 'token' - фрагмент URL с токеном
   * - 'default' - стандартный формат
   * Опциональный параметр
   */
  response_format?: "json" | "token" | "default"

  /**
   * Принудительный показ формы авторизации
   * Если true - показывать форму даже если пользователь уже авторизован
   * Опциональный параметр, по умолчанию false
   */
  force_confirm?: boolean

  /**
   * Время жизни кода авторизации в секундах
   * Максимальное значение: 600 секунд (10 минут)
   * Опциональный параметр
   */
  expires_in?: number

  /**
   * Базовый URL для OAuth авторизации Яндекс
   * - Основной: 'https://oauth.yandex.ru/authorize'
   * - Яндекс ID: 'https://oauth.yandex.com/authorize' (международная версия)
   * Опциональный параметр, по умолчанию основной URL
   */
  oauthBaseUrl?: string
}

function generateYandexAuthUrl(
  {
    oauthBaseUrl = "https://oauth.yandex.ru/authorize",
    ...otherProps
  }: YandexAuth = {
    client_id: "",
    redirect_uri: "",
    response_type: "code",
  },
): URL {
  if (!otherProps.client_id) {
    throw new Error("client_id is required")
  }

  if (!otherProps.redirect_uri) {
    throw new Error("redirect_uri is required")
  }

  return generateUrl({
    origin: oauthBaseUrl,
    searchParams: otherProps,
  })
}

export default generateYandexAuthUrl
