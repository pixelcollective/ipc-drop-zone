/** React */
import React from 'react'

/** Modules */
import { ipcRenderer as ipc } from 'electron'

/**
 * IPC-enabled React Drag and Drop component for Electron apps
 *
 * @prop handle     string
 * @prop onResponse function
 * @prop onError    function
 */
const IPCDropZone = ({ children, handle, onResponse, onError }) => {
  /**
   * On drop emit event to IPC
   */
  const onDrop = event => {
    event.preventDefault();

    if (! (event && event.dataTransfer && event.dataTransfer.files[0])) {
      console.warning('IPCDropZone component event issue', event);

      return null;
    }

    const { path } = event.dataTransfer.files[0];

    ipc.send(`${handle}.request`, path);
  }

  /**
   * Callback for IPC emitted responses.
   */
  onResponse && ipc.on(`${handle}.response`, onResponse)

  /**
   * Callback for IPC emitted errors.
   */
  onError && ipc.on(`${handle}.error`, onError)

  /**
   * Prevent window's default drag-over behavior.
   */
  const onDragOver = event => event.preventDefault();

  /**
   * Render IPCDropZone
   */
  return (
    <div onDragOver={onDragOver} onDrop={onDrop}>
      {children}
    </div>
  )
}

export { IPCDropZone }