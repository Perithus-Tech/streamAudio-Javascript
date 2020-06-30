function getAudio() {
    /**
     * Navigator -> Objeto global do javascrip que contém informações 
     * sobre o navegador, ele possui alguns métodos e atributos globais.
     * umas delas é o "mediaDevices".
     * 
     * mediaDevices -> é uma propriedade de leitura onde retorna um objeto que
     * permite o acesso aos dispositivos de midia conectados, como câmeras e 
     * o principal o microfone.
     * 
     * getUserMedia -> é um método onde é pedido a permissã ao usuário para usar 
     * alguma midia, como enviamos audio no parametro, ele vai cuidar da parte de
     * permissão do microfone. (é uma promisse)
     */

    let mediaRecorder; // variavel que irá gravar o audio

    navigator
        .mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => { //recebe o audio 
            mediaRecorder = new MediaRecorder(stream) // gracando o audio
            let streamAudio = []

            //ondataavailable -> evento de quando está gravando o áudio
            mediaRecorder.ondataavailable = data => {
                streamAudio.push(data.data) // toda informação do audio é adicionada
            }

            //onstop -> quando parar de gravar
            mediaRecorder.onstop = () => {
                // tratamos o audio capturado e transformamos ele em um blob
                const blob = new Blob(streamAudio, { type: 'audio/ogg; code=opus' });
                const reader = new window.FileReader();
                reader.readAsDataURL(blob); // após isso, transformamos o blob do áudio em string

                reader.onloadend = () => {
                    const audio = document.createElement('audio');
                    audio.src = reader.result; // Atribui ao audio a string convertida do blob
                    audio.controls = true; // Esse só peguei da documentação (heheh)

                    /**
                     *  reader.result -> é o audio gravado, como convertemos ele em uma URL,
                     * podemos enviar ela para o banco ou usar da melhor forma
                     */

                    const div = document.getElementById('container');

                    div.append(audio);
                }
            }

            mediaRecorder.start()

            setTimeout(() => mediaRecorder.stop(), 5000)
        }).catch(err => {
            alert(err)
        })
}

getAudio()