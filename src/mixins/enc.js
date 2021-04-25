import enc from '@/utils/enc'
const _enc = {
  data() {
    return {
    }
  },
  methods: {
    aesDec(val) {
      return enc.AESDecrypt(decodeURIComponent(val))
    },
    aesEnc(val) {
      return decodeURIComponent(enc.AESEncrypt(val))
    }
  }
}
export default _enc
