import { isType } from "@minsize/utils"

type SearchParamsValue = string | boolean | number | undefined
type SearchParamsValues = SearchParamsValue | Array<SearchParamsValue>

type generateUrlProps = {
  origin: string
  searchParams?: Record<string, SearchParamsValues>
}

function generateUrl({ origin, searchParams }: generateUrlProps): URL {
  const url = new URL(origin)

  if (searchParams) {
    for (const key in searchParams) {
      const value = generateSearchParam(searchParams[key])

      url.searchParams.append(key.toString(), value)
    }
  }

  return url
}

const generateSearchParam = (param: SearchParamsValues): string => {
  if (param === undefined || param === "") return ""

  const type = isType(param)

  if (type === "array") {
    const value = []

    for (const item of param as unknown as Array<SearchParamsValue>) {
      value.push(generateSearchParam(item))
    }

    return value.join(",")
  }

  if (type === "number") {
    return (param as unknown as number).toString()
  }

  if (type === "boolean") {
    return (param as unknown as boolean) ? "1" : "0"
  }

  return param.toString()
}

export default generateUrl
