# Ionic OAuth2 test

## Fresh start

- `ionic start {PROJECT_NAME} tabs`
- `code {PROJECT_NALME}`
- `ng add @oktadev/schematics --platform=capacitor`
- `ionic build`
    - In case of issues during build, do the following :
    - `npm i -D npm-force-resolutions`
    - Add following to package.json : 
        ```
        "resolutions": {
        "@babel/preset-env": "^7.8.7"
        },
        ```
    - `npm i`
    - Disable ES5 bundles by replacing everything in `browserslist` file by :
        - `last 2 chrome versions` 
- `npx cap add ios`
- `npx cap open ios`
- Add your custom scheme to ios/App/App/Info.plist:
    ````
    <key>CFBundleURLTypes</key>
    <array>
    <dict>
        <key>CFBundleURLName</key>
        <string>com.getcapacitor.capacitor</string>
        <key>CFBundleURLSchemes</key>
        <array>
        <string>capacitor</string>
        <string>com.okta.dev-737523</string>
        </array>
    </dict>
    </array>
    ```
- Build app on XCode and run either with Simulator or Device 💪🏼
