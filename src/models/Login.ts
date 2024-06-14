import Base from './Base'

const base = '/jeecg-boot'

class Login extends Base {
  constructor() {
    super()
  }

  static async toLogin(data: any) {
    data.mobile = data.phone;
    return await this.post({
      url: `${base}/sys/login`,
      data
    })
  }

  static async getPhone(data: any) {
    console.log('this', this);
    return await this.post({
      url: `${base}/dySmsHelper/getPhone`,
      data
    })
  }

  static async sendCode(data: any) {
    return await this.post({
      url: `${base}/dySmsHelper/sendCode`,
      data
    })
  }

}

export default Login;