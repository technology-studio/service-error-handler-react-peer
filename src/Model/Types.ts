/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-09-06T13:09:68+02:00
 * @Copyright: Technology Studio
**/

import type {
  ServiceOperationError,
} from '@txo/service-prop'
import type React from 'react'

export type ErrorHandler = (attributes: ErrorHandlerAttributes) => React.ReactNode

export type ErrorHandlerAttributes = {
  children: React.ReactNode,
  next?: () => ErrorHandler,
  reportServiceOperationError: (serviceOperationError: ServiceOperationError) => void,
}
