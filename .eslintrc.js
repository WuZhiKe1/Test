module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    rules: {
        "vue/max-attributes-per-line": [2, {
            "singleline": 10,// 标签为单行时，每行最大属性数值为 10，默认值为 1
            "multiline": {
                "max": 1,// 标签为多行时，每行最大属性数字为 1，默认值为 1
                "allowFirstLine": false// 不允许属性与该标记名称位于同一行，默认值为 false

            }
        }],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        //在rules中添加自定义规则
        //关闭组件命名规则
        "vue/multi-word-component-names": "off",
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        }
    ]
}
