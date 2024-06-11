// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://cripto.tiiny.site
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// ==/UserScript==

(function() {
    'use strict';

    function imprimirMayusculas() {
        const textoEnPagina = document.body.innerText;
        const letrasMayusculas = textoEnPagina.match(/[A-Z]/g);
        if (letrasMayusculas) {
            const key = letrasMayusculas.join('');
            console.log("La llave es:", key);
        }
    }

    window.addEventListener('load', imprimirMayusculas);

    function contarDivs() {
        const divElements = document.querySelectorAll('div');
        const divCount = divElements.length;
        console.log("Los mensajes cifrados son:", divCount);
    }

    window.addEventListener('load', contarDivs);

    function descifrar3DES(cifrado, clave) {
        const cifradoBytes = CryptoJS.enc.Base64.parse(cifrado);
        const claveBytes = CryptoJS.enc.Utf8.parse(clave);
        const descifrado = CryptoJS.TripleDES.decrypt({ ciphertext: cifradoBytes }, claveBytes, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return CryptoJS.enc.Utf8.stringify(descifrado);
    }

    function buscarYDescifrarDivs() {
        const divs = document.getElementsByTagName('div');
        const textoEnPagina = document.body.innerText;
        const letrasMayusculas = textoEnPagina.match(/[A-Z]/g);
        const key = letrasMayusculas.join('');
        const clave = key;

        for (let i = 0; i < divs.length; i++) {
            const div = divs[i];
            const id = div.getAttribute('id');

            if (id) {
                try {
                    const mensajeCifrado = id;
                    const mensajeDescifrado = descifrar3DES(mensajeCifrado, clave);

                    console.log(`${id} ${mensajeDescifrado}`);

                    const mensajeDescifradoElement = document.createElement('div');
                    mensajeDescifradoElement.textContent = `${mensajeDescifrado}`;
                    div.appendChild(mensajeDescifradoElement);
                } catch (error) {
                    console.error(`Error al descifrar el elemento DIV ID: ${id}`);
                }
            }
        }
    }

    window.addEventListener('load', buscarYDescifrarDivs);
})();