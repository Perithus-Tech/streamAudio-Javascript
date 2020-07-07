let mediaRecorder
var count = 0

const allAudios = []

const button = document.getElementById('play')
const audio = document.getElementById('audio')

function getAudioMic () {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream)

      const streamAudio = []

      mediaRecorder.ondataavailable = data => {
        streamAudio.push(data.data)
        console.log(streamAudio)
      }

      mediaRecorder.onstop = () => {
        console.log('streamAudio')
        console.log(streamAudio)

        const blob = new Blob(streamAudio, { type: 'audio/ogg; code=opus' })

        const reader = new window.FileReader()
        reader.readAsDataURL(blob)

        reader.onloadend = () => {
          alert(reader.result)
          audio.src = reader.result
          audio.controls = true
        }
      }

      mediaRecorder.start()

      setTimeout(() => mediaRecorder.stop(), 2000)
    })
}

audio.onended = function () {
  if (count <= 3) {
    count = count + 1
    this.play()
  }
}

button.addEventListener('click', function () {
  count = count + 1
  audio.play()
})

getAudioMic()
