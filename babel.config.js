module.exports = (api) => {
  const isTest = api.env('test');

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

 if(isTest) {
    api.cache.never();
 }

  return config;
};

