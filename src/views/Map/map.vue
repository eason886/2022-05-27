<template>
  <div id="container" style="width: 100%; height: 100%"></div>
</template>

<script setup>
setTimeout(() => {
  var map = new window.BMapGL.Map('container')
  var point = new BMapGL.Point(116.331398, 39.897445)
  map.centerAndZoom(point, 12)

  var geolocation = new window.BMapGL.Geolocation()
  geolocation.getCurrentPosition(function (r) {
    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      var mk = new window.BMapGL.Marker(r.point)
      map.addOverlay(mk)
      map.panTo(r.point)
      alert('您的位置：' + r.point.lng + ',' + r.point.lat)
    } else {
      alert('failed' + this.getStatus())
    }
  })
}, 500)
</script>

<style lang="scss" scoped></style>
