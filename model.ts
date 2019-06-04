const baseURL = 'http://localhost:3000'

import { ajax } from 'rxjs/ajax'
import { publishLast, refCount } from 'rxjs/operators'

export const employees$ = ajax.getJSON(`${baseURL}/employees`).pipe(
  publishLast(),
  refCount(),
)

export const employeesByName = 
  (firstName: string) => ajax.getJSON(`${baseURL}/employees?firstName_like=${firstName}`).pipe(
    publishLast(),
    refCount(),
  )
