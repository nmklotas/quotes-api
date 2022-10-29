import { Request } from 'express'
import { AnyZodObject, SafeParseReturnType, z } from 'zod'

export function parseRequest<T extends AnyZodObject>(
  schema: T,
  req: Request
): Promise<SafeParseReturnType<Request, z.infer<T>>> {
  return schema.safeParseAsync(req)
}
