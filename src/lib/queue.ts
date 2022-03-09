export class Queue {
  private _queue: string[]

  constructor() {
    this._queue = []
  }

  enqueue(item: Record<string, unknown>): number {
    this._queue = [...this._queue, JSON.stringify(item)]
    return this._queue.length
  }

  size(): number {
    return this._queue.length
  }

  pop(n: number): string[] {
    return this._queue.splice(0, n)
  }
}
