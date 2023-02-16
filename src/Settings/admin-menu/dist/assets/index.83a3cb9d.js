(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerpolicy&&(l.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?l.credentials="include":r.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();function S(){}function Ie(e){return e()}function ve(){return Object.create(null)}function z(e){e.forEach(Ie)}function qe(e){return typeof e=="function"}function R(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function Ne(e){return Object.keys(e).length===0}function ae(e,...t){if(e==null)return S;const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function Pe(e){let t;return ae(e,n=>t=n)(),t}function P(e,t,n){e.$$.on_destroy.push(ae(t,n))}function f(e,t){e.appendChild(t)}function x(e,t,n){e.insertBefore(t,n||null)}function C(e){e.parentNode.removeChild(e)}function g(e){return document.createElement(e)}function I(e){return document.createTextNode(e)}function k(){return I(" ")}function Ve(){return I("")}function J(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function p(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function je(e){return Array.from(e.childNodes)}function ee(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function ue(e,t){e.value=t==null?"":t}let me;function Q(e){me=e}const H=[],$e=[],se=[],ke=[],Le=Promise.resolve();let de=!1;function De(){de||(de=!0,Le.then(Me))}function _e(e){se.push(e)}const ce=new Set;let le=0;function Me(){const e=me;do{for(;le<H.length;){const t=H[le];le++,Q(t),Ue(t.$$)}for(Q(null),H.length=0,le=0;$e.length;)$e.pop()();for(let t=0;t<se.length;t+=1){const n=se[t];ce.has(n)||(ce.add(n),n())}se.length=0}while(H.length);for(;ke.length;)ke.pop()();de=!1,ce.clear(),Q(e)}function Ue(e){if(e.fragment!==null){e.update(),z(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(_e)}}const oe=new Set;let W;function We(){W={r:0,c:[],p:W}}function ze(){W.r||z(W.c),W=W.p}function M(e,t){e&&e.i&&(oe.delete(e),e.i(t))}function E(e,t,n,i){if(e&&e.o){if(oe.has(e))return;oe.add(e),W.c.push(()=>{oe.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function D(e){e&&e.c()}function V(e,t,n,i){const{fragment:r,on_mount:l,on_destroy:o,after_update:u}=e.$$;r&&r.m(t,n),i||_e(()=>{const s=l.map(Ie).filter(qe);o?o.push(...s):z(s),e.$$.on_mount=[]}),u.forEach(_e)}function j(e,t){const n=e.$$;n.fragment!==null&&(z(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Be(e,t){e.$$.dirty[0]===-1&&(H.push(e),De(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ne(e,t,n,i,r,l,o,u=[-1]){const s=me;Q(e);const a=e.$$={fragment:null,ctx:null,props:l,update:S,not_equal:r,bound:ve(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(s?s.$$.context:[])),callbacks:ve(),dirty:u,skip_bound:!1,root:t.target||s.$$.root};o&&o(a.root);let c=!1;if(a.ctx=n?n(e,t.props||{},(h,$,...d)=>{const _=d.length?d[0]:$;return a.ctx&&r(a.ctx[h],a.ctx[h]=_)&&(!a.skip_bound&&a.bound[h]&&a.bound[h](_),c&&Be(e,h)),$}):[],a.update(),c=!0,z(a.before_update),a.fragment=i?i(a.ctx):!1,t.target){if(t.hydrate){const h=je(t.target);a.fragment&&a.fragment.l(h),h.forEach(C)}else a.fragment&&a.fragment.c();t.intro&&M(e.$$.fragment),V(e,t.target,t.anchor,t.customElement),Me()}Q(s)}class re{$destroy(){j(this,1),this.$destroy=S}$on(t,n){const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(t){this.$$set&&!Ne(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Z=[];function Ke(e,t){return{subscribe:L(e,t).subscribe}}function L(e,t=S){let n;const i=new Set;function r(u){if(R(e,u)&&(e=u,n)){const s=!Z.length;for(const a of i)a[1](),Z.push(a,e);if(s){for(let a=0;a<Z.length;a+=2)Z[a][0](Z[a+1]);Z.length=0}}}function l(u){r(u(e))}function o(u,s=S){const a=[u,s];return i.add(a),i.size===1&&(n=t(r)||S),u(e),()=>{i.delete(a),i.size===0&&(n(),n=null)}}return{set:r,update:l,subscribe:o}}function ie(e,t,n){const i=!Array.isArray(e),r=i?[e]:e,l=t.length<2;return Ke(n,o=>{let u=!1;const s=[];let a=0,c=S;const h=()=>{if(a)return;c();const d=t(i?s[0]:s,o);l?o(d):c=qe(d)?d:S},$=r.map((d,_)=>ae(d,y=>{s[_]=y,a&=~(1<<_),u&&h()},()=>{a|=1<<_}));return u=!0,h(),function(){z($),c()}})}const Y=L(window._mappConfig.settings.General.v),ge=L(window._mappConfig.settings.General.tiId),he=L(window._mappConfig.settings.General.gtmId),be=L(window._mappConfig.settings.General.tiDomain),Oe=L(window._mappConfig.settings.General.filterKeys),pe=L(window._mappConfig.settings.General.excludeWpUser),ye=L(window._mappConfig.settings.General.acquire||""),Se=Object.freeze(Object.defineProperty({__proto__:null,v:Y,tiId:ge,gtmId:he,tiDomain:be,filterKeys:Oe,excludeWpUser:pe,acquire:ye},Symbol.toStringTag,{value:"Module"})),b=window._mappConfig.strings;function Ze(e){let t,n,i,r,l,o,u,s,a,c,h,$=b.hints.exclude_users+"",d,_,y;return{c(){t=g("tr"),n=g("th"),i=g("label"),i.textContent=`${b.header.exclude_users}`,r=k(),l=g("td"),o=g("fieldset"),u=g("legend"),s=g("span"),s.textContent=`${b.header.exclude_users}`,a=k(),c=g("label"),h=g("input"),d=I($),p(i,"for","exclude_user"),p(n,"scope","row"),p(u,"class","screen-reader-text"),p(h,"type","checkbox"),p(h,"id","mapp_excludeWpUser"),p(c,"for","exclude_user")},m(w,m){x(w,t,m),f(t,n),f(n,i),f(t,r),f(t,l),f(l,o),f(o,u),f(u,s),f(o,a),f(o,c),f(c,h),h.checked=e[0],f(c,d),_||(y=J(h,"change",e[1]),_=!0)},p(w,[m]){m&1&&(h.checked=w[0])},i:S,o:S,d(w){w&&C(t),_=!1,y()}}}function Fe(e,t,n){let i;P(e,pe,l=>n(0,i=l));function r(){i=this.checked,pe.set(i)}return[i,r]}class Je extends re{constructor(t){super(),ne(this,t,Fe,Ze,R,{})}}function Re(e){let t,n,i,r,l,o,u,s,a,c,h,$,d,_,y,w,m,T,U,O,X,A,G,B,q;return{c(){t=g("tr"),n=g("th"),n.textContent=`${b.header.pixel_version}`,i=k(),r=g("td"),l=g("fieldset"),o=g("legend"),u=g("span"),u.textContent=`${b.header.pixel_version}`,s=k(),a=g("label"),c=g("input"),h=k(),$=g("span"),$.textContent="Tag Integration",d=k(),_=g("br"),y=k(),w=g("label"),m=g("input"),T=k(),U=g("span"),U.textContent="Google Tag Manager",O=k(),X=g("br"),A=k(),G=g("p"),G.textContent=`${b.hints.pixel_version}`,p(n,"scope","row"),p(o,"class","screen-reader-text"),p(c,"id","General_v_5"),p(c,"type","radio"),c.__value=5,c.value=c.__value,e[2][0].push(c),p($,"class","date-time-text format-i18n"),p(m,"id","General_v_6"),p(m,"type","radio"),m.__value=6,m.value=m.__value,e[2][0].push(m),p(U,"class","date-time-text format-i18n"),p(G,"class","description"),p(G,"id","ti_help")},m(N,v){x(N,t,v),f(t,n),f(t,i),f(t,r),f(r,l),f(l,o),f(o,u),f(l,s),f(l,a),f(a,c),c.checked=c.__value===e[0],f(a,h),f(a,$),f(l,d),f(l,_),f(l,y),f(l,w),f(w,m),m.checked=m.__value===e[0],f(w,T),f(w,U),f(l,O),f(l,X),f(r,A),f(r,G),B||(q=[J(c,"change",e[1]),J(m,"change",e[3])],B=!0)},p(N,[v]){v&1&&(c.checked=c.__value===N[0]),v&1&&(m.checked=m.__value===N[0])},i:S,o:S,d(N){N&&C(t),e[2][0].splice(e[2][0].indexOf(c),1),e[2][0].splice(e[2][0].indexOf(m),1),B=!1,z(q)}}}function Xe(e,t,n){let i;P(e,Y,u=>n(0,i=u));const r=[[]];function l(){i=this.__value,Y.set(i)}function o(){i=this.__value,Y.set(i)}return[i,l,r,o]}class He extends re{constructor(t){super(),ne(this,t,Xe,Re,R,{})}}const Ge=ie(ge,e=>/(?:^$|^\d{15}$)/.test(e)),Ee=ie(be,e=>/(?:^$|^(?:[\w-]+\.)+([a-z]|[A-Z]|[0-9]){2,6}$)/.test(e)),Te=ie(he,e=>/(?:^$|^GTM-[A-Z0-9]{1,7}$)/.test(e)),Ae=ie(ye,e=>/(?:^$|id=(\d+?)&m=(\d+?)\D)/.test(e)),Qe=ie([Ge,Ee,Te,Ae],([e,t,n,i])=>{const r=[];return e||r.push(b.header.ti_id),t||r.push(b.header.ti_domain),n||r.push(b.header.gtm_id),i||r.push(b.header.acquire),r}),F=L(""),Ye=()=>{F.set(b.saving_changes),fetch(window._mappConfig.api.url,{method:"POST",mode:"cors",cache:"no-cache",credentials:"include",headers:{"Content-Type":"application/json","X-WP-Nonce":window._mappConfig.api.nonce},redirect:"follow",referrerPolicy:"no-referrer",body:et()}).then(e=>e.json()).then(e=>{F.set(b.settings_saved),window.setTimeout(()=>{F.set("")},4e3)}).catch(e=>{console.log("error",e),F.set(b.settings_error),window.setTimeout(()=>{F.set("")},4e3)})},et=()=>{const e={};for(const t in Se)e[t]=Pe(Se[t]);return JSON.stringify({General:e})};function Ce(e){let t,n,i;return{c(){t=g("p"),n=I("Please enter a valid value for: "),i=I(e[1])},m(r,l){x(r,t,l),f(t,n),f(t,i)},p(r,l){l&2&&ee(i,r[1])},d(r){r&&C(t)}}}function tt(e){let t,n,i,r,l,o,u=!e[0]&&Ce(e);return{c(){t=g("button"),n=I(e[2]),i=k(),u&&u.c(),r=Ve(),p(t,"type","submit"),p(t,"id","mapp_save"),t.disabled=e[3],p(t,"class","button-primary")},m(s,a){x(s,t,a),f(t,n),x(s,i,a),u&&u.m(s,a),x(s,r,a),l||(o=J(t,"click",Ye),l=!0)},p(s,[a]){a&4&&ee(n,s[2]),a&8&&(t.disabled=s[3]),s[0]?u&&(u.d(1),u=null):u?u.p(s,a):(u=Ce(s),u.c(),u.m(r.parentNode,r))},i:S,o:S,d(s){s&&C(t),s&&C(i),u&&u.d(s),s&&C(r),l=!1,o()}}}function nt(e,t,n){let i,r,l,o,u;return P(e,F,s=>n(4,o=s)),P(e,Qe,s=>n(1,u=s)),e.$$.update=()=>{e.$$.dirty&2&&n(0,i=u.length===0),e.$$.dirty&17&&n(3,r=o!==""||!i),e.$$.dirty&16&&n(2,l=o===""?b.save_changes:o)},[i,u,l,r,o]}class rt extends re{constructor(t){super(),ne(this,t,nt,tt,R,{})}}function it(e){let t,n,i;return{c(){t=g("textarea"),p(t,"id",e[0]),p(t,"type","text"),p(t,"class","regular-text"),p(t,"aria-describedby",e[9])},m(r,l){x(r,t,l),ue(t,e[8]),n||(i=J(t,"input",e[11]),n=!0)},p(r,l){l&1&&p(t,"id",r[0]),l&256&&ue(t,r[8])},d(r){r&&C(t),n=!1,i()}}}function lt(e){let t,n,i;return{c(){t=g("input"),p(t,"id",e[0]),p(t,"name",e[0]),p(t,"type","text"),p(t,"class","regular-text"),p(t,"aria-describedby",e[9])},m(r,l){x(r,t,l),ue(t,e[8]),n||(i=J(t,"input",e[10]),n=!0)},p(r,l){l&1&&p(t,"id",r[0]),l&1&&p(t,"name",r[0]),l&256&&t.value!==r[8]&&ue(t,r[8])},d(r){r&&C(t),n=!1,i()}}}function xe(e){let t,n=b.error.error+"",i,r,l;return{c(){t=I("- "),i=I(n),r=I(": "),l=I(e[5])},m(o,u){x(o,t,u),x(o,i,u),x(o,r,u),x(o,l,u)},p(o,u){u&32&&ee(l,o[5])},d(o){o&&C(t),o&&C(i),o&&C(r),o&&C(l)}}}function st(e){let t,n,i,r,l,o,u,s,a,c;function h(y,w){if(y[6]==="input")return lt;if(y[6]==="textarea")return it}let $=h(e),d=$&&$(e),_=!e[4]&&xe(e);return{c(){t=g("tr"),n=g("th"),i=g("label"),r=I(e[1]),l=k(),o=g("td"),d&&d.c(),u=k(),s=g("p"),a=I(e[2]),c=k(),_&&_.c(),p(i,"for",e[0]),p(n,"scope","row"),p(s,"class",e[7]),p(s,"id",e[9])},m(y,w){x(y,t,w),f(t,n),f(n,i),f(i,r),f(t,l),f(t,o),d&&d.m(o,null),f(o,u),f(o,s),f(s,a),f(s,c),_&&_.m(s,null)},p(y,[w]){w&2&&ee(r,y[1]),w&1&&p(i,"for",y[0]),$===($=h(y))&&d?d.p(y,w):(d&&d.d(1),d=$&&$(y),d&&(d.c(),d.m(o,u))),w&4&&ee(a,y[2]),y[4]?_&&(_.d(1),_=null):_?_.p(y,w):(_=xe(y),_.c(),_.m(s,null)),w&128&&p(s,"class",y[7])},i:S,o:S,d(y){y&&C(t),d&&d.d(),_&&_.d()}}}function ot(e,t,n){let i,r,l=S,o=()=>(l(),l=ae(c,m=>n(8,r=m)),c);e.$$.on_destroy.push(()=>l());let{id:u}=t,{label:s}=t,{hint:a}=t,{configStore:c}=t;o();let{validated:h=!0}=t,{errorMessage:$=""}=t,{type:d="input"}=t;const _=`${u}_help`;function y(){r=this.value,c.set(r)}function w(){r=this.value,c.set(r)}return e.$$set=m=>{"id"in m&&n(0,u=m.id),"label"in m&&n(1,s=m.label),"hint"in m&&n(2,a=m.hint),"configStore"in m&&o(n(3,c=m.configStore)),"validated"in m&&n(4,h=m.validated),"errorMessage"in m&&n(5,$=m.errorMessage),"type"in m&&n(6,d=m.type)},e.$$.update=()=>{e.$$.dirty&16&&n(7,i=h?"description":"error-message")},[u,s,a,c,h,$,d,i,r,_,y,w]}class te extends re{constructor(t){super(),ne(this,t,ot,st,R,{id:0,label:1,hint:2,configStore:3,validated:4,errorMessage:5,type:6})}}function ut(e){let t,n;return t=new te({props:{id:"mapp_gtmId",label:b.header.gtm_id,hint:b.hints.gtm_id,configStore:he,validated:e[3],errorMessage:b.error.gtm_id}}),{c(){D(t.$$.fragment)},m(i,r){V(t,i,r),n=!0},p(i,r){const l={};r&8&&(l.validated=i[3]),t.$set(l)},i(i){n||(M(t.$$.fragment,i),n=!0)},o(i){E(t.$$.fragment,i),n=!1},d(i){j(t,i)}}}function at(e){let t,n,i,r;return t=new te({props:{id:"mapp_tiId",label:b.header.ti_id,hint:b.hints.ti_id,configStore:ge,validated:e[1],errorMessage:b.error.ti_id}}),i=new te({props:{id:"mapp_ti_domain",label:b.header.ti_domain,hint:b.hints.ti_domain,configStore:be,validated:e[2],errorMessage:b.error.ti_domain}}),{c(){D(t.$$.fragment),n=k(),D(i.$$.fragment)},m(l,o){V(t,l,o),x(l,n,o),V(i,l,o),r=!0},p(l,o){const u={};o&2&&(u.validated=l[1]),t.$set(u);const s={};o&4&&(s.validated=l[2]),i.$set(s)},i(l){r||(M(t.$$.fragment,l),M(i.$$.fragment,l),r=!0)},o(l){E(t.$$.fragment,l),E(i.$$.fragment,l),r=!1},d(l){j(t,l),l&&C(n),j(i,l)}}}function ft(e){let t,n,i=b.docs+"",r,l,o=b.link+"",u,s,a,c,h,$,d,_,y,w,m,T,U,O,X,A,G;h=new He({});const B=[at,ut],q=[];function N(v,K){return v[0]===5?0:v[0]===6?1:-1}return~(d=N(e))&&(_=q[d]=B[d](e)),w=new te({props:{id:"mapp_filterKeys",label:b.header.exclude_keys,hint:b.hints.exclude_keys,configStore:Oe,type:"textarea"}}),T=new Je({}),O=new te({props:{id:"mapp_acquire",label:b.header.acquire,hint:b.hints.acquire,configStore:ye,validated:e[4],errorMessage:b.error.acquire,type:"textarea"}}),A=new rt({}),{c(){t=g("main"),n=g("p"),r=I(i),l=g("a"),u=I(o),s=k(),a=g("table"),c=g("tbody"),D(h.$$.fragment),$=k(),_&&_.c(),y=k(),D(w.$$.fragment),m=k(),D(T.$$.fragment),U=k(),D(O.$$.fragment),X=k(),D(A.$$.fragment),p(l,"href",b.link),p(l,"target","_blank"),p(a,"class","form-table")},m(v,K){x(v,t,K),f(t,n),f(n,r),f(n,l),f(l,u),f(t,s),f(t,a),f(a,c),V(h,c,null),f(c,$),~d&&q[d].m(c,null),f(c,y),V(w,c,null),f(c,m),V(T,c,null),f(c,U),V(O,c,null),f(t,X),V(A,t,null),G=!0},p(v,[K]){let fe=d;d=N(v),d===fe?~d&&q[d].p(v,K):(_&&(We(),E(q[fe],1,1,()=>{q[fe]=null}),ze()),~d?(_=q[d],_?_.p(v,K):(_=q[d]=B[d](v),_.c()),M(_,1),_.m(c,y)):_=null);const we={};K&16&&(we.validated=v[4]),O.$set(we)},i(v){G||(M(h.$$.fragment,v),M(_),M(w.$$.fragment,v),M(T.$$.fragment,v),M(O.$$.fragment,v),M(A.$$.fragment,v),G=!0)},o(v){E(h.$$.fragment,v),E(_),E(w.$$.fragment,v),E(T.$$.fragment,v),E(O.$$.fragment,v),E(A.$$.fragment,v),G=!1},d(v){v&&C(t),j(h),~d&&q[d].d(),j(w),j(T),j(O),j(A)}}}function ct(e,t,n){let i,r,l,o,u;return P(e,Y,s=>n(0,i=s)),P(e,Ge,s=>n(1,r=s)),P(e,Ee,s=>n(2,l=s)),P(e,Te,s=>n(3,o=s)),P(e,Ae,s=>n(4,u=s)),[i,r,l,o,u]}class dt extends re{constructor(t){super(),ne(this,t,ct,ft,R,{})}}new dt({target:document.getElementById("mapp_wordpress_config")});
