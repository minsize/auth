import {
  generateTelegramAuthUrl,
  generateVkontakteAuthUrl,
  generateGithubAuthUrl,
  generateYandexAuthUrl,
} from "../src/index"

describe("OAuth URL генераторы", () => {
  // 1. Тестирование Telegram OAuth
  describe("Telegram OAuth", () => {
    test("генерация базового Telegram OAuth URL с явными параметрами", () => {
      const url = generateTelegramAuthUrl({
        bot_id: "1234567890",
        origin: "https://custom.com",
        return_to: "https://custom.com/callback",
      })

      expect(url.href).toContain("https://oauth.telegram.org/auth?")
      expect(url.searchParams.get("bot_id")).toBe("1234567890")
      expect(url.searchParams.get("origin")).toBe("https://custom.com")
      expect(url.searchParams.get("return_to")).toBe(
        "https://custom.com/callback",
      )
    })

    test("генерация Telegram OAuth URL с дополнительными параметрами", () => {
      const url = generateTelegramAuthUrl({
        bot_id: "1234567890",
        request_access: "write",
        lang: "ru",
        origin: "https://custom.com",
        return_to: "https://custom.com/callback",
      })

      expect(url.searchParams.get("request_access")).toBe("write")
      expect(url.searchParams.get("lang")).toBe("ru")
      expect(url.searchParams.get("origin")).toBe("https://custom.com")
      expect(url.searchParams.get("return_to")).toBe(
        "https://custom.com/callback",
      )
    })

    test("генерация Telegram OAuth URL с кастомным widgetsOrigin", () => {
      const url = generateTelegramAuthUrl({
        bot_id: "1234567890",
        widgetsOrigin: "https://custom.telegram.org/auth",
        origin: "https://test.com",
        return_to: "https://test.com/page",
      })

      expect(url.origin).toBe("https://custom.telegram.org")
      expect(url.pathname).toBe("/auth")
      expect(url.searchParams.get("bot_id")).toBe("1234567890")
    })

    test("ошибка при отсутствии bot_id", () => {
      expect(() =>
        generateTelegramAuthUrl({
          bot_id: "",
          origin: "https://test.com",
          return_to: "https://test.com/page",
        } as any),
      ).toThrow("bot_id is required")
    })
  })

  // 2. Тестирование VK OAuth
  describe("VK OAuth", () => {
    const baseVkOptions = {
      client_id: 1234567,
      redirect_uri: "https://example.com/callback",
    }

    test("генерация базового VK OAuth URL", () => {
      const url = generateVkontakteAuthUrl(baseVkOptions)

      expect(url.href).toContain("https://oauth.vk.ru/authorize?")
      expect(url.searchParams.get("client_id")).toBe("1234567")
      expect(url.searchParams.get("redirect_uri")).toBe(
        "https://example.com/callback",
      )
      expect(url.searchParams.get("display")).toBe("page")
      expect(url.searchParams.get("response_type")).toBe("code")
      expect(url.searchParams.get("revoke")).toBe("1")
      expect(url.searchParams.get("v")).toBe("5.99")
    })

    test("генерация VK OAuth URL с полным набором параметров", () => {
      const url = generateVkontakteAuthUrl({
        ...baseVkOptions,
        display: "popup",
        scope: ["friends", "photos", "email"],
        response_type: "token",
        state: "security_token_123",
        revoke: false,
        v: 5.199,
        lang: "ru",
        oauthBaseUrl: "https://test.oauth.vk.com/authorize",
      })

      expect(url.searchParams.get("display")).toBe("popup")
      expect(url.searchParams.get("scope")).toBe("friends,photos,email")
      expect(url.searchParams.get("response_type")).toBe("token")
      expect(url.searchParams.get("state")).toBe("security_token_123")
      expect(url.searchParams.get("revoke")).toBe("0")
      expect(url.searchParams.get("v")).toBe("5.199")
      expect(url.searchParams.get("lang")).toBe("ru")
      expect(url.origin).toBe("https://test.oauth.vk.com")
    })

    test("генерация VK OAuth URL с пустым scope", () => {
      const url = generateVkontakteAuthUrl({
        ...baseVkOptions,
        scope: [],
      })

      expect(url.searchParams.get("scope")).toBe("")
    })

    test("генерация VK OAuth URL с одиночным scope", () => {
      const url = generateVkontakteAuthUrl({
        ...baseVkOptions,
        scope: ["friends"],
      })

      expect(url.searchParams.get("scope")).toBe("friends")
    })

    test("ошибка при отсутствии client_id", () => {
      expect(() =>
        generateVkontakteAuthUrl({
          client_id: 0,
          redirect_uri: "https://example.com/callback",
        }),
      ).toThrow("client_id is required")
    })

    test("ошибка при отсутствии redirect_uri", () => {
      expect(() =>
        generateVkontakteAuthUrl({
          client_id: 1234567,
          redirect_uri: "",
        }),
      ).toThrow("redirect_uri is required")
    })
  })

  // 3. Тестирование GitHub OAuth
  describe("GitHub OAuth", () => {
    const baseGithubOptions = {
      client_id: "Iv1.1234567890abcdef",
      redirect_uri: "https://example.com/callback",
    }

    test("генерация базового GitHub OAuth URL", () => {
      const url = generateGithubAuthUrl(baseGithubOptions)

      expect(url.href).toContain("https://github.com/login/oauth/authorize?")
      expect(url.searchParams.get("client_id")).toBe("Iv1.1234567890abcdef")
      expect(url.searchParams.get("redirect_uri")).toBe(
        "https://example.com/callback",
      )
      expect(url.searchParams.get("response_type")).toBe("code")
      expect(url.searchParams.get("allow_signup")).toBe("1")
    })

    test("генерация GitHub OAuth URL с полным набором параметров", () => {
      const url = generateGithubAuthUrl({
        ...baseGithubOptions,
        scope: ["user", "user:email", "repo"],
        state: "security_token_123",
        allow_signup: false,
        login: "testuser",
        code_challenge: "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM",
        code_challenge_method: "S256",
        oauthBaseUrl: "https://enterprise.github.com/login/oauth/authorize",
      })

      expect(url.searchParams.get("scope")).toBe("user,user:email,repo")
      expect(url.searchParams.get("state")).toBe("security_token_123")
      expect(url.searchParams.get("allow_signup")).toBe("0")
      expect(url.searchParams.get("login")).toBe("testuser")
      expect(url.searchParams.get("code_challenge")).toBe(
        "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM",
      )
      expect(url.searchParams.get("code_challenge_method")).toBe("S256")
      expect(url.origin).toBe("https://enterprise.github.com")
    })

    test("генерация GitHub OAuth URL с PKCE только challenge", () => {
      const url = generateGithubAuthUrl({
        ...baseGithubOptions,
        code_challenge: "test_challenge",
      })

      expect(url.searchParams.get("code_challenge")).toBe("test_challenge")
      expect(url.searchParams.get("code_challenge_method")).toBeNull()
    })

    test("генерация GitHub OAuth URL с пустым scope", () => {
      const url = generateGithubAuthUrl({
        ...baseGithubOptions,
        scope: [],
      })

      expect(url.searchParams.get("scope")).toBe("")
    })

    test("ошибка при отсутствии client_id", () => {
      expect(() =>
        generateGithubAuthUrl({
          client_id: "",
          redirect_uri: "https://example.com/callback",
        }),
      ).toThrow("client_id is required")
    })

    test("ошибка при отсутствии redirect_uri", () => {
      expect(() =>
        generateGithubAuthUrl({
          client_id: "Iv1.1234567890abcdef",
          redirect_uri: "",
        }),
      ).toThrow("redirect_uri is required")
    })
  })

  // 4. Тестирование Яндекс OAuth
  describe("Яндекс OAuth", () => {
    const baseYandexOptions = {
      client_id: "1234567890abcdef1234567890abcdef",
      redirect_uri: "https://example.com/callback",
    }

    test("генерация базового Яндекс OAuth URL", () => {
      const url = generateYandexAuthUrl(baseYandexOptions)

      expect(url.href).toContain("https://oauth.yandex.ru/authorize?")
      expect(url.searchParams.get("client_id")).toBe(
        "1234567890abcdef1234567890abcdef",
      )
      expect(url.searchParams.get("redirect_uri")).toBe(
        "https://example.com/callback",
      )
      expect(url.searchParams.get("response_type")).toBe("code")
    })

    test("генерация Яндекс OAuth URL с полным набором параметров", () => {
      const url = generateYandexAuthUrl({
        ...baseYandexOptions,
        scope: ["login:info", "login:email", "login:avatar"],
        response_type: "token",
        state: "security_token_123",
        lang: "en",
        display: "lite",
        response_format: "json",
        force_confirm: true,
        expires_in: 300,
        code_challenge: "test_challenge",
        code_challenge_method: "S256",
        oauthBaseUrl: "https://oauth.yandex.com/authorize",
      })

      expect(url.searchParams.get("scope")).toBe(
        "login:info,login:email,login:avatar",
      )
      expect(url.searchParams.get("response_type")).toBe("token")
      expect(url.searchParams.get("state")).toBe("security_token_123")
      expect(url.searchParams.get("lang")).toBe("en")
      expect(url.searchParams.get("display")).toBe("lite")
      expect(url.searchParams.get("response_format")).toBe("json")
      expect(url.searchParams.get("force_confirm")).toBe("1")
      expect(url.searchParams.get("expires_in")).toBe("300")
      expect(url.searchParams.get("code_challenge")).toBe("test_challenge")
      expect(url.searchParams.get("code_challenge_method")).toBe("S256")
      expect(url.origin).toBe("https://oauth.yandex.com")
    })

    test("генерация Яндекс OAuth URL с гибридным response_type", () => {
      const url = generateYandexAuthUrl({
        ...baseYandexOptions,
        response_type: "code token",
      })

      expect(url.searchParams.get("response_type")).toBe("code token")
    })

    test("генерация Яндекс OAuth URL с force_confirm = false", () => {
      const url = generateYandexAuthUrl({
        ...baseYandexOptions,
        force_confirm: false,
      })

      expect(url.searchParams.get("force_confirm")).toBe("0")
    })

    test("генерация Яндекс OAuth URL без force_confirm", () => {
      const url = generateYandexAuthUrl(baseYandexOptions)

      expect(url.searchParams.get("force_confirm")).toBeNull()
    })

    test("генерация Яндекс OAuth URL с пустым scope", () => {
      const url = generateYandexAuthUrl({
        ...baseYandexOptions,
        scope: [],
      })

      expect(url.searchParams.get("scope")).toBe("")
    })

    test("ошибка при отсутствии client_id", () => {
      expect(() =>
        generateYandexAuthUrl({
          client_id: "",
          redirect_uri: "https://example.com/callback",
        }),
      ).toThrow("client_id is required")
    })

    test("ошибка при отсутствии redirect_uri", () => {
      expect(() =>
        generateYandexAuthUrl({
          client_id: "1234567890abcdef1234567890abcdef",
          redirect_uri: "",
        }),
      ).toThrow("redirect_uri is required")
    })
  })

  // 5. Интеграционные тесты
  describe("Интеграционные тесты", () => {
    test("проверка URLSearchParams правильной кодировки", () => {
      const url = generateGithubAuthUrl({
        client_id: "Iv1.test",
        redirect_uri: "https://example.com/callback?param=value&another=test",
      })

      expect(url.searchParams.get("redirect_uri")).toBe(
        "https://example.com/callback?param=value&another=test",
      )
    })

    test("проверка обработки спецсимволов", () => {
      const url = generateVkontakteAuthUrl({
        client_id: 1234567,
        redirect_uri: "https://example.com/callback#section",
        state: "test#with#hashes",
      })

      expect(url.searchParams.get("redirect_uri")).toBe(
        "https://example.com/callback#section",
      )
      expect(url.searchParams.get("state")).toBe("test#with#hashes")
    })

    test("проверка валидации всех URL параметров", () => {
      const telegramUrl = generateTelegramAuthUrl({
        bot_id: "123",
        origin: "https://test.com",
        return_to: "https://test.com/page",
      })
      const vkUrl = generateVkontakteAuthUrl({
        client_id: 123,
        redirect_uri: "https://test.com",
      })
      const githubUrl = generateGithubAuthUrl({
        client_id: "test",
        redirect_uri: "https://test.com",
      })
      const yandexUrl = generateYandexAuthUrl({
        client_id: "test",
        redirect_uri: "https://test.com",
      })

      expect(telegramUrl).toBeInstanceOf(URL)
      expect(vkUrl).toBeInstanceOf(URL)
      expect(githubUrl).toBeInstanceOf(URL)
      expect(yandexUrl).toBeInstanceOf(URL)
    })
  })

  // 6. Тестирование edge cases
  describe("Edge cases", () => {
    test("Telegram OAuth с нулевым bot_id", () => {
      expect(() =>
        generateTelegramAuthUrl({
          bot_id: "0",
          origin: "https://test.com",
          return_to: "https://test.com/page",
        }),
      ).not.toThrow()
    })

    test("VK OAuth с отрицательным client_id", () => {
      const url = generateVkontakteAuthUrl({
        client_id: -123,
        redirect_uri: "https://test.com",
      })

      expect(url.searchParams.get("client_id")).toBe("-123")
    })

    test("GitHub OAuth с очень длинным client_id", () => {
      const longId = "Iv1." + "a".repeat(100)
      const url = generateGithubAuthUrl({
        client_id: longId,
        redirect_uri: "https://test.com",
      })

      expect(url.searchParams.get("client_id")).toBe(longId)
    })

    test("Яндекс OAuth с нестандартными scope", () => {
      const url = generateYandexAuthUrl({
        client_id: "test",
        redirect_uri: "https://test.com",
        scope: ["custom:scope", "another:permission"],
      })

      expect(url.searchParams.get("scope")).toBe(
        "custom:scope,another:permission",
      )
    })
  })

  // 7. Тестирование generateSearchParam через интеграцию
  describe("Вспомогательная функция generateSearchParam", () => {
    test("обработка булевых значений", () => {
      const url = generateVkontakteAuthUrl({
        client_id: 123,
        redirect_uri: "https://test.com",
        revoke: true,
      })

      expect(url.searchParams.get("revoke")).toBe("1")
    })

    test("обработка числовых значений", () => {
      const url = generateVkontakteAuthUrl({
        client_id: 123,
        redirect_uri: "https://test.com",
        v: 5.199,
      })

      expect(url.searchParams.get("v")).toBe("5.199")
    })

    test("обработка массива значений", () => {
      const url = generateGithubAuthUrl({
        client_id: "test",
        redirect_uri: "https://test.com",
        scope: ["user", "repo"],
      })

      expect(url.searchParams.get("scope")).toBe("user,repo")
    })

    test("обработка undefined значений", () => {
      const url = generateGithubAuthUrl({
        client_id: "test",
        redirect_uri: "https://test.com",
        state: undefined,
      })

      expect(url.searchParams.get("state")).toBe("")
    })
  })
})
