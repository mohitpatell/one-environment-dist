(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{wf0l:function(e,t,s){"use strict";s.d(t,"a",function(){return Q}),s.d(t,"b",function(){return U});var i=s("XNiG"),n=s("LRne"),r=s("HDdC"),o=s("quSY");class a extends o.a{constructor(e,t){super()}schedule(e,t=0){return this}}class c extends a{constructor(e,t){super(e,t),this.scheduler=e,this.work=t,this.pending=!1}schedule(e,t=0){if(this.closed)return this;this.state=e;const s=this.id,i=this.scheduler;return null!=s&&(this.id=this.recycleAsyncId(i,s,t)),this.pending=!0,this.delay=t,this.id=this.id||this.requestAsyncId(i,this.id,t),this}requestAsyncId(e,t,s=0){return setInterval(e.flush.bind(e,this),s)}recycleAsyncId(e,t,s=0){if(null!==s&&this.delay===s&&!1===this.pending)return t;clearInterval(t)}execute(e,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const s=this._execute(e,t);if(s)return s;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(e,t){let s=!1,i=void 0;try{this.work(e)}catch(n){s=!0,i=!!n&&n||new Error(n)}if(s)return this.unsubscribe(),i}_unsubscribe(){const e=this.id,t=this.scheduler,s=t.actions,i=s.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==i&&s.splice(i,1),null!=e&&(this.id=this.recycleAsyncId(t,e,null)),this.delay=null}}class h extends c{constructor(e,t){super(e,t),this.scheduler=e,this.work=t}schedule(e,t=0){return t>0?super.schedule(e,t):(this.delay=t,this.state=e,this.scheduler.flush(this),this)}execute(e,t){return t>0||this.closed?super.execute(e,t):this._execute(e,t)}requestAsyncId(e,t,s=0){return null!==s&&s>0||null===s&&this.delay>0?super.requestAsyncId(e,t,s):e.flush(this)}}let u=(()=>{class e{constructor(t,s=e.now){this.SchedulerAction=t,this.now=s}schedule(e,t=0,s){return new this.SchedulerAction(this,e).schedule(s,t)}}return e.now=()=>Date.now(),e})();class l extends u{constructor(e,t=u.now){super(e,()=>l.delegate&&l.delegate!==this?l.delegate.now():t()),this.actions=[],this.active=!1,this.scheduled=void 0}schedule(e,t=0,s){return l.delegate&&l.delegate!==this?l.delegate.schedule(e,t,s):super.schedule(e,t,s)}flush(e){const{actions:t}=this;if(this.active)return void t.push(e);let s;this.active=!0;do{if(s=e.execute(e.state,e.delay))break}while(e=t.shift());if(this.active=!1,s){for(;e=t.shift();)e.unsubscribe();throw s}}}class d extends l{}const g=new d(h);var b=s("7o/Q"),f=s("EY2u");let m=(()=>{class e{constructor(e,t,s){this.kind=e,this.value=t,this.error=s,this.hasValue="N"===e}observe(e){switch(this.kind){case"N":return e.next&&e.next(this.value);case"E":return e.error&&e.error(this.error);case"C":return e.complete&&e.complete()}}do(e,t,s){switch(this.kind){case"N":return e&&e(this.value);case"E":return t&&t(this.error);case"C":return s&&s()}}accept(e,t,s){return e&&"function"==typeof e.next?this.observe(e):this.do(e,t,s)}toObservable(){switch(this.kind){case"N":return Object(n.a)(this.value);case"E":return e=this.error,new r.a(t=>t.error(e));case"C":return Object(f.b)()}var e;throw new Error("unexpected notification kind value")}static createNext(t){return void 0!==t?new e("N",t):e.undefinedValueNotification}static createError(t){return new e("E",void 0,t)}static createComplete(){return e.completeNotification}}return e.completeNotification=new e("C"),e.undefinedValueNotification=new e("N",void 0),e})();class p extends b.a{constructor(e,t,s=0){super(e),this.scheduler=t,this.delay=s}static dispatch(e){const{notification:t,destination:s}=e;t.observe(s),this.unsubscribe()}scheduleMessage(e){this.destination.add(this.scheduler.schedule(p.dispatch,this.delay,new v(e,this.destination)))}_next(e){this.scheduleMessage(m.createNext(e))}_error(e){this.scheduleMessage(m.createError(e)),this.unsubscribe()}_complete(){this.scheduleMessage(m.createComplete()),this.unsubscribe()}}class v{constructor(e,t){this.notification=e,this.destination=t}}var w=s("9ppp"),I=s("Ylt2");class y extends i.a{constructor(e=Number.POSITIVE_INFINITY,t=Number.POSITIVE_INFINITY,s){super(),this.scheduler=s,this._events=[],this._infiniteTimeWindow=!1,this._bufferSize=e<1?1:e,this._windowTime=t<1?1:t,t===Number.POSITIVE_INFINITY?(this._infiniteTimeWindow=!0,this.next=this.nextInfiniteTimeWindow):this.next=this.nextTimeWindow}nextInfiniteTimeWindow(e){if(!this.isStopped){const t=this._events;t.push(e),t.length>this._bufferSize&&t.shift()}super.next(e)}nextTimeWindow(e){this.isStopped||(this._events.push(new S(this._getNow(),e)),this._trimBufferThenGetEvents()),super.next(e)}_subscribe(e){const t=this._infiniteTimeWindow,s=t?this._events:this._trimBufferThenGetEvents(),i=this.scheduler,n=s.length;let r;if(this.closed)throw new w.a;if(this.isStopped||this.hasError?r=o.a.EMPTY:(this.observers.push(e),r=new I.a(this,e)),i&&e.add(e=new p(e,i)),t)for(let o=0;o<n&&!e.closed;o++)e.next(s[o]);else for(let o=0;o<n&&!e.closed;o++)e.next(s[o].value);return this.hasError?e.error(this.thrownError):this.isStopped&&e.complete(),r}_getNow(){return(this.scheduler||g).now()}_trimBufferThenGetEvents(){const e=this._getNow(),t=this._bufferSize,s=this._windowTime,i=this._events,n=i.length;let r=0;for(;r<n&&!(e-i[r].time<s);)r++;return n>t&&(r=Math.max(r,n-t)),r>0&&i.splice(0,r),i}}class S{constructor(e,t){this.time=e,this.value=t}}var x=s("KqfI");const O=new r.a(x.a);var N=s("pLZG"),k=s("vkgz"),C=s("IzEk"),j=s("5+tZ"),E=s("lJxs"),_=s("JIr8"),T=s("eIep");s("JX91"),s("w1tV");var z=s("ofXK"),P=s("fXoL");function L(e){return Boolean(e.parentElement&&"picture"===e.parentElement.nodeName.toLowerCase())}function A(e){return"img"===e.nodeName.toLowerCase()}function M(e,t,s){return A(e)?s&&"srcset"in e?e.srcset=t:e.src=t:e.style.backgroundImage=`url('${t}')`,e}function V(e){return t=>{const s=t.parentElement.getElementsByTagName("source");for(let i=0;i<s.length;i++){const t=s[i].getAttribute(e);t&&("srcset"in s[i]?s[i].srcset=t:s[i].src=t)}}}const q=V("defaultImage"),B=V("lazyLoad"),D=V("errorImage");function W(e){return(t,s,i)=>{A(t)&&L(t)&&e(t),s&&M(t,s,i)}}const Y=W(q),F=W(B),G=W(D),J="ng-lazyloaded",R="ng-lazyloading";function Z(e,t){e.className=e.className.replace(t,"")}function $(e,t){e.className.includes(t)||(e.className+=" "+t)}let K=(()=>{class e extends class extends class{constructor(){this.navigator="undefined"!=typeof window?window.navigator:void 0}setPlatformId(e){this.platformId=e}onDestroy(e){}onAttributeChange(e){}}{setup(e){var t;Y(e.element,e.defaultImagePath,e.useSrcset),$(e.element,R),(t=e.element).className&&t.className.includes("ng-lazyloaded")&&Z(e.element,J)}finally(e){$(e.element,J),Z(e.element,R)}loadImage(e){if(this.skipLazyLoading(e))return[e.imagePath];const{element:t,useSrcset:s,imagePath:i,decode:n}=e;let r;if(A(t)&&L(t)){const e=t.parentNode.cloneNode(!0);r=e.getElementsByTagName("img")[0],B(r),M(r,i,s)}else r=new Image,A(t)&&t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),A(t)&&t.sizes&&(r.sizes=t.sizes),s&&"srcset"in r?r.srcset=i:r.src=i;return n&&r.decode?r.decode().then(()=>i):new Promise((e,t)=>{r.onload=()=>e(i),r.onerror=()=>t(null)})}setErrorImage(e,t){const{element:s,useSrcset:i,errorImagePath:n}=t;G(s,n,i),$(s,"ng-failed-lazyloaded")}setLoadedImage(e,t){const{element:s,useSrcset:i}=t;F(s,e,i)}isDisabled(){return Object(z.isPlatformServer)(this.platformId)&&!this.isBot()}skipLazyLoading(e){return this.isBot(e)}isBot(e){var t;return!!(null===(t=this.navigator)||void 0===t?void 0:t.userAgent)&&/googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora\ link\ preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|slackbot|vkShare|W3C_Validator|whatsapp|duckduckbot/i.test(this.navigator.userAgent)}}{constructor(){super(...arguments),this.observers=new WeakMap,this.intersectionSubject=new i.a,this.uniqKey={}}getObservable(e){if(this.skipLazyLoading(e))return Object(n.a)({isIntersecting:!0});if(e.customObservable)return e.customObservable;const t=e.scrollContainer||this.uniqKey,s={root:e.scrollContainer||null};e.offset&&(s.rootMargin=e.offset+"px");let i=this.observers.get(t);return i||(i=new IntersectionObserver(e=>this.loadingCallback(e),s),this.observers.set(t,i)),i.observe(e.element),r.a.create(t=>{const s=this.intersectionSubject.pipe(Object(N.a)(t=>t.target===e.element)).subscribe(t);return()=>{s.unsubscribe(),i.unobserve(e.element)}})}isVisible(e){return e.isIntersecting}loadingCallback(e){e.forEach(e=>this.intersectionSubject.next(e))}}return e.\u0275fac=function(t){return X(t||e)},e.\u0275prov=P["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac}),e})();const X=P["\u0275\u0275getInheritedFactory"](K),H=new P.InjectionToken("LazyLoadImageHooks");let Q=(()=>{class e{constructor(e,t,s,i){this.onStateChange=new P.EventEmitter,this.elementRef=e,this.ngZone=t,this.propertyChanges$=new y,this.hooks=i,this.hooks.setPlatformId(s),this.uid=Math.random().toString(36).substr(2,9)}ngOnChanges(){!0!==this.debug||this.debugSubscription||(this.debugSubscription=this.onStateChange.subscribe(e=>console.log(e))),this.propertyChanges$.next({element:this.elementRef.nativeElement,imagePath:this.lazyImage,defaultImagePath:this.defaultImage,errorImagePath:this.errorImage,useSrcset:this.useSrcset,offset:this.offset?0|this.offset:0,scrollContainer:this.scrollTarget,customObservable:this.customObservable,decode:this.decode,onStateChange:this.onStateChange,id:this.uid})}ngAfterContentInit(){if(this.hooks.isDisabled())return null;this.ngZone.runOutsideAngular(()=>{this.loadSubscription=this.propertyChanges$.pipe(Object(k.a)(e=>this.hooks.onAttributeChange(e)),Object(k.a)(e=>e.onStateChange.emit({reason:"setup"})),Object(k.a)(e=>this.hooks.setup(e)),Object(T.a)(e=>e.imagePath?this.hooks.getObservable(e).pipe(function(e,t){return s=>s.pipe(Object(k.a)(e=>t.onStateChange.emit({reason:"observer-emit",data:e})),Object(N.a)(s=>e.isVisible(s,t)),Object(C.a)(1),Object(k.a)(()=>t.onStateChange.emit({reason:"start-loading"})),Object(j.a)(()=>e.loadImage(t)),Object(k.a)(()=>t.onStateChange.emit({reason:"mount-image"})),Object(k.a)(s=>e.setLoadedImage(s,t)),Object(k.a)(()=>t.onStateChange.emit({reason:"loading-succeeded"})),Object(E.a)(()=>!0),Object(_.a)(s=>(t.onStateChange.emit({reason:"loading-failed",data:s}),e.setErrorImage(s,t),Object(n.a)(!1))),Object(k.a)(()=>{t.onStateChange.emit({reason:"finally"}),e.finally(t)}))}(this.hooks,e)):O)).subscribe({next:()=>null})})}ngOnDestroy(){var e,t;this.propertyChanges$.pipe(Object(C.a)(1)).subscribe({next:e=>this.hooks.onDestroy(e)}).unsubscribe(),null===(e=this.loadSubscription)||void 0===e||e.unsubscribe(),null===(t=this.debugSubscription)||void 0===t||t.unsubscribe()}}return e.\u0275fac=function(t){return new(t||e)(P["\u0275\u0275directiveInject"](P.ElementRef),P["\u0275\u0275directiveInject"](P.NgZone),P["\u0275\u0275directiveInject"](P.PLATFORM_ID),P["\u0275\u0275directiveInject"](H))},e.\u0275dir=P["\u0275\u0275defineDirective"]({type:e,selectors:[["","lazyLoad",""]],inputs:{lazyImage:["lazyLoad","lazyImage"],defaultImage:"defaultImage",errorImage:"errorImage",scrollTarget:"scrollTarget",customObservable:"customObservable",offset:"offset",useSrcset:"useSrcset",decode:"decode",debug:"debug"},outputs:{onStateChange:"onStateChange"},features:[P["\u0275\u0275NgOnChangesFeature"]]}),e})(),U=(()=>{class e{}return e.\u0275mod=P["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=P["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},providers:[{provide:H,useClass:K}]}),e})()}}]);