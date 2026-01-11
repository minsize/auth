type TelegramAuth = {
    bot_id: string;
    request_access?: string;
    lang?: string;
    origin?: string;
    return_to?: string;
    widgetsOrigin?: string;
};
declare function generateTelegramAuthUrl({ widgetsOrigin, ...otherProps }: TelegramAuth): URL;

type VkontakteAuth = {
    /**
     * ID приложения VK (Client ID)
     * Получается при создании приложения в VK
     * Обязательный параметр
     */
    client_id: number;
    /**
     * URI для возврата после авторизации
     * Должен совпадать с указанным в настройках приложения VK
     * Обязательный параметр
     */
    redirect_uri: string;
    /**
     * Тип отображения окна авторизации
     * - 'page' - полная страница (по умолчанию)
     * - 'popup' - всплывающее окно
     * - 'mobile' - мобильная версия
     * - 'wap' - версия для WAP-браузеров
     * Опциональный параметр, по умолчанию 'page'
     */
    display?: "page" | "popup" | "mobile" | "wap";
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
    scope?: string[];
    /**
     * Тип ответа OAuth
     * - 'code' - код авторизации для обмена на токен (Authorization Code Flow)
     * - 'token' - токен доступа (Implicit Flow, для фронтенда)
     * - 'code token' - и код, и токен
     * Опциональный параметр, по умолчанию 'code'
     */
    response_type?: "code" | "token" | "code token";
    /**
     * Строка состояния для защиты от CSRF-атак
     * Будет возвращена в ответе OAuth для проверки
     * Рекомендуется использовать для безопасности
     * Опциональный параметр
     */
    state?: string;
    /**
     * Флаг принудительного запроса разрешений
     * - true: всегда показывать диалог запроса прав
     * - false: не показывать, если права уже предоставлены
     * Опциональный параметр, по умолчанию true
     */
    revoke?: boolean;
    /**
     * Версия API VK
     * Рекомендуется использовать актуальную версию
     * Опциональный параметр, по умолчанию 5.199
     */
    v?: number;
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
    lang?: "ru" | "en" | "uk" | "be" | "es" | "fi" | "de" | "it" | "kz" | "pt" | "tr";
    /**
     * Базовый URL для OAuth авторизации
     * Можно изменить для тестирования или использования альтернативных серверов
     * - Основной: 'https://oauth.vk.com/authorize'
     * - Тестовый: 'https://test.oauth.vk.com/authorize'
     * Опциональный параметр, по умолчанию основной URL
     */
    oauthBaseUrl?: string;
};
declare function generateVkontakteAuthUrl({ oauthBaseUrl, ...otherProps }: VkontakteAuth): URL;

type GithubAuth = {
    /**
     * Client ID приложения GitHub OAuth
     * Получается при регистрации приложения в GitHub: Settings → Developer settings → OAuth Apps
     * Обязательный параметр
     */
    client_id: string;
    /**
     * URI для возврата после авторизации
     * Должен совпадать с указанным в настройках OAuth приложения GitHub
     * Обязательный параметр
     */
    redirect_uri: string;
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
    scope?: string[];
    /**
     * Строка состояния для защиты от CSRF-атак
     * Будет возвращена в ответе OAuth для проверки
     * Рекомендуется использовать для безопасности
     * Опциональный параметр
     */
    state?: string;
    /**
     * Тип ответа OAuth (response_type)
     * В GitHub OAuth всегда используется 'code' для Authorization Code Flow
     * Для PKCE используется 'code' с code_challenge
     * Значение по умолчанию: 'code'
     */
    response_type?: "code";
    /**
     * Позволяет повторно запросить авторизацию у пользователя
     * Если true - GitHub покажет диалог авторизации даже если пользователь уже авторизовал приложение
     * Опциональный параметр, по умолчанию false
     */
    allow_signup?: boolean;
    /**
     * Имя пользователя для предзаполнения поля логина
     * Может использоваться для улучшения UX
     * Опциональный параметр
     */
    login?: string;
    /**
     * Базовый URL для OAuth авторизации GitHub
     * - Основной: 'https://github.com/login/oauth/authorize'
     * - GitHub Enterprise: 'https://your-github-enterprise.com/login/oauth/authorize'
     * Опциональный параметр, по умолчанию основной URL
     */
    oauthBaseUrl?: string;
    /**
     * Параметр для Proof Key for Code Exchange (PKCE)
     * Используется для защиты от атак подмены кода авторизации
     * Должен использоваться с code_challenge_method
     * Опциональный параметр, рекомендуется для SPA
     */
    code_challenge?: string;
    /**
     * Метод для code_challenge в PKCE
     * - 'plain' - простой текст (не рекомендуется)
     * - 'S256' - SHA256 хэш (рекомендуется)
     * Опциональный параметр
     */
    code_challenge_method?: "plain" | "S256";
};
declare function generateGithubAuthUrl({ oauthBaseUrl, ...otherProps }: GithubAuth): URL;

