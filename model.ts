const baseURL = 'http://localhost:3000'

import { ajax } from 'rxjs/ajax'
import { publishLast, publishReplay refCount, switchMap, shareReplay } from 'rxjs/operators'
import { pipe } from 'rxjs'

export const employees$ = ajax.getJSON(`${baseURL}/employees`).pipe(
  publishLast(),
  refCount(),
)

export const __employeesByName = 
  (firstName: string) => ajax.getJSON(`${baseURL}/employees?firstName_like=${firstName}`).pipe(
    publishLast(),
    refCount(),
  )

export const employeesByName = () =>
  pipe(
    switchMap((phrase: string) => ajax.getJSON(`${baseURL}/employees?firstName_like=${phrase}`)),
    publishReplay(1),
    refCount(),
    // shareReplay(1),
  )
