import generateUrl from "../utils/generateUrl"

type GithubAuth = {
  /**
   * Client ID приложения GitHub OAuth
   * Получается при регистрации приложения в GitHub: Settings → Developer settings → OAuth Apps
   * Обязательный параметр
   */
  client_id: string

  /**
   * URI для возврата после авторизации
   * Должен совпадать с указанным в настройках OAuth приложения GitHub
   * Обязательный параметр
   */
  redirect_uri: string

  /**
   * Запрашиваемые права доступа (OAuth scopes)
   * Массив строк с правами для доступа к данным пользователя
   * Основные scopes:
   *
   * Пользователь:
   * - 'user' - доступ к профилю пользователя (чтение)
   * - 'user:email' - доступ к email адресам (только чтение)
   * - 'user:follow' - возможность подписываться/отписываться
   *
   * Публичные данные:
   * - 'public_repo' - доступ к публичным репозиториям (чтение/запись)
   * - 'repo' - полный доступ к репозиториям (включая приватные)
   * - 'repo:status' - доступ к статусам коммитов
   * - 'repo_deployment' - доступ к деплойментам
   *
   * Администрирование:
   * - 'admin:org' - полный доступ к организациям
   * - 'write:org' - запись в организации
   * - 'read:org' - чтение организаций
   *
   * Gists:
   * - 'gist' - создание и редактирование gists
   *
   * Нотификации:
   * - 'notifications' - доступ к уведомлениям
   *
   * SSH ключи:
   * - 'write:public_key' - управление SSH ключами
   * - 'read:public_key' - чтение SSH ключей
   *
   * Деплоймент:
   * - 'read:packages' - чтение пакетов
   * - 'write:packages' - запись пакетов
   *
   * Полный список: https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
   * Опциональный параметр
   */
  scope?: string[]

  /**
   * Строка состояния для защиты от CSRF-атак
   * Будет возвращена в ответе OAuth для проверки
   * Рекомендуется использовать для безопасности
   * Опциональный параметр
   */
  state?: string

  /**
   * Тип ответа OAuth (response_type)
   * В GitHub OAuth всегда используется 'code' для Authorization Code Flow
   * Для PKCE используется 'code' с code_challenge
   * Значение по умолчанию: 'code'
   */
  response_type?: "code"

  /**
   * Позволяет повторно запросить авторизацию у пользователя
   * Если true - GitHub покажет диалог авторизации даже если пользователь уже авторизовал приложение
   * Опциональный параметр, по умолчанию false
   */
  allow_signup?: boolean

  /**
   * Имя пользователя для предзаполнения поля логина
   * Может использоваться для улучшения UX
   * Опциональный параметр
   */
  login?: string

  /**
   * Базовый URL для OAuth авторизации GitHub
   * - Основной: 'https://github.com/login/oauth/authorize'
   * - GitHub Enterprise: 'https://your-github-enterprise.com/login/oauth/authorize'
   * Опциональный параметр, по умолчанию основной URL
   */
  oauthBaseUrl?: string

  /**
   * Параметр для Proof Key for Code Exchange (PKCE)
   * Используется для защиты от атак подмены кода авторизации
   * Должен использоваться с code_challenge_method
   * Опциональный параметр, рекомендуется для SPA
   */
  code_challenge?: string

  /**
   * Метод для code_challenge в PKCE
   * - 'plain' - простой текст (не рекомендуется)
   * - 'S256' - SHA256 хэш (рекомендуется)
   * Опциональный параметр
   */
  code_challenge_method?: "plain" | "S256"
}

function generateGithubAuthUrl(
  {
    oauthBaseUrl = "https://github.com/login/oauth/authorize",
    ...otherProps
  }: GithubAuth = {
    client_id: "",
    redirect_uri: "",
    response_type: "code",
    allow_signup: true,
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

export default generateGithubAuthUrl