type YandexAuth = {
    /**
     * ID приложения Яндекс OAuth (Client ID)
     * Получается при создании приложения в Яндекс OAuth: https://oauth.yandex.ru/
     * Обязательный параметр
     */
    client_id: string;
    /**
     * URI для возврата после авторизации
     * Должен совпадать с указанным в настройках приложения Яндекс OAuth
     * Должен быть зарегистрирован в Яндекс.OAuth
     * Обязательный параметр
     */
    redirect_uri: string;
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
    scope?: string[];
    /**
     * Тип ответа OAuth (response_type)
     * - 'code' - код авторизации для обмена на токен (Authorization Code Flow)
     * - 'token' - токен доступа (Implicit Flow, для фронтенда)
     * В Яндекс OAuth также поддерживаются гибридные режимы:
     * - 'code token' - и код, и токен
     * - 'code id_token' - код и ID токен
     * Опциональный параметр, по умолчанию 'code'
     */
    response_type?: "code" | "token" | "code token" | "code id_token";
    /**
     * Строка состояния для защиты от CSRF-атак
     * Будет возвращена в ответе OAuth для проверки
     * Рекомендуется использовать для безопасности
     * Опциональный параметр
     */
    state?: string;
    /**
     * Параметр для Proof Key for Code Exchange (PKCE)
     * Используется для защиты от атак подмены кода авторизации
     * Должен использоваться с code_challenge_method
     * Опциональный параметр, рекомендуется для SPA
     */
    code_challenge?: string;
    /**
     * Метод для code_challenge в PKCE
     * - 'plain' - простой текст
     * - 'S256' - SHA256 хэш
     * Опциональный параметр
     */
    code_challenge_method?: "plain" | "S256";
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
    lang?: "ru" | "en" | "uk" | "be" | "kk" | "tr";
    /**
     * Режим отображения формы авторизации
     * - '' - обычная форма
     * - 'lite' - облегченная форма (без логотипа и описания)
     * Опциональный параметр
     */
    display?: "" | "lite";
    /**
     * Формат ответа
     * - 'json' - JSON формат
     * - 'token' - фрагмент URL с токеном
     * - 'default' - стандартный формат
     * Опциональный параметр
     */
    response_format?: "json" | "token" | "default";
    /**
     * Принудительный показ формы авторизации
     * Если true - показывать форму даже если пользователь уже авторизован
     * Опциональный параметр, по умолчанию false
     */
    force_confirm?: boolean;
    /**
     * Время жизни кода авторизации в секундах
     * Максимальное значение: 600 секунд (10 минут)
     * Опциональный параметр
     */
    expires_in?: number;
    /**
     * Базовый URL для OAuth авторизации Яндекс
     * - Основной: 'https://oauth.yandex.ru/authorize'
     * - Яндекс ID: 'https://oauth.yandex.com/authorize' (международная версия)
     * Опциональный параметр, по умолчанию основной URL
     */
    oauthBaseUrl?: string;
};
declare function generateYandexAuthUrl({ oauthBaseUrl, ...otherProps }: YandexAuth): URL;

export { generateGithubAuthUrl, generateTelegramAuthUrl, generateVkontakteAuthUrl, generateYandexAuthUrl };
