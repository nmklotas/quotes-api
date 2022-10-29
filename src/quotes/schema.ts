import * as z from 'zod'

export const schema = z.object({
  query: z.object({
    baseCurrency: z
      .string()
      .nonempty('error_baseCurrency_invalid')
      .refine(isSupportedCurrency)
      .transform(c => c.toUpperCase()),
    quoteCurrency: z
      .string()
      .nonempty('error_quoteCurrency_invalid')
      .refine(isSupportedCurrency)
      .transform(c => c.toUpperCase()),
    baseAmount: z
      .string()
      .regex(/^[0-9]+$/g)
      .transform(Number),
  }),
})

function isSupportedCurrency(currency: string) {
  const supportedCurrencies = ['USD', 'EUR', 'GBP', 'ILS']
  return supportedCurrencies.includes(currency.toUpperCase())
}
