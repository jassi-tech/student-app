# Build Android APK / AAB

This guide covers two ways to generate an Android release: using EAS Build (recommended for Expo-managed apps) and a local Gradle build (requires Android SDK).

## Option A — EAS Build (Recommended)

1. Install EAS CLI:

```bash
npm install --global eas-cli
```

2. Login to your Expo account (or create one):

```bash
eas login
```

3. Configure your project for EAS builds (optional):

```bash
eas build:configure
```

This creates an `eas.json` if it doesn't exist.

4. Build an APK (preview profile):

```bash
eas build -p android --profile preview
```

- The `preview` profile produces an `apk` artifact.
- For production distribution use `--profile production` to publish an AAB.
- By default EAS will prompt you to provide or let it manage Android credentials (keystore).
 - By default EAS will prompt you to provide or let it manage Android credentials (keystore).

5. When the build finishes, download the APK from the build details or with:

```bash
eas build:list
eas build:download --id <build-id>
```

## Option B — Local build (requires Android SDK + Java)

1. Prepare native project:

```bash
npx expo prebuild
```

2. Build using Gradle (Windows PowerShell):

```powershell
cd android
.\gradlew assembleRelease
```

3. Find the release APK in:

- `android/app/build/outputs/apk/release/app-release.apk`

4. Signing the APK: You can sign it via Gradle by configuring the `signingConfig` in `android/app/build.gradle` or by using `jarsigner` and `zipalign`.

## Notes & Recommendations

- Use EAS if you want automated management of credentials and continuous builds.
- Make sure your `app.json` has a valid Android `package` value (e.g. `com.mvvss.schoolapp`) and a unique package name.
- For production, use `eas build -p android --profile production` to get an AAB that can be uploaded to Google Play.
- Do not commit signing keys to your repository. Use EAS's credential management or secure vault.

If you'd like, I can:
- Run the EAS build for you (I will need your Expo account login and permission), or
- Configure a production-ready `eas.json` and CI script.
 
## Keystore generation + EAS (recommended workflow)

If you want the build to run in `--non-interactive` (CI) mode, you must provide a keystore to EAS ahead of time. Here's how to generate and upload one locally,
then re-run the `eas build --non-interactive`:

1. Generate a keystore locally (requires JDK):

```bash
mkdir -p keystores
keytool -genkeypair -v -keystore ./keystores/mvvss.keystore -alias mvvsskey -keyalg RSA -keysize 2048 -validity 10000 -storepass YOUR_STORE_PASS -keypass YOUR_KEY_PASS -dname "CN=MVVSS, OU=School, O=MVVSS, L=City, ST=State, C=IN"
```

2. Import your keystore into EAS (non-interactive):

```bash
npx eas credentials --platform android --import-keystore --path ./keystores/mvvss.keystore --keystore-password YOUR_STORE_PASS --key-alias mvvsskey --key-password YOUR_KEY_PASS
```

3. Re-run the non-interactive build:
```bash
npx eas build -p android --profile preview --non-interactive
```

4. Keep `keystores/` out of version control by ensuring it's in `.gitignore` as `*.jks` or `keystores/`.

If you can't run `keytool` locally, you can still run an interactive EAS build and allow EAS to generate and manage the keystore: `npx eas build -p android --profile preview`, then confirm when asked to generate credentials.
