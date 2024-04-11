module.exports = {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react",
    ],
    "plugins": [
        "react-refresh/babel",
        ["auto-import", {
            "declarations": [
                { "default": "React", "path": "react" }
            ]
        }]
    ]
}