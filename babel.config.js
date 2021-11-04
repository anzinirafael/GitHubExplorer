//Definição dos parametros para utilização das bibliotecar de preset env e preset react
//A biblioteca preset-env realizar as presetações dos arquivos a serem tratados
//A bibliote prese-react permite a integração do babel com o reactJS
module.exports = {
    presets: ['@babel/preset-env', ['@babel/preset-react', {runtime: 'automatic'}], '@babel/preset-typescript']
}