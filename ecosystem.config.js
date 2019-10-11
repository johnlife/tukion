const ignore_watch =[
    "**/.syncthing/*",
    "**/.syncthing*",
    ".idea/*",
    "node_modules/.cache/*",
    "http/routes/backend.json",
    "data/util/signatures.json",
    "public/*",
    "frontend/*",
    "storage/*",
    "mix-manifest.json"
];

const env = {
    env: {
        NODE_ENV: 'development'
    },
    env_production: {
        NODE_ENV: 'production'
    },
    autorestart: true,
    ignore_watch,
};

module.exports = {
    apps : [{
        name: 'www',
        script: 'bin/www',
        watch: '.',
        instances: 1,
        ...env,
    },{
        name: 'youtube',
        script: 'bin/service',
        args: 'youtube',
        watch: [
            "service/*",
            "data/*",
        ],
        instances: 1,
        ...env,
    },{
        name: 'vimeo',
        script: 'bin/service',
        args: 'vimeo',
        watch: [
            "service/*",
            "data/*",
        ],
        instances: 1,
        ...env,
    }],
};
