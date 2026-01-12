import generateUrl from "../utils/generateUrl"

type GitlabAuth = {
  /**
   * Client ID приложения GitLab OAuth
   * Получается при регистрации приложения в GitLab: Settings → Applications
   * Обязательный параметр
   */
  client_id: string

  /**
   * URI для возврата после авторизации
   * Должен совпадать с указанным в настройках OAuth приложения GitLab
   * Обязательный параметр
   */
  redirect_uri: string

  /**
   * Запрашиваемые права доступа (OAuth scopes)
   * Массив строк с правами для доступа к данным пользователя
   * Основные scopes:
   *
   * API доступ:
   * - 'api' - полный доступ к API (чтение/запись)
   * - 'read_api' - доступ к API только для чтения
   * - 'read_user' - доступ к информации о пользователе
   * - 'read_repository' - доступ к репозиториям
   * - 'write_repository' - запись в репозитории
   *
   * Репозитории:
   * - 'read_repository' - чтение репозиториев
   * - 'write_repository' - запись в репозитории
   *
   * Пользователь:
   * - 'read_user' - чтение информации о пользователе
   * - 'openid' - OpenID Connect авторизация
   * - 'profile' - доступ к профилю пользователя
   * - 'email' - доступ к email
   *
   * CI/CD:
   * - 'read_registry' - чтение из registry
   * - 'write_registry' - запись в registry
   *
   * Администрирование:
   * - 'sudo' - возможность выполнять действия от имени других пользователей
   * - 'admin_mode' - доступ к админским функциям
   *
   * GitLab SaaS (GitLab.com):
   * - 'read_api' - доступ к API GitLab.com
   * - 'write_repository' - запись в репозитории GitLab.com
   *
   * Полный список: https://docs.gitlab.com/ee/integration/oauth_provider.html#authorized-applications
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
   * В GitLab OAuth используется 'code' для Authorization Code Flow
   * Для PKCE используется 'code' с code_challenge
   * Значение по умолчанию: 'code'
   */
  response_type?: "code"

  /**
   * Запрашиваемые разрешения через GitLab
   * - 'read_user' - доступ к информации о пользователе
   * - 'api' - доступ к API
   * - 'read_repository' - доступ к репозиториям
   * Опциональный параметр
   */
  grant_type?: "authorization_code"

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

  /**
   * Базовый URL для OAuth авторизации GitLab
   * - GitLab SaaS (GitLab.com): 'https://gitlab.com/oauth/authorize'
   * - Self-hosted GitLab: 'https://your-gitlab-instance.com/oauth/authorize'
   * Опциональный параметр, по умолчанию GitLab.com
   */
  oauthBaseUrl?: string
}

function generateGitlabAuthUrl({
  oauthBaseUrl = "https://gitlab.com/oauth/authorize",
  ...otherProps
}: GitlabAuth): URL {
  if (!otherProps.client_id) {
    throw new Error("client_id is required")
  }

  if (!otherProps.redirect_uri) {
    throw new Error("redirect_uri is required")
  }

  return generateUrl({
    origin: oauthBaseUrl,
    searchParams: {
      ...{
        response_type: "code",
        grant_type: "authorization_code",
      },
      ...otherProps,
    },
  })
}

export default generateGitlabAuthUrl
