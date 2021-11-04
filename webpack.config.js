//Importando path para poder trabalhar com os nomes de diretorios da mesma maneira em todas as plataformas
const path = require('path')
//Importando o html wenpack plugin para realizar a alteração do nome do arquivo  JS em toda a aplicação
const HtmlWebpackPlugin = require('html-webpack-plugin')
//Importação da váriavel NODE-ENV para identificação se estamos no ambiente de desenvolvimento ou de produção
//Yarn cross env para criar variavel 
const isDevelopment = process.env.NODE_ENV != 'production';
//Importação de plugin para que quando se realizar uma alteração na aplicação não seja dado refresh nos compones reactJS
const ReactRefreshWebpackPlugin =  require('@pmmmwh/react-refresh-webpack-plugin');
//exportando o modulo de configuração do webpack, para realizar a configuração ideal para o ambiente de desenvolvimento e produção
module.exports =  {
    //Definindo o modo de utilização do webpack para o ambiente de desenvolvimento
    mode: isDevelopment ? 'development' : 'production',
    //Definindo o source map para que o código visto de erro visto no browser seja coincidente com o código desenvolvido no ambiente
    devtool: isDevelopment ?  'eval-source-map' : 'source-map',
    //Definindo o caminho de entrada para que o arquivo seja tratado
    entry:  path.resolve(__dirname, 'src', 'index.tsx' ) , 
    //Criando um diretorio e o arquivo que ira armazenar o código contido do arquivo de entrada após o tratamento
    output: {
        //Especificando o nome e local para criação do diretório
        path: path.resolve(__dirname, 'dist'),
        //Definindo um nome para o arquivo que sera a transformação do arquivo de entrada
        filename: 'bundle.js'
    },
    //O resolve irá possibilitar o tratamento  tando dos arquivos .js quanto dos arquivos .jsx conforme o parametro
    resolve: {
        //Passagem dos parametros .js .jsx
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    //O plugins irá criar um objeto do tipo webpackplugin e espeficicar como parametro o seu diretorio..
    // Para poder alterar o nome do arquivo jsx ou js uma vez só em toda a aplicação
    plugins:[
        isDevelopment && new ReactRefreshWebpackPlugin(),
        //Definição do objeto htmlwebpackplugin
        new HtmlWebpackPlugin({
            //especificação do caminho do diretorio
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean),
    //O devServer irá possibilitar a interpretação em real time das alterações nos arquivos da aplicação
    devServer: {
        static: {
            //Especificação do diretorio publico aonde ficara o arquivo html com as dependencias do react
          directory: path.join(__dirname, 'public'),
        },
          hot: true,
      },
    //O modulo irá possibilitar a criação das regras para o processamento do arquivo de entrada
    module: {
        //Regras
        rules: [
            {   
                //Abaixo temos um expressão regular para identificar todos os arquivos terminado em .jsx
                test: [/\.jsx$/, /\.tsx$/],
                //Quando identificado será escluido as alterações do node modules para ser tratado direto pela biblioteca de preferência
                exclude: /node_modules/,
                use: {
                    //O babel-loader possibilitará a cominicação entre a biblioteca babel e as bibliotecas webpack
                    loader: 'babel-loader',
                    options:{
                        //Plugin para integrar o refresh com babel, condição AND somente em ambiente de desenvolvimento
                        plugins: [
                            isDevelopment  && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }
            },
            {   
                //Abaixo temos um expressão regular para identificar todos os arquivos terminado em .jsx
                test: /\.scss$/,
                //Quando identificado será escluido as alterações do node modules para ser tratado direto pela biblioteca de preferência
                exclude: /node_modules/,
                //O babel-loader possibilitará a cominicação entre a biblioteca babel e as bibliotecas webpack
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}