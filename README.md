# dataart-js

DataArt platform client for JavaScript.

<p>
    <img src="./.github/img/project-banner.jpg" width="600">
</p>

## Getting Started

Install the package using npm

```bash
npm i @dataart.ai/dataart-js
yarn add @dataart.ai/dataart-js
```

## Usage

First, import the DataArt client and create an instance:

```javascript
import DataArt from '@dataart.ai/dataart-js'

const client = new DataArt({
  apiKey: 'YOUR-API-KEY',
  flushInterval: 30 * 1000  // 20 seconds
});
```

Now you can send actions or identities with `emitAction` and `identify` methods:

```javascript
client.emitAction({
  eventKey: 'key1',
  userKey: 'user1',
  isAnonymousUser: false,
  timestamp: new Date(),
  metadata: {
    'k1': 'v1',
    'k2': 'v2',
  }
})
```

```javascript
client.identify({
  userKey: 'user1',
  metadata: {
    fromReact: true,
    age: 20,
  }
});
```

## React Example

```javascript

import { useMemo, useCallback } from 'react';
import DataArt from '@dataart.ai/dataart-js'

function MyComponent() {
  const client = useMemo(() => {
    return new DataArt({
      apiKey: 'YOUR-API-KEY',
      flushInterval: 30 * 1000  // 20 seconds
    });
  }, []);

  const emitAction = useCallback(() => {
    client.emitAction({
      eventKey: 'key1',
      userKey: 'user1',
      isAnonymousUser: false,
      timestamp: new Date(),
      metadata: {
        'k1': 'v1',
        'k2': 'v2',
      }
    })

  }, [client]);

  const identify = useCallback(() => {
    client.identify({
      userKey: 'user1',
      metadata: {
        fromReact: true,
        age: 20,
      }
    });

  }, [client]);

  return (
    <div className="App" onClick={identify}>
      <button onClick={emitAction}>Emit Action</button>
      <button onClick={identify}>Identify</button>
    </div>
  );
}

export default MyComponent;

```

## License

MIT License

Copyright (c) 2022 DataArt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
