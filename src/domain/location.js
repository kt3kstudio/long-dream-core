/**
 * The location model. VO.
 */
class Location {
  /**
   * @param {string} place The place
   * @param {LocationDetail} detail The detail of the location
   */
  constructor ({place, detail}) {
    this.place = place
    this.detail = detail
  }

  goToRoom () {
    this.detail = null
    this.place = PLACE.ROOM
  }

  goToRoad () {
    this.detail = new RoadLocationDetail({place: this.place})
    this.place = PLACE.ROAD
  }

  goToTower () {
    this.place = PLACE.TOWER
    this.detail = new TowerLocationDetail({assetId: 'entrance', floorId: '1'})
  }
}

class LocationDetail {}

class TowerLocationDetail extends LocationDetail {
  /**
   * @param {string} floorId The floor id
   * @param {string} assetId The asset id
   */
  constructor ({floorId, assetId}) {
    this.floorId = floorId
    this.assetId = assetId
  }
}

class RoadLocationDetail extends LocationDetail {
  /**
   * @param {string} place The place in the road scene
   */
  constructor ({place}) {
    this.place = place
  }
}

const PLACE = {
  ROOM: 'ROOM',
  ROAD: 'ROAD',
  TOWER: 'TOWER'
}

module.exports = Location
module.exports.PLACE = PLACE
