const path = require('path');
const mix = require('laravel-mix');
const webpack = require('webpack');

class DeviseMix {
    dependencies() {}
    register(params) {}
    boot() {}
    webpackEntry(entry) {}
    webpackRules() {return [];}
    webpackPlugins() {
        let plugins = [];

        plugins.push(
            new webpack.optimize.CommonsChunkPlugin({
                name: '/public/js/vendor',
                minChunks (module) {
                    // any required modules inside node_modules are extracted to vendor
                    return (
                        module.resource &&
                        /\.js$/.test(module.resource) &&
                        module.resource.indexOf(
                            path.join(__dirname, 'node_modules')
                        ) === 0
                    )
                }
            })
        );

        return plugins
    }

}

mix.extend('deviseMix', new DeviseMix());

mix
    .js('frontend/js/app.js', 'public/js')
    .sass('frontend/sass/app.scss', 'public/css')
    .deviseMix();
