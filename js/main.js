(function(win, doc, DOM) {
  'use strict';
  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  function app() {
    return {
      init: function init() {
        this.companyInfo();
        this.initEvents();
      },

      initEvents: function initEvents() {
        new DOM('[data-js="form"]')
          .on('submit', this.handleSubmit);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();

        var $tableCar = new DOM('[data-js="tbody"]').get()[0];
        $tableCar.appendChild( app().populateTable() );
      },

      populateTable: function populateTable() {
        var $fragment = doc.createDocumentFragment();
        var $tr = doc.createElement('tr');

        var $image = doc.createElement('img');
        $image.setAttribute('src', new DOM('[data-js="image"]').get()[0].value);

        var $tdImage = doc.createElement('td');
        var $tdBrand = doc.createElement('td');
        var $tdYaer = doc.createElement('td');
        var $tdPlate = doc.createElement('td');
        var $tdColor = doc.createElement('td');

        $tdImage.appendChild($image);
        $tdBrand.textContent = new DOM('[data-js="brand"]').get()[0].value;
        $tdYaer.textContent = new DOM('[data-js="year"]').get()[0].value;
        $tdPlate.textContent = new DOM('[data-js="board"]').get()[0].value;
        $tdColor.textContent = new DOM('[data-js="color"]').get()[0].value;

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYaer);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);

        return $fragment.appendChild($tr);
      },

      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();

        ajax.open('GET', 'data/company.json', true);

        ajax.send();

        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },

      getCompanyInfo: function getCompanyInfo() {
        if( !app().isRequestOk.call(this) )
          return;

        var data = JSON.parse(this.responseText);

        var $name = new DOM('[data-js="name-company"]');
        var $phone = new DOM('[data-js="phone-company"]');

        $name.get()[0].textContent = data.name;
        $phone.get()[0].textContent = data.phone;
      },

      isRequestOk: function isRequestOk() {
        return this.readyState === 4 && this.status === 200;
      }
    }
  }

  app().init();

})(window, document, window.DOM);
