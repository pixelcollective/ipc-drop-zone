# IPC Drop Zone

IPC-enabled React drag-and-drop component for Electron apps. Include the component wrapping the drop area and pass along the IPC handler name and functions to be executed on response or error.

```js
<IPCDropZone handle={`upload`} onResponse={onResponse} onError={onError} />
```

The drop zone component will append `.request` to your handle for the request, `.response` for the response, and `.error` for the error, so you'll need to listen for those events in your main process. In the example below I'm passing `upload` as my handler. This means that I should be listening for `upload.request` in main, and responding with either `upload.error` or `upload.response`.

## Example renderer

```js
import React from 'react'
import { IPCDropZone } from 'IPCDropZone'

export default () => {
  const onError = (event, error) => {
    console.error([event, error]);
  }

  const onResponse = (event, response) => {
    console.log([event, response]);
  }

  return (
    <main>
      <IPCDropZone
        handle={`upload`}
        onResponse={onResponse}
        onError={onError}>
        {/** drop zone area */}
      </IPCDropZone>
    </main>
  )
}
```

## Example main

```js
ipc.on('upload.request', (event, req) => {
  // do something

  if (err) {
    main.webContents.send('upload.error', error)
  }

  main.webContents.send('upload.response', response)
})
  ```