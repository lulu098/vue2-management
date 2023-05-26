
export function setToken(token){
    sessionStorage.setItem("token",token)
}

export function getToken(){
    return sessionStorage.getItem("token")
}

export function removeToken(){
    sessionStorage.clear()
}


export function  clear(athis){
        let vnode = athis.$vnode;
        let parentVonde = vnode && vnode.parent;
        if (
            parentVonde &&
            parentVonde.componentInstance &&
            parentVonde.componentInstance.cache
        ) {
            var key =
            vnode.key == null
                ? vnode.componentOptions.Ctor.cid +
                (vnode.componentOptions.tag
                    ? `::${vnode.componentOptions.tag}`
                    : "")
                : vnode.key;
            var cache = parentVonde.componentInstance.cache;
            var keys = parentVonde.componentInstance.keys;
            if (cache[key]) {
                athis.$destroy();
            // remove key
            if (keys.length) {
                var index = keys.indexOf(key);
                if (index > -1) {
                keys.splice(index, 1);
                }
            }
            cache[key] = null;
            }
        }
    }
