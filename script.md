`docker run -d node:latest sleep infinity`
`docker cp codes/solution-6cbf2da6-eeba-46bd-a894-c8c47c3cca0a.js {container_name}:/codefiles`
`docker exec {container_name} node codefiles/solution.js`

`docker build -t codeeditor --build-arg FILE_PATH=${file} .`