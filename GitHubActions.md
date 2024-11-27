| Action Name            | YML File Name      | Description                                                                                       |
|------------------------|--------------------|---------------------------------------------------------------------------------------------------|
| daily-build-checker    | build-checker.yml  | Launches the project through docker, and checks for the images running. Runs nightly              |
| prettier-check         | prettier.yml       | Runs the prettier code formatter on all backend and frontend code, will fail if there are errors. |
| pages-build-deployment | N/A                | Builds and deploys the documentation to the GitHub website                                        |
| tests-coverage         | tests-coverage.yml | Runs backend and frontend tests and checks for failures. Runs nightly.                            |
| CI         | ci.yml | Runs tests and checks for failures in frontend. Runs when push or pull.                           |
