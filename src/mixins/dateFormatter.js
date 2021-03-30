import { dateFormatter } from '@/utils/validate'

export default {
  methods: {
    mix_tableDateFormatter(row, column, cellValue, index){
      const _t = cellValue&&cellValue.indexOf('T')?cellValue.replace('T',' '):cellValue
      return _t ? dateFormatter(_t) : _t
    }
  },
  filters:{
    mix_flrDateFormatter(val){
      const _t = val&&val.indexOf('T')?val.replace('T',' '):val
      return _t ? dateFormatter(_t) : _t
    }
  }
}
