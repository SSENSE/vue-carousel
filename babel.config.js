module.exports = api => {
  const isTest = api.env('test');
  // You can use isTest to determine what presets and plugins to use.

  const config =  {
    presets: [
        ["@babel/preset-env", {
            targets: {
                "browsers": ["last 2 versions", "IE 11"]
            },
            useBuiltIns: "usage"
        }],
    ],	
  };

  if (isTest) {
    if (!config.plugins) { 
	config.plugins = [];
    }
    config.plugins.push(['istanbul', {
	exclude: [
            "tests",
          ]
    }, 'babel-istanbul']);
  }

  return config;
};

