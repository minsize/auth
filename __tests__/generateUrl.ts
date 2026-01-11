import generateUrl from "../src/utils/generateUrl"

describe("generateUrl", () => {
  test("создание URL без параметров", () => {
    const url = generateUrl({
      origin: "https://example.com",
    })

    expect(url.href).toBe("https://example.com/")
  })

  test("создание URL с параметрами", () => {
    const url = generateUrl({
      origin: "https://example.com",
      searchParams: {
        param1: "value1",
        param2: "value2",
        number: 123,
        boolean: true,
        array: ["a", "b", "c"],
      },
    })

    expect(url.searchParams.get("param1")).toBe("value1")
    expect(url.searchParams.get("param2")).toBe("value2")
    expect(url.searchParams.get("number")).toBe("123")
    expect(url.searchParams.get("boolean")).toBe("1")
    expect(url.searchParams.get("array")).toBe("a,b,c")
  })

  test("создание URL с пустыми параметрами", () => {
    const url = generateUrl({
      origin: "https://example.com",
      searchParams: {
        empty: "",
        undefined: undefined,
        falseBoolean: false,
      },
    })

    expect(url.searchParams.get("empty")).toBe("")
    expect(url.searchParams.get("undefined")).toBe("")
    expect(url.searchParams.get("falseBoolean")).toBe("0")
  })

  test("создание URL со спецсимволами", () => {
    const url = generateUrl({
      origin: "https://example.com",
      searchParams: {
        special: "test&value=123#anchor",
      },
    })

    expect(url.searchParams.get("special")).toBe("test&value=123#anchor")
  })
})
