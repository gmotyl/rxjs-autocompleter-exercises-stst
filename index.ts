import { names, getNames } from './data'
import * as dom from './dom'

import { Observable, Observer } from 'rxjs'
// import { of } from 'rxjs'; 
// import { map } from 'rxjs/operators';

dom.renderList(getNames('ian'))
