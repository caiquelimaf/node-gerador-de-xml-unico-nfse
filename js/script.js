function geraxml(){

   var oXmlBase = document.getElementById('txtfiletoread');
   var xmlBase = oXmlBase.value;
   var operacao = document.getElementById('id-tipoxml').value;
   var numrps = document.getElementById('id-numrps').value;

   if (xmlBase === ''){
       alert('É necessário colar um XML único no respectivo campo.');
   } else if (operacao === 'Selecionar'){
       alert('É necessário selecionar uma operação.');
   } else if (numrps === '') {
       alert('É necessário informar o número do RPS que será gerado.');
   } 

   //pego o número da operação
   operacao = operacao.substr(0,2)
   var xmlGerado = xmlFinal(xmlBase, operacao.trim(), numrps);
   document.getElementById('txtfiletoresult').value=xmlGerado;

   var xmlGerado64 = btoa(xmlGerado)
   document.getElementById('txtfiletoresult64').value=xmlGerado64;

return
   
}

function xmlFinal(xmlBase, operacao, numrps){

   var nAt1 = ''
   var nAt2 = ''
   var xmlIni = ''
   var xmlFim = ''
   var valor = ''
   var nowDate = retDate();

   //alterando o número do RPS
   nAt1 = xmlBase.search('rps:');
   nAt2 = xmlBase.search('" tssversao');
   xmlIni = xmlBase.substr(0,nAt1+4);
   xmlFim = xmlBase.substr(nAt2, xmlBase.length);
   xmlBase = xmlIni + numrps + xmlFim;
   
   //alterando o número do RPS
   nAt1 = xmlBase.search('<numerorps>');
   nAt2 = xmlBase.search('</numerorps>');
   xmlIni = xmlBase.substr(0,nAt1+11);
   xmlFim = xmlBase.substr(nAt2, xmlBase.length);
   xmlBase = xmlIni + numrps + xmlFim;

   //alterando a data e hora de emissÃ£o
   nAt1 = xmlBase.search('<dthremissao>');
   nAt2 = xmlBase.search('</dthremissao>');
   xmlIni = xmlBase.substr(0,nAt1+13);
   xmlFim = xmlBase.substr(nAt2, xmlBase.length);
   xmlBase = xmlIni + nowDate + xmlFim;

   //alterando a data e hora de competência, caso exista tag de competência no XML
   nAt1 = xmlBase.search('<competenciarps>');
   if (nAt1 != -1){
      nAt2 = xmlBase.search('</competenciarps>');
      xmlIni = xmlBase.substr(0,nAt1+16);
      xmlFim = xmlBase.substr(nAt2, xmlBase.length);
      xmlBase = xmlIni + nowDate + xmlFim;
   }

   //tratamento ISS Retido
   if (operacao === '1'){
       nAt1 = xmlBase.search('<issretido>');
       nAt2 = xmlBase.search('</issretido>');
       xmlIni = xmlBase.substr(0,nAt1+11);
       xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
       xmlBase = xmlIni + '1' + xmlFim;

       nAt1 = xmlBase.search('<valissret>');
       nAt2 = xmlBase.search('</valissret>');
       valor = retVal(xmlBase, 'valiss');
       xmlIni = xmlBase.substr(0,nAt1+11);
       xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
       xmlBase = xmlIni + valor + xmlFim;

       nAt1 = xmlBase.search('<issret>');
       nAt2 = xmlBase.search('</issret>');
       valor = retVal(xmlBase, 'valiss');
       xmlIni = xmlBase.substr(0,nAt1+8);
       xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
       xmlBase = xmlIni + valor + xmlFim;
   
   //Tratamento Simples Nacional
   } else if (operacao === '2'){
       nAt1 = xmlBase.search('<simpnac>');
       nAt2 = xmlBase.search('</simpnac>');
       xmlIni = xmlBase.substr(0,nAt1+9);
       xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
       xmlBase = xmlIni + '1' + xmlFim;

   //Tratamento Tributável
   } else if (operacao === '3'){
       nAt1 = xmlBase.search('<tipotrib>');
       nAt2 = xmlBase.search('</tipotrib>');
       xmlIni = xmlBase.substr(0,nAt1+10);
       xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
       xmlBase = xmlIni + '6' + xmlFim;

   } else if (operacao === '4'){
       nAt1 = xmlBase.search('<tipotrib>');
       nAt2 = xmlBase.search('</tipotrib>');
       xmlIni = xmlBase.substr(0,nAt1+10);
       xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
       xmlBase = xmlIni + '1' + xmlFim;

   } else if (operacao === '5'){
       nAt1 = xmlBase.search('<tipotrib>');
       nAt2 = xmlBase.search('</tipotrib>');
       xmlIni = xmlBase.substr(0,nAt1+10);
       xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
       xmlBase = xmlIni + '2' + xmlFim;

   } else if (operacao === '6'){
       nAt1 = xmlBase.search('<tipotrib>');
       nAt2 = xmlBase.search('</tipotrib>');
       xmlIni = xmlBase.substr(0,nAt1+10);
       xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
       xmlBase = xmlIni + '3' + xmlFim;

   } else if (operacao === '7'){
       nAt1 = xmlBase.search('<tipotrib>');
       nAt2 = xmlBase.search('</tipotrib>');
       xmlIni = xmlBase.substr(0,nAt1+10);
       xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
       xmlBase = xmlIni + '4' + xmlFim;

   } else if (operacao === '8'){
       nAt1 = xmlBase.search('<tipotrib>');
       nAt2 = xmlBase.search('</tipotrib>');
       xmlIni = xmlBase.substr(0,nAt1+10);
       xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
       xmlBase = xmlIni + '12' + xmlFim;

   } else if (operacao === '9'){
       nAt1 = xmlBase.search('<tomador>');
       nAt2 = xmlBase.search('</tomador>');
       xmlIni = xmlBase.substr(0,nAt1+9);
       xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
       xmlBase = xmlIni + xmlFim;

   //caracter especial
   } else if (operacao === '10'){
       nAt1 = xmlBase.search('<discr>');
       nAt2 = xmlBase.search('</discr>');
       xmlIni = xmlBase.substr(0,nAt1+7);
       xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
       xmlBase = xmlIni + 'áéíóúÁÉÍÓÚçâêîôûÂÊÎÔÛÇäëïöüÄËÏÖÜºàèìòùÀÈÌÒÙ' + xmlFim;

   //Codigo Obra
   } else if (operacao === '11'){
      nAt1 = xmlBase.search('</rps>');
      xmlIni = xmlBase.substr(0,nAt1); 
      xmlIni += '    <construcao>' + '\n'
      xmlIni += '       <codigoobra>32346</codigoobra>' + '\n'
      xmlIni += '       <art>987654321</art>' + '\n'
      xmlIni += '       <tipoobra>1</tipoobra>' + '\n'
      xmlIni += '    </construcao>' + '\n'
      xmlBase = xmlIni + '</rps>'

   /*Dedução
   } else if (operacao === '12'){
      nAt1 = xmlBase.search('<valunit>');
      nAt2 = xmlBase.search('</valunit>');
      xmlIni = xmlBase.substr(0,nAt1+9);
      xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
      valor = retVal(xmlBase, 'valtotal');
      valor = parseFloat(valor);
      valor = valor - ((valor * 20) / 100); 
      valor = valor.toFixed(2)
      xmlBase = xmlIni + valor.toString() + xmlFim;

      nAt1 = xmlBase.search('<basecalc>');
      nAt2 = xmlBase.search('</basecalc>');
      xmlIni = xmlBase.substr(0,nAt1+10);
      xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
      valor = retVal(xmlBase, 'valtotal');
      valor = parseFloat(valor);
      valor = valor - ((valor * 20) / 100); 
      valor = valor.toFixed(2)
      xmlBase = xmlIni + valor.toString() + xmlFim;

      nAt1 = xmlBase.search('<valtotdoc>');
      nAt2 = xmlBase.search('</valtotdoc>');
      xmlIni = xmlBase.substr(0,nAt1+11);
      xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
      valor = retVal(xmlBase, 'valtotal');
      valor = parseFloat(valor);
      valor = valor - ((valor * 20) / 100); 
      valor = valor.toFixed(4)
      xmlBase = xmlIni + valor.toString() + xmlFim;

      nAt1 = xmlBase.search('<valdedu>');
      nAt2 = xmlBase.search('</valdedu>');
      xmlIni = xmlBase.substr(0,nAt1+9);
      xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
      valor = retVal(xmlBase, 'valtotal');
      valor = parseFloat(valor);
      valor = (valor * 20) / 100; 
      valor = valor.toFixed(2)
      xmlBase = xmlIni + valor.toString() + xmlFim;

   //Redução
   } else if (operacao === '13'){
      nAt1 = xmlBase.search('<valunit>');
      nAt2 = xmlBase.search('</valunit>');
      xmlIni = xmlBase.substr(0,nAt1+9);
      xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
      valor = retVal(xmlBase, 'valtotal');
      valor = parseFloat(valor);
      valor = valor - ((valor * 20) / 100); 
      valor = valor.toFixed(2)
      xmlBase = xmlIni + valor.toString() + xmlFim;

      nAt1 = xmlBase.search('<basecalc>');
      nAt2 = xmlBase.search('</basecalc>');
      xmlIni = xmlBase.substr(0,nAt1+10);
      xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
      valor = retVal(xmlBase, 'valtotal');
      valor = parseFloat(valor);
      valor = valor - ((valor * 20) / 100); 
      valor = valor.toFixed(2)
      xmlBase = xmlIni + valor.toString() + xmlFim;

      nAt1 = xmlBase.search('<valtotdoc>');
      nAt2 = xmlBase.search('</valtotdoc>');
      xmlIni = xmlBase.substr(0,nAt1+11);
      xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
      valor = retVal(xmlBase, 'valtotal');
      valor = parseFloat(valor);
      valor = valor - ((valor * 20) / 100); 
      valor = valor.toFixed(4)
      xmlBase = xmlIni + valor.toString() + xmlFim;

      nAt1 = xmlBase.search('<valredu>');
      nAt2 = xmlBase.search('</valredu>');
      xmlIni = xmlBase.substr(0,nAt1+9);
      xmlFim = xmlBase.substr(nAt2, xmlBase.length);  
      valor = retVal(xmlBase, 'valtotal');
      valor = parseFloat(valor);
      valor = (valor * 20) / 100; 
      valor = valor.toFixed(2)
      xmlBase = xmlIni + valor.toString() + xmlFim;
      */
   }
   
   return xmlBase  

}

