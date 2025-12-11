Keystore notes

This project's keystore should never be committed to the repository. Create one locally and import it to EAS following `BUILD_ANDROID.md`.

Recommended steps:
- Generate with `keytool` into `./keystores/mvvss.keystore`.
- Add `keystores/*` to `.gitignore` if you store it locally temporarily.
- Use `npx eas credentials` to import it to EAS.

If you need help generating a keystore on your machine, tell me which OS and I will provide the exact commands.
