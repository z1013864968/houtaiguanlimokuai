import Zmenu from '@/components/menu'
import Ztabs from '@/components/tabs'
import Zpager from '@/components/pager'
import Zbread from '@/components/bread'
export default {
    install(Vue){
        Vue.component(Zmenu.name,Zmenu)
        Vue.component(Ztabs.name,Ztabs)
        Vue.component(Zpager.name,Zpager)
        Vue.component(Zbread.name,Zbread)
    }
}