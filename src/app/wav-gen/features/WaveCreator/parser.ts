import { Parser } from "expr-eval"
import type { Fn } from "../const"

export const parser = new Parser({
  operators: {
    // All options are true by default.
    // Disable 'in' and = operators
    in: false,
    assignment: false,
  },
})

export function createFormula(f: string) {
  const expr = parser.parse(f)
  return expr.toJSFunction("t") as Fn
}

export function createFormulaSafe(f: string) {
  let result:
    | {
        ok: true
        f: Fn
      }
    | {
        ok: false
        error: Error
      }
  try {
    result = {
      ok: true,
      f: createFormula(f),
    }
    result.f(0)
  } catch (error) {
    result = {
      ok: false,
      error: error as Error,
    }
  }
  return result
}
