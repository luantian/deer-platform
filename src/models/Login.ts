import Base from './Base'

const base = '/jeecg-boot'

class Login extends Base {
  constructor() {
    super()
  }

  static async getPhone(data: any) {
    console.log('this', this);
    return await this.post({
      url: `${base}/dySmsHelper/getPhone`,
      data
    })
  }

}

export default Login;