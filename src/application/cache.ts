interface CacheOptions {
  maxSize: number
}

export class LruCache<T> {
  private maxSize: number
  private size: number
  private tail?: ListElement<T>
  private head?: ListElement<T>
  private cache: Record<string, ListElement<T>>

  constructor(options: CacheOptions) {
    this.maxSize = options.maxSize
    this.size = 0
    this.cache = {}
    this.tail = undefined
    this.head = undefined
  }

  get(key: string): T | undefined {
    const element = this.cache[key]
    if (element) {
      this.sendToHead(element)
      return element.value
    }

    return undefined
  }

  set(key: string, value: T) {
    const element = this.cache[key]
    if (element) {
      element.value = value
      this.sendToHead(element)
    } else {
      if (this.size >= this.maxSize) {
        const tailKey = this.tail!.key
        this.detach(this.tail!)
        delete this.cache[tailKey]
        this.attachNewElement(key, value)
      } else {
        this.attachNewElement(key, value)
      }
    }
  }

  private sendToHead(element: ListElement<T>) {
    this.detach(element)
    this.attach(element)
  }

  private attachNewElement(key: string, value: T) {
    const element = new ListElement(undefined, undefined, key, value)
    this.cache[key] = element
    this.attach(element)
  }

  private attach(element: ListElement<T>) {
    element.before = undefined
    element.next = this.head
    this.head = element
    if (!element.next) {
      this.tail = element
    } else {
      element.next.before = element
    }
    this.size++
  }

  private detach(element: ListElement<T>) {
    const before = element.before
    const next = element.next
    if (before) {
      before.next = next
    } else {
      this.head = next
    }
    if (next) {
      next.before = before
    } else {
      this.tail = before
    }
    this.size--
  }
}

class ListElement<T> {
  constructor(
    public before: ListElement<T> | undefined,
    public next: ListElement<T> | undefined,
    public key: string,
    public value: T
  ) {}
}
