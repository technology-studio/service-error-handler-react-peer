/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-09-03T12:09:39+02:00
 * @Copyright: Technology Studio
**/

import { Log } from '@txo/log'
import type { ServiceOperationError } from '@txo/service-prop'

import type { ErrorHandler } from '../Model/Types'

const log = new Log('@txo-peer-dep.service-error-handler-react.Api.ErrorHandlerManager')

type ErrorListSubscription = (serviceOperationError: ServiceOperationError) => void

class ErrorHandlerManager {
  _handlerSequence: ErrorHandler[] | null = null
  _subscriptionList: ErrorListSubscription[] = []
  _middlewareSubscriptionList: ErrorListSubscription[] = []

  setHandlerSequence (handlerSequence: ErrorHandler[]): void {
    log.debug('SET ERROR HANDLERS', handlerSequence)
    this._handlerSequence = handlerSequence
  }

  getHandlerSequence (): ErrorHandler[] | null {
    log.debug('GET ERROR HANDLERS', this._handlerSequence)
    return this._handlerSequence
  }

  subscribe (subscription: ErrorListSubscription): () => void {
    this._subscriptionList.push(subscription)
    return () => {
      this._subscriptionList.filter(s => s !== subscription)
    }
  }

  emit (serviceOperationError: ServiceOperationError): void {
    log.debug('EMIT', serviceOperationError)
    for (const subscription of this._subscriptionList) {
      subscription(serviceOperationError)
    }
  }

  subscribeMiddleware (subscription: ErrorListSubscription): () => void {
    this._middlewareSubscriptionList.push(subscription)
    return () => {
      this._middlewareSubscriptionList.filter(s => s !== subscription)
    }
  }

  emitMiddleware (serviceOperationError: ServiceOperationError): void {
    log.debug('EMIT', serviceOperationError)
    for (const subscription of this._middlewareSubscriptionList) {
      subscription(serviceOperationError)
    }
  }
}

export const errorHandlerManager: ErrorHandlerManager = new ErrorHandlerManager()