/* ----------------------
Função retVal()
Since: 16/06/2020
Autor: Caique Lima Fonseca

Retorna o conteúdo da tag especificada

Params:
   xmlBase -   XML Único colado no campo da tela
   tag     -   tag que terá o conteúdo recuperado (sem sinais de maior e menor <>) 
-----------------------*/
function retVal(xmlBase, tag) {

   var tagOpen = '<' + tag + '>'
   var tagClose = '</' + tag + '>'
   var nAt1 = xmlBase.search(tagOpen);
   var nAt2 = xmlBase.search(tagClose);
   
   var value = xmlBase.substr(nAt1 + (tagOpen.length), nAt2 - (nAt1 + (tagOpen.length))); 

   return value
   
}

/* ----------------------
Função retDate()
Since: 16/06/2020
Autor: Caique Lima Fonseca

Retorna a data no formato esperado para a tag <dthremissao>
-----------------------*/
function retDate(){

   var date = new Date();
   var dia = date.getDate().toString();
   if (dia.length === 1){
       dia = '0' + dia;
   }
   var mes = (date.getMonth()+1).toString();
   if (mes.length === 1){
       mes = '0' + mes;
   }
   var ano = date.getFullYear().toString();
   hora = date.getHours();
   if (hora.length === 1){
       hora = '0' + hora;
   }
   minutos = date.getMinutes().toString();
   if (minutos.length === 1){
       minutos = '0' + minutos;
   }
   var ret =  ano + '-' + mes + '-' + dia + 'T' + hora + ':' + minutos + ':00';
   
   return ret
}