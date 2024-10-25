/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-09-03T12:09:39+02:00
 * @Copyright: Technology Studio
**/

import { Log } from '@txo/log'

const log = new Log('@txo-peer-dep.error-handler.Api.ErrorHandlerManager')

type ErrorListener = (error: unknown) => void

const errorListenerList: ErrorListener[] = []

export const reportError = (error: unknown): void => {
  log.debug('REPORT ERROR', error)
  for (const errorListener of errorListenerList) {
    errorListener(error)
  }
}
export const subscribeErrorListener = (errorListener: ErrorListener) => {
  errorListenerList.push(errorListener)
  return () => {
    errorListenerList.filter(listener => listener !== errorListener)
  }
}
