$(function(){
  $('#new_message').on('submit', function(e){
    console.log('イベント発火')
    e.preventDefault()
    // console.logを用いてイベント発火しているか確認
  })
})