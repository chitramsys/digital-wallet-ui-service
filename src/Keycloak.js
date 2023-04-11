import Keycloak from "keycloak-js";
const keycloak =new Keycloak({
 url: "http://3.232.225.73:8080",
 realm: "SpringBootKeycloak",
 clientId: "springboot-keycloak-client",
})

export default keycloak;