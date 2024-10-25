/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-09-06T14:09:35+02:00
 * @Copyright: Technology Studio
**/

import { createContext } from 'react'
import type {
  ServiceOperationError,
} from '@txo/service-prop'

type Context = {
  reportServiceOperationError: (serviceOperationError: ServiceOperationError) => void,
}

export const ErrorHandlerContext = createContext<Context>({
  reportServiceOperationError: () => undefined,
})
