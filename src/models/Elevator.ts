import Base from './Base'

const base = '/jeecg-boot'

class Elevator extends Base {
  constructor() {
    super()
  }

  static async queryList(data: any) {
    return await this.post({
      url: `${base}/web/deerElevator/list`,
      data
    })
  }

}

export default Elevator;