import { LruCache } from '../../application/cache'

describe('LruCache', () => {
  it('should get the same object that is set', async () => {
    const sut = new LruCache({
      maxSize: 1,
    })
    const value = {}
    sut.set('key', value)

    const result = sut.get('key')
    expect(result).toBe(value)
  })
  it('should evict previous items', async () => {
    const sut = new LruCache({
      maxSize: 1,
    })
    const value1 = {}
    sut.set('key', value1)

    const value2 = {}
    sut.set('key', value2)

    const result = sut.get('key')
    expect(result).toBe(value2)
  })
  it('should drop key least used on max size', () => {
    const sut = new LruCache<string>({ maxSize: 3 })
    sut.set('a', '1')
    sut.set('b', '2')
    sut.set('c', '3')

    sut.get('a')
    sut.get('b')
    sut.get('c')
    sut.set('d', '4')
    sut.get('d')

    expect(sut.get('a')).toBeUndefined()
  })
})
