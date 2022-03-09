import { Queue } from './queue';

const actionsBatchSize = 20
const sourcingURL = 'https://src.datartproject.com'

interface DataArtOptions {
  apiKey: string,
  flushInterval: number,
}

interface ActionOptions {
  eventKey: string,
  userKey: string,
  isAnonymousUser: boolean,
  timestamp: Date,
  metadata: Record<string, unknown>,
}

interface IdentifyOptions {
  userKey: string,
  metadata: Record<string, unknown>,
}

export class DataArt {
  private _apiKey: string
  private _actionsQueue: Queue
  private _flushInterval: number

  constructor({ apiKey, flushInterval }: DataArtOptions) {
    this._apiKey = apiKey
    this._flushInterval = flushInterval
    this._actionsQueue = new Queue()

    setInterval(() => this._flushActions(), this._flushInterval)
  }

  private _flushActions(): void {
    if (this._actionsQueue.size() == 0) {
      return
    }

    const items = this._actionsQueue.pop(actionsBatchSize)
    const actions = items.map((val) => JSON.parse(val))
    const payload = {
      'timestamp': new Date(),
      'actions': actions
    }

    this._sendRequest(`${sourcingURL}/events/send-actions`, JSON.stringify(payload))
  }

  private _sendRequest(url: string, payload: string): void {
    fetch(url, {
      method: 'POST',
      headers: {
        'User-Agent': 'dataart-js',
        'Content-Type': 'application/json',
        'X-API-Key': this._apiKey,
      },
      body: payload,
      mode: 'cors'
    })
  }

  emitAction({ eventKey, userKey, isAnonymousUser, timestamp, metadata = {} }: ActionOptions): void {
    this._actionsQueue.enqueue({
      'key': eventKey,
      'user_key': userKey,
      'is_anonymous_user': isAnonymousUser,
      'timestamp': timestamp,
      'metadata': metadata
    })
  }

  identify({ userKey, metadata = {} }: IdentifyOptions): void {
    const payload = {
      'user_key': userKey,
      'metadata': metadata,
    }

    this._sendRequest(`${sourcingURL}/users/identify`, JSON.stringify(payload))
  }
}
