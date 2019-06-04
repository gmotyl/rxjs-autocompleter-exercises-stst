import { names, getNames } from './data'
import * as dom from './dom'

import { Observable, Observer, fromEvent, merge} from 'rxjs'
// import { of } from 'rxjs'; 
import { map, filter, tap, shareReplay, distinctUntilChanged, switchMap, startWith  } from 'rxjs/operators';

import { employeesByName } from './model'

const phrase$: Observable<string> = fromEvent(dom.$input, 'input').pipe(
  map(e => (e.target as HTMLInputElement).value),
  distinctUntilChanged(),
  tap(console.log),
  shareReplay(1),
)
const searchResults$ = phrase$.pipe(
  filter(phrase => phrase.length > 2),
  // 1. local data
  // map(getNames),

  // 2. mock api (external) data
  employeesByName(),
  map(employyes => employyes.map(e => `${e.firstName} ${e.lastName}`)),
  
  map(results => results.slice(0, 10)),
);

// searchResults$.subscribe(dom.renderList);

const searchClear$ = phrase$.pipe(
)

const autocomplete$ = phrase$.pipe(
  tap(p => console.log(p, 'PRZED')),
  
  switchMap((phrase) => phrase.length > 2 
    ? searchResults$.pipe(
      tap(dom.renderList),
    )
    : phrase$.pipe(
      tap(dom.clearList),
    )
  ),
  tap(p => console.log(p, 'PO')),
)

autocomplete$.subscribe();

// searchClear$.subscribe(dom.clearList);